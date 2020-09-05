import React from 'react'
import PropTypes from 'prop-types'
// CORE COMPONENTS
import Button from '@material-ui/core/Button'
import EbsMasterDetail from '../../src'
//MAIN FUNCTION
/*
 @param props: component properties
 @param ref: reference made by React.forward
*/
const GridWorkflowAtom = React.forwardRef((props, ref) => {
    // Properties of the atom
    const { ...rest } = props
    const columns = [
        { Header: 'id', accessor: 'id', hidden: true },
        { Header: 'Title', accessor: 'title', filter: true },
        { Header: 'Name', accessor: 'name', filter: true },
        { Header: 'Description', accessor: 'description', filter: true },
        { Header: 'Help', accessor: 'help', filter: true },
    ]

    return (
        /* 
         @prop data-testid: Id to use inside gridworkflow.test.js file.
         */
        <div data-testid={'GridWorkflowTestId'}>
            <EbsMasterDetail
                id='id'
                toolbar={true}
                url={'http://localhost:18080/graphql'}
                entity='Workflow'
                columns={columns}
                title='Workflows'
                callstandard='graphql'
            />
        </div>
    )
})
// Type and required properties
GridWorkflowAtom.propTypes = {}
// Default properties
GridWorkflowAtom.defaultProps = {}

export default GridWorkflowAtom
