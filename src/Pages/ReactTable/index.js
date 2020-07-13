import { connect } from 'react-redux'
import ReactTableView from './reacttableview'
import { GetData } from '../../Redux/Modules/ReactTable'
/*
Here you send the status that the container will handle.
*/
export default connect(
  (state) => ({
    data: state.ReactTable.data,
    pages: state.ReactTable.pages,
    loading: state.ReactTable.loading,
    rowSelected: state.ReactTable.rowSelected,
    selectAll: state.ReactTable.selectAll,
    page: state.ReactTable.page,
    pageSize: state.ReactTable.pageSize
  }),
  //Here goes functions that you want to inyect into container
  { GetData },
)(ReactTableView)
