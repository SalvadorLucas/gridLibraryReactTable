import React from 'react'
// CORE COMPONENTS
import {
  CssBaseline,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Card,
  CardContent,
  CardActions,
  Grid,
  Typography,
  TextField,
  Checkbox,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import MaUTable from '@material-ui/core/Table'
import {
  useTable,
  useSortBy,
  useFilters,
  useRowSelect,
} from 'react-table'
import matchSorter from 'match-sorter'
// Icons
import ExpandLessIcon from '@material-ui/icons/ExpandLess'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import SortIcon from '@material-ui/icons/Sort'
// Other Components
import Progress from '../../components/Atoms/Progress'
import Toolbar from '../Toolbar'
import Pagination from '../Pagination'

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
})
// UI for Row Selection
const IndeterminateCheckbox = React.forwardRef(
  ({ indeterminate, ...rest }, ref) => {
    const defaultRef = React.useRef()
    const resolvedRef = ref || defaultRef

    React.useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate
    }, [resolvedRef, indeterminate])

    return (
      <div>
        <Checkbox color="primary" ref={resolvedRef} {...rest} />
      </div>
    )
  }
)
// Define a default UI for filtering
const DefaultColumnFilter = ({
  column: { filterValue, preFilteredRows, setFilter },
}) => {
  const count = preFilteredRows.length

  return (
    <TextField
      fullWidth
      value={filterValue || ''}
      onChange={e => {
        setFilter(e.target.value || undefined) // Set undefined to remove the filter entirely
      }}
      placeholder={`Search ${count} records...`}
    />
  )
}

const fuzzyTextFilterFn = (rows, id, filterValue) => {
  return matchSorter(rows, filterValue, { keys: [row => row.values[id]] })
}
// Let the table remove the filter if the string is empty
fuzzyTextFilterFn.autoRemove = val => !val

const Table = (props) => {
  const classes = useStyles()
  const { data, uri, entity, title, UpdateRowsSelected, toolbarActions, ...rest } = props
  let hiddenColumns = []
  // Prepare hidden columns
  props.columns.map(column => {
    column.hidden ? hiddenColumns.push(column.accessor)
      : null
  })
  // Prepare columns
  const columns = React.useMemo(() => props.columns, [])
  const filterTypes = React.useMemo(
    () => ({
      // Add a new fuzzyTextFilterFn filter type.
      fuzzyText: fuzzyTextFilterFn,
      // Or, override the default text filter to use
      // "startWith"
      text: (rows, id, filterValue) => {
        return rows.filter(row => {
          const rowValue = row.values[id]
          return rowValue !== undefined
            ? String(rowValue)
              .toLowerCase()
              .startsWith(String(filterValue).toLowerCase())
            : true
        })
      },
    }),
    []
  )
  const defaultColumn = React.useMemo(
    () => ({
      // Let's set up our default Filter UI
      Filter: DefaultColumnFilter,
    }),
    []
  )
  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    headerGroups,
    rows,
    prepareRow,
    allColumns,
    getToggleHideAllColumnsProps,
    selectedFlatRows,
  } = useTable(
    {
      columns,
      data,
      defaultColumn, // Be sure to pass the defaultColumn option
      filterTypes,
      initialState: {
        hiddenColumns: hiddenColumns
      }
    },
    useFilters, // useFilters!
    useSortBy,
    useRowSelect, // useRowSelect!
    hooks => {
      hooks.visibleColumns.push(columns => [
        // Let's make a column for selection
        {
          id: 'actions',
          // The header can use the table's getToggleAllRowsSelectedProps method
          // to render a checkbox
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <div>
              <IndeterminateCheckbox color='default' {...getToggleAllRowsSelectedProps()} />
            </div>
          ),
          // The cell can use the individual row's getToggleRowSelectedProps method
          // to the render a checkbox
          Cell: ({ row }) => (
            <div>
              <IndeterminateCheckbox color='default' {...row.getToggleRowSelectedProps()} />
            </div>
          ),
        },
        ...columns,
      ])
    }
  )

  // Render the UI for your table
  return (
    <React.Fragment>
      {/* TOOLBAR */}
      <Toolbar
        title={title}
        columns={props.columns}
        allColumns={allColumns}
        getToggleHideAllColumnsProps={getToggleHideAllColumnsProps}
        toolbarActions={toolbarActions}
      />
      {/* CARD FOR BORDER */}
      <Card className={classes.root} variant="outlined">
        <CardContent>
          {/* TABLE */}
          <MaUTable {...getTableProps()}>
            {/* HEADERS */}
            <TableHead>
              {headerGroups.map(headerGroup => (
                <TableRow {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map(column => (
                    <TableCell {...column.getHeaderProps(column.getSortByToggleProps())}>
                      <Grid
                        container
                        direction="row"
                        justify="space-between"
                        alignItems="center"
                      >
                        <Grid item xs={11} sm={3} md={3} lg={3} xl={3}>
                          <Typography variant={'h6'}>
                            {column.render('Header')}
                          </Typography>
                        </Grid>
                        <Grid item xs={1} sm={1} md={1} lg={1} xl={1}>
                          {column.canSort ?
                            column.isSorted ?
                              column.isSortedDesc ?
                                <KeyboardArrowDownIcon />
                                : <ExpandLessIcon />
                              : <SortIcon />
                            : null}
                        </Grid>
                      </Grid>
                    </TableCell>
                  ))}
                </TableRow>
              ))}

              {/* FILTERS */}
              {headerGroups.map((headerGroup, key) => (
                <TableRow key={key}>
                  {headerGroup.headers.map((column, key) => (
                    <TableCell key={key}>
                      {column.canFilter ? column.render('Filter') : null}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableHead>

            {/* DATA */}
            <TableBody>
              {rows.map((row, i) => {
                prepareRow(row)
                return (
                  <TableRow {...row.getRowProps()}>
                    {row.cells.map(cell => {
                      return (
                        <TableCell {...cell.getCellProps()}>
                          {cell.render('Cell')}
                        </TableCell>
                      )
                    })}
                  </TableRow>
                )
              })}
            </TableBody>
          </MaUTable>
        </CardContent>
        <CardActions>
          {/* ACTION TO UPDATE ROWS SELECTED AND VALUES */}
          {UpdateRowsSelected(selectedFlatRows)}
          <Pagination uri={uri} entity={entity} columns={props.columns} />
        </CardActions>
      </Card>
    </React.Fragment>
  )
}

export default function App(props) {
  const { uri, data, loading, GetData, entity, columns } = props
  if (loading === false && data.length === 0) {
    GetData(uri, entity, columns)
  }
  if (data.length === 0 || loading === true) {
    return (
      <Progress />
    )
  } else {
    return (
      <React.Fragment>
        {/* <CssBaseline /> */}
        <Table {...props} />
      </React.Fragment>
    )
  }
}
