import React from "react";
// CORE
import {
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Grid,
  Typography,
  TextField,
  Checkbox,
  IconButton,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import MaUTable from "@material-ui/core/Table";
import {
  useTable,
  useSortBy,
  useFilters,
  useExpanded,
  useRowSelect,
} from "react-table";
import matchSorter from "match-sorter";
// Icons
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import SortIcon from "@material-ui/icons/Sort";
// OTHER
import Toolbar from "../ToolBar";

const useStyles = makeStyles((theme) => ({
  container: {
    maxHeight: 500,
  },
  table: {
    width: "100%",
    maxHeight: "100%",
  },
  actions: {
    width: "fit-content",
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.secondary,
    "& svg": {
      margin: theme.spacing(1.5),
    },
    "& hr": {
      margin: theme.spacing(0, 0.5),
    },
  },
}));

// UI for Row Selection
const IndeterminateCheckbox = React.forwardRef(
  ({ indeterminate, ...rest }, ref) => {
    const defaultRef = React.useRef();
    const resolvedRef = ref || defaultRef;

    React.useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate;
    }, [resolvedRef, indeterminate]);
    return (
      <div>
        <Checkbox size="small" color="primary" ref={resolvedRef} {...rest} />
      </div>
    );
  }
);

// Define a default UI for filtering
const DefaultColumnFilter = ({
  column: { filterValue, preFilteredRows, setFilter },
}) => {
  const count = preFilteredRows.length;

  return (
    <TextField
      fullWidth
      value={filterValue || ""}
      onChange={(e) => {
        setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
      }}
      placeholder={`Search ${count} records...`}
    />
  );
};

const fuzzyTextFilterFn = (rows, id, filterValue) => {
  return matchSorter(rows, filterValue, { keys: [(row) => row.values[id]] });
};
// Let the table remove the filter if the string is empty
fuzzyTextFilterFn.autoRemove = (val) => !val;

