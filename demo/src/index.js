import React, { Component } from 'react'
import { render } from 'react-dom'

import Example from '../../src'
const columns = [
  { header: 'Id', accessor: 'id', type: 'text', form: false, hidden: true },
  { header: 'Name', accessor: 'name', type: 'text', form: true, required: true, url: false },
  { header: 'Description', accessor: 'description', type: 'text', form: true, required: true, url: false },
  { header: 'Tenant Id', accessor: 'tenant_id', type: 'number', form: true, required: true, url: false },
  { header: 'Help', accessor: 'help', type: 'text', form: true, required: true, url: false },
]
class Demo extends Component {
  render() {
    return <div>
      <Example
        columns={columns}
        host={'http://localhost:18080/graphql'}
        entity={'findWorkflowNodeList'}
        id={'id'}
        title={'Service Catalog'}
      />
    </div>
  }
}

render(<Demo />, document.querySelector('#demo'))
