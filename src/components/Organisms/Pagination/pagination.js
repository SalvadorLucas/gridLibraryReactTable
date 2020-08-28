import React from 'react'
import PropTypes from 'prop-types'
// CORE COMPONENTS
import {
  Grid,
  Typography,
  MenuItem,
  FormControl,
  Select,
  TextField,
  Button
} from '@material-ui/core'
// OTHER COMPONENTS
import Pagination from '../../Molecules/Pagination'
// Styles 
import { makeStyles } from '@material-ui/core/styles'
const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: 10,
  },
  root: {
    '& > *': {
      width: '7ch',
    },
  },
}))
//MAIN FUNCTION
/*
 @param props: component properties
 @param ref: reference made by React.forward
*/
const PaginationOrganism = React.forwardRef((props, ref) => {
  // Properties of the organism
  const { Client, uri, entity, columns, callstandard, defaultfilter, columnsToFilter, page, filterValue, ...rest } = props
  const [pageSize, setPageSize] = React.useState(10)
  const [goToPageNumber, setGoToPageNumber] = React.useState(null)
  const classes = useStyles()
  const handleChange = (event) => {
    setPageSize(event.target.value)
    Client(uri, entity, columns, callstandard, 1, event.target.value, columnsToFilter, filterValue, defaultfilter)
  }
  const hangleGoTo = () => {
    Client(uri, entity, columns, callstandard, goToPageNumber, pageSize, columnsToFilter, filterValue, defaultfilter)
  }
  const onChage = (event) => {
    setGoToPageNumber(Number(event.target.value))
  }
  return (
    /* 
     @prop data-testid: Id to use inside pagination.test.js file.
     */
    <Grid
      container
      direction='row'
      justify="flex-end"
      alignItems='center'
      data-testid={'PaginationTestId'}
      spacing={1}
    >
      <Grid item xs={'auto'} sm={'auto'} md={'auto'} lg={'auto'} xl={'auto'}>
        <Typography variant='subtitle2'>Go to page:</Typography>
      </Grid>
      <Grid item xs={'auto'} sm={'auto'} md={'auto'} lg={'auto'} xl={'auto'}>
        <form className={classes.root} noValidate autoComplete="off">
          <TextField variant="outlined" onChange={onChage} defaultValue={page} size='small' />
        </form>
      </Grid>
      <Grid item xs={'auto'} sm={'auto'} md={'auto'} lg={'auto'} xl={'auto'}>
        <Button variant='contained' color='default' onClick={hangleGoTo} size='small'>Go</Button>
      </Grid>
      <Grid item xs={'auto'} sm={'auto'} md={'auto'} lg={'auto'} xl={'auto'}>
        <Typography variant='subtitle2'>
          Show:
        </Typography>
      </Grid>
      <Grid item xs={'auto'} sm={'auto'} md={'auto'} lg={'auto'} xl={'auto'}>
        <FormControl className={classes.formControl}>
          <Select
            value={pageSize}
            onChange={handleChange}
          >
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={50}>50</MenuItem>
            <MenuItem value={100}>100</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={'auto'} sm={'auto'} md={'auto'} lg={'auto'} xl={'auto'}>
        <Pagination
          {...props}
        />
      </Grid>
    </Grid>
  )
})
// Type and required properties
PaginationOrganism.propTypes = {

}
// Default properties
PaginationOrganism.defaultProps = {

}

export default PaginationOrganism