function Table(props) {
  const classes = useStyles();
  const [columnstoFilter, setColumnsToFilter] = React.useState([]);
  const [filterValue, setFilterValue] = React.useState(null);
  const {
    toolbar,
    data,
    uri,
    entity,
    title,
    UpdateRowsSelected,
    page,
    pageSize,
    defaultfilter,
    toolbarActions,
    actions,
    renderRowSubComponent,
    Client,
    callstandard,
    ...rest
  } = props;

  let newColumns = [];

  const UpdateColumnsToFilter = (columns) => {
    setColumnsToFilter(columns);
  };

  const UpdateFilterValue = (value) => {
    setFilterValue(value);
  };

  // Function to refresh grid for developers
  function refreshGrid() {
    Client(
      uri,
      entity,
      props.columns,
      callstandard,
      page,
      pageSize,
      props.columnsToFilter,
      filterValue,
      defaultfilter
    );
  }

  if (actions) {
    newColumns.push({
      // Make an actions cell
      Header: () => null, // No header
      id: "actions", // It needs an ID
      Cell: ({ row }) => (
        // Use Cell to render actions for each row.
        <React.Fragment>{actions(row.original, refreshGrid)}</React.Fragment>
      ),
    });
  }

  if (renderRowSubComponent) {
    newColumns.push({
      // Make an expander cell
      Header: () => null, // No header
      id: "expander", // It needs an ID
      Cell: ({ row }) => (
        // Use Cell to render an expander for each row.
        // We can use the getToggleRowExpandedProps prop-getter
        // to build the expander.
        <span {...row.getToggleRowExpandedProps()}>
          <IconButton size="small">
            {row.isExpanded ? (
              <KeyboardArrowUpIcon />
            ) : (
              <KeyboardArrowDownIcon />
            )}
          </IconButton>
        </span>
      ),
    });
  }

  props.originalColumns.map((column) => {
    newColumns.push(column);
  });

  let hiddenColumns = [];
  // Prepare hidden columns
  props.columns.map((column) => {
    column.hidden ? hiddenColumns.push(column.accessor) : null;
  });

  const columns = React.useMemo(() => newColumns, []);

  const filterTypes = React.useMemo(
    () => ({
      // Add a new fuzzyTextFilterFn filter type.
      fuzzyText: fuzzyTextFilterFn,
      // Or, override the default text filter to use
      // "startWith"
      text: (rows, id, filterValue) => {
        return rows.filter((row) => {
          const rowValue = row.values[id];
          return rowValue !== undefined
            ? String(rowValue)
                .toLowerCase()
                .startsWith(String(filterValue).toLowerCase())
            : true;
        });
      },
    }),
    []
  );

  const defaultColumn = React.useMemo(
    () => ({
      // Let's set up our default Filter UI
      Filter: DefaultColumnFilter,
    }),
    []
  );

  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    allColumns,
    getToggleHideAllColumnsProps,
    visibleColumns,
    selectedFlatRows,
    state: { expanded, selectedRowIds },
  } = useTable(
    {
      defaultColumn, // Be sure to pass the defaultColumn option
      columns,
      data,
      filterTypes,
      initialState: {
        hiddenColumns: hiddenColumns,
      },
    },
    useFilters, // useFilters!
    useSortBy,
    useExpanded, // We can useExpanded to track the expanded state
    useRowSelect, // useRowSelect!
    // for sub components too!
    (hooks) => {
      hooks.visibleColumns.push((columns) => [
        // Let's make a column for selection
        {
          id: "selectable",
          // The header can use the table's getToggleAllRowsSelectedProps method
          // to render a checkbox
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <IndeterminateCheckbox
              color="primary"
              {...getToggleAllRowsSelectedProps()}
            />
          ),
          // The cell can use the individual row's getToggleRowSelectedProps method
          // to the render a checkbox
          Cell: ({ row }) => (
            <IndeterminateCheckbox
              color="primary"
              {...row.getToggleRowSelectedProps()}
            />
          ),
        },
        ...columns,
      ]);
    }
  );
  // Render the UI for your table
  return (
    <React.Fragment>
      {toolbar ? (
        <Toolbar
          {...props}
          rowsSelected={selectedFlatRows}
          title={title}
          columns={props.columns}
          Client={Client}
          columnsToFilter={columnstoFilter}
          UpdateFilterValue={UpdateFilterValue}
          UpdateColumnsToFilter={UpdateColumnsToFilter}
          allColumns={allColumns}
          getToggleHideAllColumnsProps={getToggleHideAllColumnsProps}
          toolbarActions={toolbarActions ? toolbarActions : null}
          hiddenColumns={hiddenColumns}
        />
      ) : null}
      <TableContainer className={classes.container}>
        <MaUTable
          size="small"
          stickyHeader
          {...getTableProps()}
          className={classes.table}
        >
          <TableHead>
            {headerGroups.map((headerGroup) => (
              <TableRow {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) =>
                  column.id === "expander" ? (
                    <TableCell
                      {...column.getHeaderProps()}
                      style={{ width: 10 }}
                    >
                      <Typography variant={"subtitle1"}>
                        {column.render("Header")}
                      </Typography>
                    </TableCell>
                  ) : (
                    <TableCell {...column.getHeaderProps()}>
                      <Grid
                        container
                        direction="row"
                        justify="space-between"
                        alignItems="center"
                      >
                        <Grid item xs={11} sm={11} md={11} lg={11} xl={11}>
                          <Typography variant={"subtitle1"}>
                            {column.render("Header")}
                          </Typography>
                        </Grid>
                        <Grid
                          item
                          xs={1}
                          sm={1}
                          md={1}
                          lg={1}
                          xl={1}
                          {...column.getHeaderProps(
                            column.getSortByToggleProps()
                          )}
                        >
                          {column.canSort ? (
                            column.isSorted ? (
                              column.isSortedDesc ? (
                                <KeyboardArrowDownIcon />
                              ) : (
                                <ExpandLessIcon />
                              )
                            ) : (
                              <SortIcon />
                            )
                          ) : null}
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                          {column.canFilter ? column.render("Filter") : null}
                        </Grid>
                      </Grid>
                    </TableCell>
                  )
                )}
              </TableRow>
            ))}
          </TableHead>
          <TableBody {...getTableBodyProps()}>
            {rows.map((row, i) => {
              prepareRow(row);
              return (
                <React.Fragment key={i}>
                  <TableRow {...row.getRowProps()}>
                    {row.cells.map((cell) => {
                      return (
                        <TableCell {...cell.getCellProps()}>
                          {cell.render("Cell")}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                  {/*
                    If the row is in an expanded state, render a row with a
                    column that fills the entire length of the table.
                  */}
                  {row.isExpanded ? (
                    <TableRow>
                      <TableCell colSpan={visibleColumns.length}>
                        {/*
                          Inside it, call our renderRowSubComponent function. In reality,
                          you could pass whatever you want as props to
                          a component like this, including the entire
                          table instance. But for this example, we'll just
                          pass the row
                        */}
                        {props.renderRowSubComponent(row)}
                      </TableCell>
                    </TableRow>
                  ) : null}
                </React.Fragment>
              );
            })}
          </TableBody>
        </MaUTable>
      </TableContainer>
    </React.Fragment>
  );
}

function App(props) {
  return (
    <div>
      <Table {...props} />
    </div>
  );
}

export default App;
