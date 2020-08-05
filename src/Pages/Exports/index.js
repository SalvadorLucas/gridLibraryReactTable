import { connect } from 'react-redux'
import ExportsView from './exportsview'
/*
Here you send the status that the container will handle.
*/
export default connect(
  (state) => ({
    data: state.ReactTable.data,
  }),
  //Here goes functions that you want to inyect into container
  //{ Funcion },
)(ExportsView)
