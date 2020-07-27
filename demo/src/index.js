import React, { Component } from 'react'
import { IconButton } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
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

const AddButton = () => {
  return (
    <IconButton title={'Button'} onClick={() => alert('action added')} color={'inherit'}><AddIcon /></IconButton>
  )
}

class Demo extends Component {
  render() {
    return <div>
      <Example
        toolbarActions={AddButton()}
        columns={columns}
        uri={'http://localhost:18080/graphql'}
        entity={'Service'}
        id={'id'}
        title={'Service List'}
      // actions={<p></p>}
      />
    </div>
  }
}

render(<Demo />, document.querySelector('#demo'))
