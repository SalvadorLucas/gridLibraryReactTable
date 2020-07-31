import React, { Component } from 'react'
import { IconButton } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import { render } from 'react-dom'

import Example from '../../src'
//Service entity columns
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
// Request Manager columns
const rColumns = [
  // { Header: 'RM_Crop', accessor: 'RM_Crop' },
  // { Header: 'RM_Purpose', accessor: 'RM_Purpose' },
  // { Header: 'RM_Service', accessor: 'RM_Service' },
  // { Header: 'RM_ServiceProvider', accessor: 'RM_ServiceProvider' },
  // { Header: 'RM_ServiceType', accessor: 'RM_ServiceType' },
  // { Header: 'admin_contact', accessor: 'admin_contact' },
  // { Header: 'charge_account', accessor: 'charge_account' },
  // { Header: 'creation_timestamp', accessor: 'creation_timestamp' },
  // { Header: 'creator_id', accessor: 'creator_id' },
  // { Header: 'description', accessor: 'description' },
  // { Header: 'id', accessor: 'id', hidden: true },
  // { Header: 'initiated', accessor: 'initiated' },
  // { Header: 'is_void', accessor: 'is_void' },
  // { Header: 'modification_timestamp', accessor: 'modification_timestamp' },
  // { Header: 'modifier_id', accessor: 'modifier_id' },
  // { Header: 'phase', accessor: 'phase' },
  // { Header: 'requester', accessor: 'requester' },
  // { Header: 'stage', accessor: 'stage' },
  // { Header: 'stagestatus', accessor: 'stagestatus' },
  // { Header: 'step', accessor: 'step' },
  // { Header: 'submition_date', accessor: 'submition_date' },
  // { Header: 'tenant_id', accessor: 'tenant_id' },
  // { Header: 'workflow', accessor: 'workflow' },
  // { Header: 'workflowinstance_id', accessor: 'workflowinstance_id' },
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
        columns={rColumns}
        uri={'http://localhost:8000/api/tenant/1/workflow/3/node/4'}
        entity={'Service'}
        id={'id'}
        title={'Request Manager'}
        // actions={<p></p>}
        callStandard={'brapi'} // graphql or brapi
      />
    </div>
  }
}

render(<Demo />, document.querySelector('#demo'))
