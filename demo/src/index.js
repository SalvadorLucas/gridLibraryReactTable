import React, { Component } from 'react'
import { render } from 'react-dom'

import Example from '../../src'
const columns = [
  {
    Header: 'Id',
    accessor: 'id',
    hidden: true
  },
  {
    Header: 'Name',
    accessor: 'name',
    filter: true,
  },
  {
    Header: 'Code',
    accessor: 'code',
    filter: true,
  },
]

class Demo extends Component {
  render() {
    return <div>
      <Example
        columns={columns}
        uri={'http://localhost:28080/graphql'}
        entity={'Service'}
        id={'id'}
        title={'Service List'}
      />
    </div>
  }
}

render(<Demo />, document.querySelector('#demo'))
