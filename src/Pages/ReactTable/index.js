import { connect } from 'react-redux'
import ReactTableView from './reacttableview'
import { GetData, UpdateRowsSelected } from '../../Redux/Modules/ReactTable'
/*
Here you send the status that the container will handle.
*/
export default connect(
  (state) => ({
    data: state.ReactTable.data,
    loading: state.ReactTable.loading,
    rowSelected: state.ReactTable.rowSelected,
    selectAll: state.ReactTable.selectAll,
  }),
  //Here goes functions that you want to inyect into container
  { GetData, UpdateRowsSelected },
)(ReactTableView)
