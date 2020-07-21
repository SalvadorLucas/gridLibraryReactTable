import React from 'react'
import PropTypes from 'prop-types'
// CORE COMPONENTS
import Backdrop from '@material-ui/core/Backdrop'
import CircularProgress from '@material-ui/core/CircularProgress'
// STYLES
import { makeStyles } from '@material-ui/core/styles'
const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}))
//MAIN FUNCTION
/*
 @param props: component properties
 @param ref: reference made by React.forward
*/
const ProgressAtom = React.forwardRef((props, ref) => {
  const classes = useStyles()
  // Properties of the atom
  const { color, ...rest } = props

  return (
    /*
     @prop data-testid: Id to use inside progress.test.js file.
     */
    <Backdrop className={classes.backdrop} data-testid={'ProgressTestId'} open={true} {...rest}>
      <CircularProgress color={color} />
    </Backdrop>
  )
})
// Type and required properties
ProgressAtom.propTypes = {
  color: PropTypes.oneOf([
    'inherit',
    'default',
  ]),
}
// Default properties
ProgressAtom.defaultProps = {
  color: 'inherit',
}

export default ProgressAtom
