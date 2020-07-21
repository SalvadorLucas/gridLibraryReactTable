import { connect } from 'react-redux'
import PaginationView from './paginationview'
import { HandleChangePage } from '../../Redux/Modules/ReactTable'
/*
Here you send the status that the container will handle.
*/
export default connect(
  (state) => ({
    pages: state.ReactTable.pages,
    page: state.ReactTable.page,
    pageSize: state.ReactTable.pageSize
  }),
  //Here goes functions that you want to inyect into container
  { HandleChangePage },
)(PaginationView)
