import React from 'react'
import PropTypes from 'prop-types'
// CORE COMPONENTS
import LinearProgress from '@material-ui/core/LinearProgress'
// STYLES
import { makeStyles } from '@material-ui/core/styles'
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
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
const ProgressAtom = React.forwardRef((props, ref) => {
  const classes = useStyles()

  return (
    /*
     @prop data-testid: Id to use inside progress.test.js file.
     */
    <div className={classes.root} data-testid={'ProgressTestId'}>
      <LinearProgress />
    </div>
  )
})
// Type and required properties
ProgressAtom.propTypes = {
}
// Default properties
ProgressAtom.defaultProps = {
}

export default ProgressAtom
