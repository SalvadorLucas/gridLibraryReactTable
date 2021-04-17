import React from "react";
import PropTypes from "prop-types";
// CORE COMPONENTS
import { Checkbox } from "@material-ui/core";
import { Grid, Typography } from "@material-ui/core";

//MAIN FUNCTION
/*
 @param props: component properties
 @param ref: reference made by React.forward
*/
const CheckboxAtom = React.forwardRef(
  ({ indeterminate, index, indexing, ...rest }, ref) => {
    const defaultRef = React.useRef();
    const resolvedRef = ref || defaultRef;

    React.useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate;
    }, [resolvedRef, indeterminate]);

    if (!indexing) {
      return (
        <Checkbox
          data-testid={"CheckboxTestId"}
          size="small"
          color="primary"
          ref={resolvedRef}
          {...rest}
        />
      );
    } else if (typeof index === "number") {
      return (
        /* 
       @prop data-testid: Id to use inside checkbox.test.js file.
       */
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
          data-testid={"CheckboxTestId"}
        >
          <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
            <Typography variant="inherit">{index + 1}</Typography>
          </Grid>
          <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
            <Checkbox
              size="small"
              color="primary"
              ref={resolvedRef}
              {...rest}
            />
          </Grid>
        </Grid>
      );
    } else {
      return (
        /* 
       @prop data-testid: Id to use inside checkbox.test.js file.
       */
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
          data-testid={"CheckboxTestId"}
        >
          <Grid item xs={5} sm={5} md={5} lg={5} xl={5}>
            <Typography variant="inherit"></Typography>
          </Grid>
          <Grid item xs={7} sm={7} md={7} lg={7} xl={7}>
            <Checkbox
              size="small"
              color="primary"
              ref={resolvedRef}
              {...rest}
            />
          </Grid>
        </Grid>
      );
    }
  }
);
// Type and required properties
CheckboxAtom.propTypes = {};
// Default properties
CheckboxAtom.defaultProps = {};

export default CheckboxAtom;
