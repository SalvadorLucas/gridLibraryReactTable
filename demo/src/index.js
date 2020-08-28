import React, { Component } from 'react'
import { render } from 'react-dom'
import MasterTable from './MasterTable'
import TableDetail from './TableDetail'

class Demo extends Component {
  render() {
    return <div>
      <MasterTable />
      {/* <TableDetail/> */}
    </div>
  }
}

render(<Demo />, document.querySelector('#demo'))