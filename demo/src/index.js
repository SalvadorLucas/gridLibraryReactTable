import React, { Component } from 'react'
import { render } from 'react-dom'
import MasterTable from './MasterTable'
import TableDetail from './TableDetail'
import WF from './wf'

class Demo extends Component {
  render() {
    return <div>
      <MasterTable />
      {/* <TableDetail/> */}
      {/* <WF/> */}
    </div>
  }
}

render(<Demo />, document.querySelector('#demo'))