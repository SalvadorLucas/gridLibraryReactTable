import React from "react";
// CLIENT
import Client from "./Utils/Client";
// CORE COMPONENTS
import Progress from "./components/Atoms/Progress";
import Table from "./components/Organisms/Table";
// OTHER
import { extractColumns } from "./Utils/Client";

class MasterDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      actions: this.props.actions,
      title: this.props.title,
      defaultfilter: this.props.defaultfilter,
      toolbarActions: this.props.toolbaractions,
      toolbarMobileActions: this.props.toolbarMobileActions,
      columnsToFilter: [],
      filterValue: null,
      columns: extractColumns(this.props.columns),
      select: this.props.select
    };
    this.Call = this.Call.bind(this);
  }

  componentDidMount() {
    if (this.props.uri) {
      Client(
        this.props.uri,
        this.props.entity,
        this.state.columns,
        this.props.callstandard,
        1,
        10,
        [],
        null,
        this.state.defaultfilter
      )
        .then((response) => {
          this.setState({
            page: 1,
            uri: this.props.uri,
            entity: this.props.entity,
            callstandard: this.props.callstandard,
            data: response.data,
            pages: response.pages,
          });
        })
        .catch((error) => {
          this.setState({
            error: error,
          });
        });
    }
  }

  Call(
    uri,
    entity,
    columns,
    callStandard,
    page,
    pageSize,
    columnsToFilter,
    value,
    defaultFilter
  ) {
    Client(
      uri,
      entity,
      columns,
      callStandard,
      page,
      pageSize,
      columnsToFilter,
      value,
      defaultFilter
    )
      .then((response) => {
        this.setState({
          data: response.data,
          pages: response.pages,
          page: response.page,
          pageSize: response.pageSize,
          columnsToFilter: columnsToFilter,
          filterValue: response.filterValue,
        });
      })
      .catch((error) => {
        this.setState({
          error: error,
        });
      });
  }

  render() {
    if (!this.state.data && !this.props.data) {
      return <Progress color="inherit" />;
    } else {
      return (
        <React.Fragment>
          {this.props.uri ? (
            <Table
              {...this.state}
              toolbar={this.props.toolbar}
              Client={this.Call}
              originalColumns={this.props.columns}
              renderRowSubComponent={this.props.detailcomponent}
            />
          ) : (
            <Table
              {...this.state}
              data={this.props.data}
              toolbar={this.props.toolbar}
              Client={this.props.fetch}
              pages={this.props.totalPages}
              page={this.props.page}
              originalColumns={this.props.columns}
              renderRowSubComponent={this.props.detailcomponent}
            />
          )}
        </React.Fragment>
      );
    }
  }
}
export default MasterDetail;
