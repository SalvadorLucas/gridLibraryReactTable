import React from 'react'
import PropTypes from 'prop-types'
// CORE COMPONENTS
import Pagination from '../../components/Molecules/Pagination'

//You can use { name, Function, ... } as properties for you container
export default function PaginationView(props) {
  /* This will be rendered in View
    @prop data-testid: Id to use inside pagination.test.js file.
   */
  return (
    <Pagination
      {...props}
    />
  )
}
// Type and required properties
PaginationView.propTypes = {
}
