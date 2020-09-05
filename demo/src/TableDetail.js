import React from 'react'
import MasterDetail from '../../src'

const TableDetail = React.forwardRef((props, ref) => {
    const columns = [
        { Header: 'id', accessor: 'id', hidden: true },
        { Header: 'Title', accessor: 'title', filter: true },
        { Header: 'Name', accessor: 'name', filter: true },
        { Header: 'Description', accessor: 'description', filter: true },
        { Header: 'Help', accessor: 'help', filter: true },
    ]
    return (
        <MasterDetail
            toolbar={true}
            columns={columns}
            uri='http://localhost:18080/graphql'
            entity='Workflow'
            id='id'
            title='Request'
            callstandard='graphql'
            defaultfilter={[{ mod: "LK", col: "name", val: "Seed" }]}
        />
    )
})

export default TableDetail