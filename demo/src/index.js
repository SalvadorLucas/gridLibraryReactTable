import React, { Component } from 'react'
import { render } from 'react-dom'

import Example from '../../src'
const columns = [
  { header: 'Id', accessor: 'id', type: 'text', form: false, hidden: true },
  { header: 'Name', accessor: 'name', type: 'text', form: true, required: true, url: false },
  // { header: 'Description', accessor: 'description', type: 'text', form: true, required: true, url: false },
  { header: 'Code', accessor: 'code', type: 'text', form: true, required: true, url: false },
]
const foreignKeys = [
  { entity:'Country', value:'id', label:'name' }
]
class Demo extends Component {
  render() {
    return <div>
      <Example
        columns={columns}
        host={'http://localhost:28080/graphql'}
        entity={'ServiceProvider'}
        id={'id'}
        title={'Service Provider List'}
        foreignKeys={foreignKeys}
      />
    </div>
  }
}

render(<Demo />, document.querySelector('#demo'))
