import React from 'react'
// CLIENT
import Client from './Utils/Client'
// CORE COMPONENTS
import {
    Card,
    CardContent,
    CardActions,
} from '@material-ui/core'
import Progress from './components/Atoms/Progress'
import Table from './components/Organisms/Table'
// OTHER
import { extractColumns } from './Utils/Client'
import Pagination from './components/Organisms/Pagination'

class MasterDetail extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: null,
            page: 1,
            pageSize: 10,
            pages: 1,
            error: null,
            actions: this.props.actions,
            uri: this.props.uri,
            title: this.props.title,
            entity: this.props.entity,
            defaultfilter: this.props.defaultfilter,
            callstandard: this.props.callstandard,
            toolbarActions: this.props.toolbaractions,
            columnsToFilter: [],
            filterValue: null,
            columns: extractColumns(this.props.columns)
        }
        this.Call = this.Call.bind(this)
    }
    componentDidMount() {
        Client(this.state.uri, this.state.entity, this.state.columns, this.state.callstandard, this.state.page, this.state.pageSize, this.state.columnsToFilter, this.state.filterValue, this.state.defaultfilter)
            .then(response => {
                this.setState({
                    data: response.data,
                    pages: response.pages,
                })
            })
            .catch(error => {
                this.setState({
                    error: error
                })
            })
    }
    Call(uri, entity, columns, callStandard, page, pageSize, columnsToFilter, value, defaultFilter) {
        Client(uri, entity, columns, callStandard, page, pageSize, columnsToFilter, value, defaultFilter)
            .then(response => {
                this.setState({
                    data: response.data,
                    pages: response.pages,
                    page: response.page,
                    pageSize: response.pageSize,
                    columnsToFilter: columnsToFilter,
                    filterValue: response.filterValue
                })
            })
            .catch(error => {
                this.setState({
                    error: error
                })
            })
    }
    render() {
        if (this.state.data === null) {
            return <Progress color='inherit' />
        } else {
            return (
                <React.Fragment>
                    <Card variant="outlined">
                        <CardContent>
                            <Table
                                {...this.state}
                                toolbar={this.props.toolbar}
                                Client={this.Call}
                                originalColumns={this.props.columns}
                                renderRowSubComponent={this.props.detailcomponent}
                            />
                        </CardContent>
                        <CardActions>
                            <Pagination
                                {...this.state}
                                Client={this.Call}
                            />
                        </CardActions>
                    </Card>
                </React.Fragment>
            )
        }
    }
}
export default MasterDetail