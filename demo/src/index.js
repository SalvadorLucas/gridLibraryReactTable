import React, { Component } from 'react'
import { render } from 'react-dom'
import MasterTable from './MasterTable'
import TableDetail from './TableDetail'
import WF from './wf'
import ControlledTable from './controlledTable'

class Demo extends Component {
  render() {
    return <div>
      {/* <ControlledTable /> */}
      <MasterTable />
      {/* <TableDetail/> */}
      {/* <WF/> */}
    </div>
  }
}

render(<Demo />, document.querySelector('#demo'))