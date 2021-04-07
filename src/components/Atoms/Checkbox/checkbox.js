import React from "react";
import PropTypes from "prop-types";
// CORE COMPONENTS
import { Checkbox } from "@material-ui/core";

//MAIN FUNCTION
/*
 @param props: component properties
 @param ref: reference made by React.forward
*/
const CheckboxAtom = React.forwardRef(({ indeterminate, ...rest }, ref) => {
  const defaultRef = React.useRef();
  const resolvedRef = ref || defaultRef;

  React.useEffect(() => {
    resolvedRef.current.indeterminate = indeterminate;
  }, [resolvedRef, indeterminate]);

  return (
    /* 
     @prop data-testid: Id to use inside checkbox.test.js file.
     */
    <Checkbox
      data-testid={"CheckboxTestId"}
      size="small"
      color="primary"
      ref={resolvedRef}
      {...rest}
    />
  );
});
// Type and required properties
CheckboxAtom.propTypes = {};
// Default properties
CheckboxAtom.defaultProps = {};

export default CheckboxAtom;
