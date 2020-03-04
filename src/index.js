import React from "react";
import _ from "lodash";
// Import React Table
import ReactTable from "react-table";
//HOCS
import SelectTableHOC from 'react-table/lib/hoc/selectTable';
//STYLES
import "react-table/react-table.css";
import './assets/scss/material-dashboard-pro-react/plugins/_plugin-react-table.scss'
// @material-ui components
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'
import muiTheme from './assets/json/cimmyt-default-theme.json'
// @material-ui/icons
import Assignment from "@material-ui/icons/Assignment";
// core components
import GridContainer from "./components/Grid/GridContainer.js";
import GridItem from "./components/Grid/GridItem.js";
import Card from "./components/Card/Card.js";
import CardBody from "./components/Card/CardBody.js";
import CardIcon from "./components/Card/CardIcon.js";
import CardHeader from "./components/Card/CardHeader.js";
import ModalPost from './components/Post/modalPost'
import Pagination from './components/CustomPagination/paginationComponent'
import DorpDownComponent from './components/DropDown/dropDownComponent'
// Functions
import BuildUrl from './functions/buildUrl'
import GenerateHeader from './functions/generateHeager'
import Get from './client/get'

const Table = SelectTableHOC(ReactTable);

const theme = createMuiTheme(muiTheme);

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      pages: null,
      loading: true,
      entity: this.props.entity,
      columns: this.props.columns,
      id: this.props.id,
      token: this.props.token,
      rowsSelected: [0],
      selectAll: false,
      page: 0,
      pageSize: 10,
      owner: this.props.owner,
      url: BuildUrl(this.props.host, this.props.entity, this.props.columns, 0, 10),
      filtered: [],
      sorted: [],
      startPage: 0,
      endPage: 5,
    };
    this.toggleSelection = this.toggleSelection.bind(this)
    this.fetchData = this.fetchData.bind(this);
    this.flag = this.changePage.bind(this)//FLAG TO REFRESH GRID
    this.changePageSize = this.changeSize.bind(this)//FLAG TO CHANGE GRID SIZE
    this.table = React.createRef()
  }

  fetchData(state, instance) {
    // Whenever the table model changes, or the user sorts or changes pages, this method gets called and passed the current table model.
    // You can set the `loading` prop of the table to true to use the built-in one or show you're own loading bar if you want.
    this.setState({ loading: true });
    // Request the data however you want.  Here, we'll use our mocked service we created earlier
    Get(
      // this.state.pageSize,
      this.state.owner,
      state.sorted,
      state.filtered,
      this.state.url,
      this.state.entity,
      this.state.columns,
      this.state.id,
      this.state.token,
      this.onClick
    )
      .then(res => {
        // Now just get the rows of data to your React Table (and update anything else like total pages or loading)
        this.setState({
          data: [],
          pages: res.pages,
          loading: false,
          rowsSelected: []
        }, () => {
          this.setState({
            data: res.rows,
          })
        });
      });
  }

  toggleSelection(key, shift, row) {
    const currentIndex = this.state.rowsSelected.indexOf(row[this.props.id]);
    let newChecked = this.state.rowsSelected;
    if (currentIndex === -1) {
      newChecked.push(row[this.props.id]);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    this.setState({
      rowsSelected: newChecked
    })
  }

  toggleAll() {
    const selectAll = this.state.selectAll ? false : true;
    const selection = [];
    if (selectAll) {
      // we need to get at the internals of ReactTable
      const wrappedInstance = this.table.current.wrappedInstance;
      // the 'sortedData' property contains the currently accessible records based on the filter and sort
      const currentRecords = wrappedInstance.getResolvedState().sortedData;
      // we just push all the IDs onto the selection array
      currentRecords.forEach(item => {
        selection.push(item._original.id);
      });
    }
    this.setState({
      selectAll: selectAll,
      rowsSelected: selection
    });
  }

  changePage(page) {
    this.setState({
      selectAll: false,
      page: page,
      url: BuildUrl(this.props.host, this.props.entity, this.props.columns, page, this.state.pageSize)
    }, () => {
      this.fetchData(this.table.current.wrappedInstance.state)
    })
    //PAGINATOR CONDITIONS
    switch (page) {
      case this.state.pages - 1:
        this.setState({
          endPage: this.state.pages,
          startPage: this.state.pages - 5
        })
        break;
      case 0:
        this.setState({
          endPage: 5,
          startPage: 0
        })
        break;
      case this.state.endPage:
        this.setState({
          endPage: this.state.endPage + 5,
          startPage: this.state.startPage + 5
        })
        break;
      case this.state.startPage - 1:
        this.setState({
          endPage: this.state.endPage - 5,
          startPage: this.state.startPage - 5
        })
        break;
    }
  }

  changeSize(size) {
    this.setState({
      pageSize: Number(size),
      page:0,
      url: BuildUrl(this.props.host, this.props.entity, this.props.columns, 0, Number(size))
    }, () => {
      this.fetchData(this.table.current.wrappedInstance.state)
    })
  }

  isSelected(key) {
    /*
      Instead of passing our external selection state we provide an 'isSelected'
      callback and detect the selection state ourselves. This allows any implementation
      for selection (either an array, object keys, or even a Javascript Set object).
    */
    return this.state.rowsSelected.includes(key);
  };

  render() {
    return (
      <GridContainer
        spacing={1}
        direction="row"
        justify="flex-end"
        alignItems="center">
        <GridItem lg={12} md={12} sm={12} xl={12} xs={12}>
          <Card>
            <GridContainer
              spacing={1}
              direction="row"
              justify="space-between"
              alignItems="center">
              <GridItem lg={11} md={10} sm={10} xl={11} xs={8}>
                <CardHeader
                  color="info" icon>
                  <CardIcon
                    color="success"
                  >
                    <Assignment />
                  </CardIcon>
                  <h3 style={{ color: 'black' }}>{this.props.title}</h3>
                </CardHeader>
              </GridItem>
              <GridItem lg={1} md={2} sm={2} xl={1} xs={4}>
                <CardHeader>
                  <MuiThemeProvider theme={theme}>
                    <ModalPost
                      settingForeignKeys={this.props.settingForeignKeys}//SETTING FOREIGN KEYS
                      columns={this.props.columns}//COLUMNS
                      host={this.props.host}//HOST
                      entity={this.props.entity}//ENTITY
                      token={this.state.token}//TOKEN
                      owner={this.state.owner}
                      refreshGrid={this.refreshGrid}//REFRESH GRID
                    ></ModalPost>
                  </MuiThemeProvider>
                </CardHeader>
              </GridItem>
            </GridContainer>
            <CardBody>
              <Table
                ref={this.table}
                showPagination={false}
                //HOC configuration
                keyField={this.props.id}
                isSelected={key =>
                  this.isSelected(key)
                }
                selectType={'checkbox'}
                toggleSelection={(key, shift, row) => {
                  this.toggleSelection(key, shift, row)
                }}
                selectAll={this.state.selectAll}
                toggleAll={() => this.toggleAll()}
                //REACTABLE configuration
                columns={GenerateHeader(this.props.columns)}
                manual // Forces table not to paginate or sort automatically, so we can handle it server-side
                data={this.state.data}
                loading={this.state.loading} // Display the loading overlay when we need it
                onFetchData={this.fetchData} // Request new data when things change
                filterable
                defaultPageSize={this.state.pageSize}
                style={{
                  height: "650px" // This will force the table body to overflow and scroll, since there is not enough room
                }}
                className="-striped -highlight"
              />
              <GridContainer
                spacing={0}
                direction="row"
                justify="flex-end"
                alignItems="center">
                <GridItem lg={1} md={1} sm={1} xl={1} xs={1}>
                  <DorpDownComponent
                    onChange={this.changePageSize}
                  />
                </GridItem>
                <GridItem lg={3} md={4} sm={6} xl={10} xs={10}>
                  <Pagination
                    pages={this.state.pages}
                    startPage={this.state.startPage}
                    endPage={this.state.endPage}
                    currentPage={this.state.page}
                    onClick={this.flag}
                  />
                </GridItem>
              </GridContainer>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    );
  }
}