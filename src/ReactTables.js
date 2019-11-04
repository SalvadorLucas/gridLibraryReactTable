import React from "react";
import _ from "lodash";

// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";
import './styles.css'
import './assets/scss/material-dashboard-pro-react/plugins/_plugin-react-table.scss'
// @material-ui components
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'
import muiTheme from './cimmyt-default-theme.json'
// @material-ui/icons
import Assignment from "@material-ui/icons/Assignment";
// core components
import GridContainer from "./components/Grid/GridContainer.js";
import GridItem from "./components/Grid/GridItem.js";
import Card from "./components/Card/Card.js";
import CardBody from "./components/Card/CardBody.js";
import CardIcon from "./components/Card/CardIcon.js";
import CardHeader from "./components/Card/CardHeader.js";
import ModalDelete from './modalDelete'
import ModalPut from './modalPut'
import ModalPost from './modalPost'
import CheckBox from './checkBoxComponent'
import Pagination from './paginationComponent'
import Axios from "axios";

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
      // token: JSON.parse(localStorage.getItem('auth_token')).access_token
      token: '609afda2-7e32-3626-b353-99f775cd86c7',
      rowsChecked: [],
      selectAll: false,
      page: 0,
      pageSize: 5,
      url: this.buildUrl(this.props.host, this.props.entity, this.props.columns, 0, 5),
      filtered: [],
      sorted: []
    };
    this.onClick = this.handleToggle.bind(this)
    this.fetchData = this.fetchData.bind(this);
    this.columns = this.generateHeader()
    this.flag = this.changePage.bind(this)//FLAG TO REFRESH GRID
    this.table = React.createRef()
  }

  checkbox(props, url, entity, datafields, id, token){
    return (
    <CheckBox 
      handleToggle={this.onClick} 
      id={props[id]} 
      checked={this.state.rowsChecked}/>
      )
    }

  actions(props, url, entity, datafields, id, token){
    return (
    // we've added some custom button actions
    <MuiThemeProvider theme={theme}> 
    <table
      align={'right'}>
      <tbody>
        <tr>
          <td>
            {/* UPDATE COMPONENT */}
              <ModalPut
                id={id}//ID ROW
                entity={entity}//ENTITY
                rowData={props}//ROW DATA
                columns={datafields}//DATAFIELDS
                url={url}//HOST
                token={token}//TOKEN FOR API
              ></ModalPut>
          </td>
          <td>
            <p>{' '}</p>
          </td>
          <td>
            {/* DELETE COMPONENT */}
              <ModalDelete
                id={id}//ID ROW
                entity={entity}//ENTITY
                rowData={props}//ROW DATA
                url={url}//HOST
                token={token}//TOKEN FOR API
              ></ModalDelete>
          </td>
        </tr>
      </tbody>
    </table>
    </MuiThemeProvider>)
  }

  requestData(pageSize, sorted, filtered, url, entity, datafields, id, token) {
    return new Promise((resolve, reject) => {
  
      // You can retrieve your data however you want, in this case, we will just use some local data.
      let filteredData = null
        Axios.get(url, {headers:{
          'Accept': 'Application/json',
          'Authorization': `Bearer ${token}`
        }}).then((response)=>{
          filteredData = response.data['get_'+(entity.replace('-','_'))].data[0][entity.replace('-','_')]
          /**
           * Adding actions custom buttons
           */
          filteredData.map((item) =>{
            item['checkbox']=this.checkbox(item, url, entity, datafields, id, token)
            item['actions']=this.actions(item, url, entity, datafields, id, token)
          })
          /**
           *End of adding buttons
           */
       
          // You can use the filters in your request, but you are responsible for applying them.
            if (filtered.length) {
              filteredData = filtered.reduce((filteredSoFar, nextFilter) => {
                return filteredSoFar.filter(row => {
                  return (row[nextFilter.id] + "").startsWith(nextFilter.value);
                });
              }, filteredData);
            }
            // You can also use the sorting in your request, but again, you are responsible for applying it.
            const sortedData = _.orderBy(
              filteredData,
              sorted.map(sort => {
                return row => {
                  if (row[sort.id] === null || row[sort.id] === undefined) {
                    return -Infinity;
                  }
                  return typeof row[sort.id] === "string"
                    ? row[sort.id].toLowerCase()
                    : row[sort.id];
                };
              }),
              sorted.map(d => (d.desc ? "desc" : "asc"))
            );
          // You must return an object containing the rows of the current page, and optionally the total pages number.
            const res = {
              rows: sortedData,
              pages: Math.ceil(response.data['get_'+(entity.replace('-','_'))].data[0]['count'] / pageSize),
              // pages: Math.ceil(filteredData.length / pageSize)
            };
        resolve(res)
            }
          )
    });
  }
  
  buildUrl(host, entity, columns, page, pageSize){
    let base = host+entity+'?'
    columns.map((element)=>{
      if(element.url === true){
        switch(element.type){
          case 'text':
            base+=element.accessor+'=&'
            break
          case 'number':
            base+=element.accessor+'=0&'
            break
        }
      }
    })
    base+='page='+page+'&page_size='+pageSize
    return base
  }

  fetchData(state, instance) {
    // Whenever the table model changes, or the user sorts or changes pages, this method gets called and passed the current table model.
    // You can set the `loading` prop of the table to true to use the built-in one or show you're own loading bar if you want.
    this.setState({ loading: true });
    // Request the data however you want.  Here, we'll use our mocked service we created earlier
    this.requestData(
      this.state.pageSize,
      state.sorted,
      state.filtered,
      this.state.url,
      this.state.entity,
      this.state.columns,
      this.state.id,
      this.state.token,
    )
    .then(res => {
      // Now just get the rows of data to your React Table (and update anything else like total pages or loading)
      this.setState({
        data: res.rows,
        pages: res.pages,
        loading: false
      });
    });
  }

  generateHeader(){
    let columns = []
    columns.push({
      Header: <CheckBox 
                handleToggle={this.onClick} 
                id={-2} 
                checked={this.state.rowsChecked}/>,
      accessor: 'checkbox',
      sortable: false,
      filterable: false,
      width: 60
    })
    this.props.columns.map((item) => {
      if(item.hidden == false || !item.hidden){
        columns.push({
          Header: item.header,
          accessor: item.accessor
        })
      }
    })
    columns.push({
      Header: "Actions",
      accessor: "actions",
      sortable: false,
      filterable: false,
      width: 170
    })
    return columns
  }

  handleToggle(value) {
    const currentIndex = this.state.rowsChecked.indexOf(value);
    const newChecked = this.state.rowsChecked;

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    this.setState({
      rowsChecked: newChecked
    })
  };

  changePage(page){
    this.setState({
      page: page,
      url: this.buildUrl(this.props.host, this.props.entity, this.props.columns, page, this.state.pageSize)
    },()=>{
      this.fetchData(this.table.current.state)
    })
  }


  render() {
    return (
      <GridContainer>
        <GridItem xs={12}>
          <Card>
            <CardHeader 
            color="info" icon>
              <CardIcon 
              color="success" 
              style={{width:20, height:20}}>
                <Assignment />
              </CardIcon>
              <h4 style={{color:'black'}}>{this.props.entity.replace('-',' ').toUpperCase()}</h4>
            </CardHeader>
            <CardBody>
            <ReactTable
              ref={this.table}
              showPagination={false}
              columns={this.columns}
              manual // Forces table not to paginate or sort automatically, so we can handle it server-side
              data={this.state.data}
              loading={this.state.loading} // Display the loading overlay when we need it
              onFetchData={this.fetchData} // Request new data when things change
              filterable
              defaultPageSize={this.state.pageSize}
              className="-striped -highlight"
            />
            <Pagination 
              pages={this.state.pages} 
              currentPage={this.state.page} 
              onClick={this.flag}
              />
            <MuiThemeProvider theme={theme}>
              <ModalPost 
                settingForeignKeys={this.props.settingForeignKeys}//SETTING FOREIGN KEYS
                columns={this.props.columns}//COLUMNS
                host={this.props.host}//HOST
                entity={this.props.entity}//ENTITY
                token={this.state.token}//TOKEN
              ></ModalPost>
            </MuiThemeProvider>
          </CardBody>
          </Card>
        </GridItem>
    </GridContainer>
    );
  }
}