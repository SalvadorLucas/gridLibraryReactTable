import React from 'react'
import MasterDetail from '../../src'

const TableDetail = React.forwardRef((props, ref) => {
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
        }
    ]
    return (
        <MasterDetail
            columns={columns}
            uri='http://localhost:18080/graphql'
            entity='Service'
            id='id'
            title='Request'
            callstandard='graphql'
        />
    )
})

export default TableDetail