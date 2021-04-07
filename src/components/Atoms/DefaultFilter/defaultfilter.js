import React from "react";
import PropTypes from "prop-types";
// CORE COMPONENTS
import { TextField } from "@material-ui/core";
import { matchSorter } from "match-sorter";

//MAIN FUNCTION
/*
 @param props: component properties
 @param ref: reference made by React.forward
*/
export const DefaultFilterAtom = React.forwardRef(
  ({ column: { filterValue, preFilteredRows, setFilter } }, ref) => {
    const count = preFilteredRows.length;

    return (
      /* 
     @prop data-testid: Id to use inside defaultfilter.test.js file.
     */
      <TextField
        ref={ref}
        fullWidth
        data-testid={"DefaultFilterTestId"}
        size="small"
        variant="outlined"
        value={filterValue || ""}
        onChange={(e) => {
          setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
        }}
        placeholder={`Search ${count} records...`}
      />
    );
  }
);
// Type and required properties
DefaultFilterAtom.propTypes = {};
// Default properties
DefaultFilterAtom.defaultProps = {};

export const fuzzyTextFilterFn = (rows, id, filterValue) => {
  return matchSorter(rows, filterValue, { keys: [(row) => row.values[id]] });
};
