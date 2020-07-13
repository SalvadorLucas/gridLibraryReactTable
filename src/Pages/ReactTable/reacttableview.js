import React from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import MaUTable from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import { useTable } from 'react-table'
import Progress from '../../components/Progress'
const Table = (props) => {
  const { data } = props
  const column = props.columns
  const columns = React.useMemo(() => column, [])
  // Use the state and functions returned from useTable to build your UI
  const { getTableProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data,
  })

  // Render the UI for your table
  return (
    <MaUTable {...getTableProps()}>
      <TableHead>
        {headerGroups.map(headerGroup => (
          <TableRow {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <TableCell {...column.getHeaderProps()}>
                {column.render('Header')}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableHead>
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
  )
}

const App = (props) => {
  const {
    data,
    pages,
    loading,
    rowSelected,
    selectAll,
    page,
    pageSize,
    GetData,
    entity,
    columns
  } = props
  if (loading === false && data.length === 0) {
    GetData(entity, columns, page, pageSize)
  }
  if (data.length === 0) {
    return (
      <Progress />
    )
  } else {
    return (
      <div>
        <CssBaseline />
        <Table {...props} />
      </div>
    )
  }
}

export default App
