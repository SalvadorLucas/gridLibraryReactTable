import React from 'react'
import PropTypes from 'prop-types'
// CORE COMPONENTS
import SvgIcon from '@material-ui/core/SvgIcon';

//MAIN FUNCTION
/*
 @param props: component properties
 @param ref: reference made by React.forward
*/
const RemoveFilterIconAtom = React.forwardRef((props, ref) => {
  return (
    /*
     @prop data-testid: Id to use inside icons.test.js file.
     */
    <SvgIcon data-testid={'IconsTestId'} {...props} ref={ref}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 477.875 477.875"><path d="M215.546 85.327H53.282c-18.073 0-28.679 20.379-18.31 35.187.133.199-3.448-4.682 130.024 177.006 5.921 8.587 4.149-.599 4.149 190.987 0 19.245 21.993 30.358 37.542 18.791 57.536-43.372 71.516-48.257 71.516-70.955 0-133.909-1.721-130.311 4.149-138.823l27.851-37.923c-70.082-25.496-112.087-99.608-94.657-174.27z"/><path d="M281.951 30.166c-75.076 67.31-38.685 187.35 55.962 206.05 75.479 15.948 143.193-43.867 143.193-116.945 0-102.594-122.364-157.159-199.155-89.105zM400.48 136.97c9.515 9.466 2.715 25.676-10.603 25.676-8.014 0-10.022-3.79-28.462-22.158-18.064 17.984-20.27 22.158-28.472 22.158-13.349 0-20.063-16.264-10.603-25.676l17.769-17.699-17.769-17.699c-14.107-14.035 7.142-35.322 21.216-21.297l17.859 17.779 17.849-17.779c14.074-14.025 35.331 7.254 21.216 21.297l-17.769 17.699z"/></svg>
    </SvgIcon >
  )
})
// Type and required properties
RemoveFilterIconAtom.propTypes = {
  color: PropTypes.string
}
// Default properties
RemoveFilterIconAtom.defaultProps = {
  color: 'primary',
}

export default RemoveFilterIconAtom