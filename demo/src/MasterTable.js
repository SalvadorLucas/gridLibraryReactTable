import React from 'react'
import {
    IconButton, Grid
} from '@material-ui/core'
import MasterDetail from '../../src'
import DetailTable from './TableDetail'
import DeleteIcon from '@material-ui/icons/Delete'
import AddIcon from '@material-ui/icons/Add'

const MasterTable = React.forwardRef((props, ref) => {
    const columns = [
        {
            Header: 'Grpup 1',
            columns: [
                {
                    Header: 'Id',
                    accessor: 'id',
                    hidden: true
                },
                {
                    Header: 'Name',
                    accessor: 'name',
                    filter: true,
                }
            ]
        },
        {
            Header: 'Group 2',
            columns: [
                {
                    Header: 'Code',
                    accessor: 'code',
                    filter: true,
                }
            ]
        }
    ]
    // Request Manager columns
    const rColumns = [
        // { Header: 'RM_Crop', accessor: 'RM_Crop' },
        // { Header: 'RM_Purpose', accessor: 'RM_Purpose' },
        // { Header: 'RM_Service', accessor: 'RM_Service' },
        // { Header: 'RM_ServiceProvider', accessor: 'RM_ServiceProvider' },
        // { Header: 'RM_ServiceType', accessor: 'RM_ServiceType' },
        { Header: 'admin_contact', accessor: 'admin_contact' },
        { Header: 'charge_account', accessor: 'charge_account' },
        { Header: 'creation_timestamp', accessor: 'creation_timestamp' },
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
    const AddButton = (selection, refresh) => {
        return (
            <IconButton title={'Button'} onClick={() => {alert(selection); refresh();}} color={'inherit'}><AddIcon /></IconButton>
        )
    }
    const Actions = (row, refresh) => {
        const handleClick = () => {
            alert(row.id)
            refresh()
        }
        return (
            <Grid container>
                <Grid item>
                    <IconButton size='small' onClick={refresh} color='primary'><DeleteIcon /></IconButton>
                </Grid>
                <Grid item>
                    <IconButton size='small' onClick={handleClick} color='primary'><DeleteIcon /></IconButton>
                </Grid>
            </Grid>
        )
    }
    const TableDetail = (row) => {
        return (
            <DetailTable />
        )
    }
    return (
        <React.Fragment>
            <MasterDetail
                toolbar={true}
                toolbaractions={AddButton}
                columns={columns}
                // uri={'http://localhost:8000/api/tenant/1/workflow/3/node/4'}
                uri='http://localhost:18080/graphql'
                entity='Service'
                id='id'
                actions={Actions}
                title='Request'
                callstandard='graphql'//brapi
                detailcomponent={TableDetail}
            />
        </React.Fragment>
    )
})

export default MasterTable