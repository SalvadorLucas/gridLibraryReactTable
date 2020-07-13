import React, { Component } from 'react'
import { render } from 'react-dom'

import Example from '../../src'
const columns = [
  {
    Header: 'Id',
    accessor: 'id'
  },
  {
    Header: 'Name',
    accessor: 'name'
  },
  {
    Header: 'Description',
    accessor: 'description'
  },
  {
    Header: 'Code',
    accessor: 'code'
  },
]

class Demo extends Component {
  render() {
    return <div>
      <Example
        columns={columns}
        uri={'http://localhost:28080/graphql'}
        entity={'Purpose'}
        id={'id'}
        title={'Purpose List'}
      />
    </div>
  }
}

render(<Demo />, document.querySelector('#demo'))
