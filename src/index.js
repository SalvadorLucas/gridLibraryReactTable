import React from "react";
// CLIENT
import Client from "./Utils/Client";
import { Grid } from "@material-ui/core";
// CORE COMPONENTS
import Progress from "./components/Atoms/Progress";
import Table from "./components/Organisms/TableGrid";
import Pagination from "./components/Organisms/Pagination";
// OTHER
import { extractColumns } from "./Utils/Client";

// This root component manages the state of three big components (Toolbar, TableGrid and Pagination)

class MasterDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uri: this.props.uri,
      entity: this.props.entity,
      callstandard: this.props.callstandard,
      toolbar: this.props.toolbar,
      page: 1,
      pageSize: 10,
      rowActions: this.props.rowactions,
      title: this.props.title,
      defaultfilter: this.props.defaultfilter,
      toolbarActions: this.props.toolbaractions,
      toolbarMobileActions: this.props.toolbarMobileActions,
      columnsToFilter: [],
      filterValue: null,
      columns: extractColumns(this.props.columns),
      originalColumns: this.props.columns,
      data: this.props.data,
      indexing: this.props.indexing,
      globalFilter: this.props.globalfilter,
      select: this.props.select,
      renderRowSubComponent: this.props.detailcomponent,
    };
    this.FetchFunction = this.FetchFunction.bind(this);
    this.setColumnsToFilter = this.setColumnsToFilter.bind(this);
    this.setFilterValue = this.setFilterValue.bind(this);
    this.setPageSize = this.setPageSize.bind(this);
  }

  // Update columns to filter to the Global Filter
  setColumnsToFilter(newColumns) {
    this.setState({
      ...this.state,
      columnsToFilter: newColumns,
    });
  }

  // Update filter value to the Global Filter
  setFilterValue(newFilterValue) {
    this.setState({
      ...this.state,
      filterValue: newFilterValue,
    });
  }

  // Update pageSize to Pagination
  setPageSize(newSize) {
    this.setState({
      ...this.state,
      pageSize: newSize,
    });
  }

  async FetchFunction(
    uri,
    entity,
    columns,
    callStandard,
    page,
    pageSize,
    columnsToFilter,
    filterValue,
    defaultFilter
  ) {
    if (uri) {
      const data = await Client(
        uri,
        entity,
        columns,
        callStandard,
        page,
        pageSize,
        columnsToFilter,
        filterValue,
        defaultFilter
      );
      this.setState({
        page: page,
        uri: uri,
        entity: entity,
        callstandard: callStandard,
        data: data.data,
        pages: data.pages,
        pageSize: pageSize,
        columnsToFilter: columnsToFilter,
        filterValue: filterValue,
      });
    } else {
      this.props.fetch(page, pageSize, columnsToFilter, filterValue);
    }
  }

  componentDidMount() {
    // If data is empty
    !this.state.data &&
      this.FetchFunction(
        this.state.uri,
        this.state.entity,
        this.state.columns,
        this.state.callstandard,
        1,
        10,
        this.state.columnsToFilter,
        this.state.filterValue,
        this.state.defaultfilter
      );
  }

  render() {
    return (
      ((this.state.data || this.props.data) && (
        <Grid
          container
          direction="row"
          justify="flex-start"
          alignItems="flex-start"
        >
          {this.props.fetch ? (
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <Table
                {...this.state}
                data={this.props.data}
                FetchFunction={this.FetchFunction}
                setColumnsToFilter={this.setColumnsToFilter}
                setFilterValue={this.setFilterValue}
              />
              {this.props.pagination && (
                <Pagination
                  {...this.state}
                  pages={this.props.totalPages}
                  page={this.props.page}
                  FetchFunction={this.FetchFunction}
                  setPageSize={this.setPageSize}
                />
              )}
            </Grid>
          ) : (
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <Table
                {...this.state}
                FetchFunction={this.FetchFunction}
                setColumnsToFilter={this.setColumnsToFilter}
                setFilterValue={this.setFilterValue}
              />
              {this.props.pagination && (
                <Pagination
                  {...this.state}
                  FetchFunction={this.FetchFunction}
                  setPageSize={this.setPageSize}
                />
              )}
            </Grid>
          )}
        </Grid>
      )) || <Progress />
    );
  }
}

export default MasterDetail;
