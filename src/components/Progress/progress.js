import React from 'react'
import PropTypes from 'prop-types'
// CORE COMPONENTS
import LinearProgress from '@material-ui/core/LinearProgress';
// STYLES
import { makeStyles } from '@material-ui/core/styles'
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));
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
    <div data-testid={'ProgressTestId'} className={classes.root}>
      <LinearProgress color={color} {...rest} ref={ref} />
    </div>
  )
})
// Type and required properties
ProgressAtom.propTypes = {
  color: PropTypes.oneOf([
    'primary',
    'secondary',
  ]),
}
// Default properties
ProgressAtom.defaultProps = {
  color: 'primary',
}

export default ProgressAtom
