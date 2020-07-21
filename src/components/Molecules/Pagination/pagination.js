import React from 'react'
import PropTypes from 'prop-types'
// CORE COMPONENTS
import { Grid } from '@material-ui/core'
import Pagination from '@material-ui/lab/Pagination'
// STYLES
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}))
//MAIN FUNCTION
/*
 @param props: component properties
 @param ref: reference made by React.forward
*/
const PaginationMolecule = React.forwardRef((props, ref) => {
  const classes = useStyles()
  // Properties of the molecule
  const { uri, pages, page, pageSize, entity, columns, HandleChangePage, ...rest } = props
  const [currentPage, setCurrentPage] = React.useState(page)
  const handleChange = (event, value) => {
    setCurrentPage(value)
    HandleChangePage(uri, entity, columns, value, pageSize)
  }
  return (
    /* 
     @prop data-testid: Id to use inside pagination.test.js file.
     */
    <Grid
      container
      ref={ref}
      direction='row'
      justify="flex-end"
      alignItems='flex-start'
      data-testid={'PaginationTestId'}
    >
      <Grid item xs={'auto'} sm={'auto'} md={'auto'} lg={'auto'} xl={'auto'}>
        <div
          classes={classes.root}
        >
          <Pagination
            color="primary"
            count={pages}
            page={currentPage}
            onChange={handleChange}
            showFirstButton
            showLastButton
          />
        </div>
      </Grid>
    </Grid>
  )
})
// Type and required properties
PaginationMolecule.propTypes = {
  HandleChangePage: PropTypes.func.isRequired,
  page: PropTypes.number,
  pages: PropTypes.number.isRequired,
  entity: PropTypes.string.isRequired,
  columns: PropTypes.array.isRequired,
  uri: PropTypes.string.isRequired,
  pageSize: PropTypes.number.isRequired,
}
// Default properties
PaginationMolecule.defaultProps = {
  page: 1,
}

export default PaginationMolecule
