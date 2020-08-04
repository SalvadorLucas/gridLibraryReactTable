import { connect } from 'react-redux'
import ToolbarView from './toolbarview'
import {
  GetData,
  UpdateColumnsToFilter,
} from '../../Redux/Modules/ReactTable'
/*
Here you send the status that the container will handle.
*/
export default connect(
  (state) => ({
    uri: state.ReactTable.uri,
    entity: state.ReactTable.entity,
    columns: state.ReactTable.columns,
    pageSize: state.ReactTable.pageSize,
    columnsToFilter: state.ReactTable.columnsToFilter,
    rowSelected: state.ReactTable.rowSelected,
  }),
  //Here goes functions that you want to inyect into container
  { GetData, UpdateColumnsToFilter },
)(ToolbarView)
