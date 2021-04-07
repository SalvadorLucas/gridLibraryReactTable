import React from "react";
import PropTypes from "prop-types";
// CORE COMPONENTS
import Pagination from "@material-ui/lab/Pagination";
// STYLES
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));
//MAIN FUNCTION
/*
 @param props: component properties
 @param ref: reference made by React.forward
*/
const PaginationMolecule = React.forwardRef((props, ref) => {
  const classes = useStyles();
  // Properties of the molecule
  const {
    FetchFunction,
    uri,
    entity,
    columns,
    callstandard,
    page,
    pageSize,
    columnsToFilter,
    filterValue,
    pages,
    defaultfilter,
    ...rest
  } = props;

  const handleChange = (event, value) => {
    FetchFunction(
      uri,
      entity,
      columns,
      callstandard,
      value,
      pageSize,
      columnsToFilter,
      filterValue,
      defaultfilter
    );
  };

  return (
    /* 
     @prop data-testid: Id to use inside pagination.test.js file.
     */
    <div classes={classes.root} data-testid={"PaginationTestId"} ref={ref}>
      <Pagination
        count={pages}
        page={page}
        onChange={handleChange}
        showFirstButton
        showLastButton
      />
    </div>
  );
});
// Type and required properties
PaginationMolecule.propTypes = {
  FetchFunction: PropTypes.func.isRequired,
  page: PropTypes.number,
  pages: PropTypes.number,
  entity: PropTypes.string,
  columns: PropTypes.array,
  uri: PropTypes.string,
  pageSize: PropTypes.number,
};
// Default properties
PaginationMolecule.defaultProps = {
  page: 1,
  pages: 1,
};

export default PaginationMolecule;
