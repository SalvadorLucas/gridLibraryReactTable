import React from "react";
import PropTypes from "prop-types";
// CORE COMPONENTS
import {
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Grid,
  Typography,
  IconButton,
  Table,
  Box,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {
  useTable,
  useSortBy,
  useFilters,
  useExpanded,
  useRowSelect,
} from "react-table";
// Icons
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import SortIcon from "@material-ui/icons/Sort";
// OTHER
import Toolbar from "../ToolBar";
import {
  DefaultFilterAtom,
  fuzzyTextFilterFn,
} from "../../Atoms/DefaultFilter/defaultfilter";
import IndeterminateCheckbox from "../../Atoms/Checkbox";

//MAIN FUNCTION
/*
 @param props: component properties
 @param ref: reference made by React.forward
*/
const TableGridAtom = React.forwardRef((props, ref) => {
  const {
    toolbar,
    data,
    uri,
    entity,
    title,
    page,
    pages,
    defaultfilter,
    toolbarActions,
    toolbarMobileActions,
    rowActions,
    renderRowSubComponent,
    FetchFunction,
    callstandard,
    select,
    setColumnsToFilter,
    setFilterValue,
    ...rest
  } = props;
  // Special styles for make responsive the Actions column
  const [width, setWidth] = React.useState(() => {
    const nodesByRow = rowActions
      ? rowActions({}, () => {}).props.children.length
      : 0;
    return (typeof nodesByRow === "number" && 30 * nodesByRow) || 15;
  });
  const useStyles = makeStyles({
    container: {
      maxHeight: "85vh",
    },
    row: {
      minWidth: 100,
      maxWidth: "100%",
    },
    actions: {
      width: width,
    },
  });
  const classes = useStyles();
  // Save all columns to display (including actions, expandible and selectable if they are necessary)
  let newColumns = [];
  rowActions &&
    newColumns.push({
      // Make an actions cell
      Header: () => "Actions",
      id: "actions", // It needs an ID
      Cell: ({ row }) => (
        // Use Cell to render actions for each row.
        <Box>{rowActions(row.original, refreshGrid)}</Box>
      ),
    });
  renderRowSubComponent &&
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
  newColumns = newColumns.concat(props.originalColumns);

  // Set hidden columns
  const hiddenColumns = [];
  props.columns.map((column) => {
    column.hidden && hiddenColumns.push(column.accessor);
  });
  !select && hiddenColumns.push("selectable");

  function refreshGrid() {
    FetchFunction(
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

  // Prepare all columns
  const columns = React.useMemo(() => newColumns, []);

  // Default column settings
  const defaultColumn = React.useMemo(
    () => ({
      // Let's set up our default Filter UI
      Filter: DefaultFilterAtom,
    }),
    []
  );

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

  // Let the table remove the filter if the string is empty
  fuzzyTextFilterFn.autoRemove = (val) => !val;

  // Use the state and functions returned from useTable to build the UI
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
    // useFlexLayout,
    // for sub components too!
    (hooks) => {
      hooks.visibleColumns.push((columns) => [
        // Let's make a column for selection
        {
          id: "selectable",
          // The header can use the table's getToggleAllRowsSelectedProps method
          // to render a checkbox
          Header: ({ getToggleAllRowsSelectedProps }) => {
            switch (select) {
              case "multi":
                return (
                  <IndeterminateCheckbox
                    color="primary"
                    {...getToggleAllRowsSelectedProps()}
                  />
                );
              case "single":
                return <div />;
              default:
                return <div />;
            }
          },
          // The cell can use the individual row's getToggleRowSelectedProps method
          // to the render a checkbox
          Cell: ({ row }) => {
            switch (select) {
              case "multi":
                return (
                  <IndeterminateCheckbox
                    color="primary"
                    {...row.getToggleRowSelectedProps()}
                  />
                );
              case "single":
                if (
                  rows.filter((row) => row.isSelected).length < 1 ||
                  row.isSelected
                ) {
                  return (
                    <IndeterminateCheckbox
                      {...row.getToggleRowSelectedProps()}
                    />
                  );
                } else {
                  return (
                    <IndeterminateCheckbox
                      checked={false}
                      readOnly
                      style={row.getToggleRowSelectedProps().style}
                    />
                  );
                }
              default:
                return <div />;
            }
          },
        },
        ...columns,
      ]);
    }
  );
  return (
    /* 
     @prop data-testid: Id to use inside tablegrid.test.js file.
     */
    <div data-testid={"TableGridTestId"}>
      {toolbar && (
        <Toolbar
          {...props}
          rowsSelected={selectedFlatRows}
          allColumns={allColumns}
          getToggleHideAllColumnsProps={getToggleHideAllColumnsProps}
          hiddenColumns={hiddenColumns}
        />
      )}
      <TableContainer className={classes.container}>
        <Table
          size={select ? "small" : "medium"}
          {...getTableProps()}
          stickyHeader
          aria-label="sticky table"
        >
          <TableHead>
            {headerGroups.map((headerGroup) => (
              <TableRow {...headerGroup.getHeaderGroupProps()}>
                {/* Set padding to selectable and expandible column, set sorting and default filter for others */}
                {headerGroup.headers.map((column) =>
                  column.id.includes("expander") ||
                  column.id.includes("selectable") ? (
                    <TableCell {...column.getHeaderProps()} padding="checkbox">
                      {/*Set pagind for checkbox and expandible column*/}
                      <Typography variant={"subtitle1"}>
                        {column.render("Header")}
                      </Typography>
                    </TableCell>
                  ) : (
                    (column.id.includes("actions") && ( //
                      <TableCell
                        {...column.getHeaderProps()}
                        className={classes.actions}
                      >
                        <Typography variant={"subtitle1"}>
                          {column.render("Header")}
                        </Typography>
                      </TableCell>
                    )) || (
                      <TableCell
                        {...column.getHeaderProps()}
                        className={classes.row}
                      >
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
                  )
                )}
              </TableRow>
            ))}
          </TableHead>
          <TableBody {...getTableBodyProps()}>
            {rows.map((row, key) => {
              prepareRow(row);
              return (
                <React.Fragment key={key}>
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
                  {row.isExpanded && (
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
                  )}
                </React.Fragment>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
});
// Type and required properties
TableGridAtom.propTypes = {};
// Default properties
TableGridAtom.defaultProps = {};

export default TableGridAtom;
