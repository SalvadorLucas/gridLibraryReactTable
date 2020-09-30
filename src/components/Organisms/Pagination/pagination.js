import React from "react";
import PropTypes from "prop-types";
// CORE COMPONENTS
import {
  Grid,
  Typography,
  MenuItem,
  FormControl,
  Select,
  TextField,
  Button,
} from "@material-ui/core";
// OTHER COMPONENTS
import Pagination from "../../Molecules/Pagination";
// Styles
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: 10,
  },
  root: {
    "& > *": {
      width: "20ch",
    },
  },
}));
//MAIN FUNCTION
/*
 @param props: component properties
 @param ref: reference made by React.forward
*/
const PaginationOrganism = React.forwardRef((props, ref) => {
  // Properties of the organism
  const {
    Client,
    uri,
    entity,
    columns,
    callstandard,
    defaultfilter,
    columnsToFilter,
    page,
    filterValue,
    pages,
    ...rest
  } = props;
  const [pageSize, setPageSize] = React.useState(10);
  const [goToPageNumber, setGoToPageNumber] = React.useState(null);
  const classes = useStyles();
  const handleChange = (event) => {
    setPageSize(event.target.value);
    Client(
      uri,
      entity,
      columns,
      callstandard,
      1,
      event.target.value,
      columnsToFilter,
      filterValue,
      defaultfilter
    );
  };
  const handleGoTo = (event) => {
    event.preventDefault()
    Client(
      uri,
      entity,
      columns,
      callstandard,
      goToPageNumber,
      pageSize,
      columnsToFilter,
      filterValue,
      defaultfilter
    );
  };
  const onChage = (event) => {
    setGoToPageNumber(Number(event.target.value));
  };
  return (
    /* 
     @prop data-testid: Id to use inside pagination.test.js file.
     */
    <Grid
      container
      direction="row"
      justify="flex-end"
      alignItems="center"
      data-testid={"PaginationTestId"}
      spacing={1}
      ref={ref}
    >
      <Grid item xs={"auto"} sm={"auto"} md={"auto"} lg={"auto"} xl={"auto"}>
        <Typography variant="subtitle2">Go to page:</Typography>
      </Grid>
      <Grid item xs={"auto"} sm={"auto"} md={"auto"} lg={"auto"} xl={"auto"}>
        <form className={classes.root} autoComplete="off" onSubmit={handleGoTo}>
          <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="center"
            spacing={1}
          >
            <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
              <TextField
                inputProps={{
                  min: 0,
                  max: pages,
                }}
                required={true}
                type="number"
                variant="outlined"
                onChange={onChage}
                defaultValue={page}
                size="small"
              />
            </Grid>
            <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
              <Button
                type="submit"
                variant="contained"
                color="default"
                size="small"
              >
                Go
              </Button>
            </Grid>
          </Grid>
        </form>
      </Grid>
      <Grid item xs={"auto"} sm={"auto"} md={"auto"} lg={"auto"} xl={"auto"}>
        <Typography variant="subtitle2">Show:</Typography>
      </Grid>
      <Grid item xs={"auto"} sm={"auto"} md={"auto"} lg={"auto"} xl={"auto"}>
        <FormControl className={classes.formControl}>
          <Select value={pageSize} onChange={handleChange}>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={50}>50</MenuItem>
            <MenuItem value={100}>100</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={"auto"} sm={"auto"} md={"auto"} lg={"auto"} xl={"auto"}>
        <Pagination {...props} />
      </Grid>
    </Grid>
  );
});
// Type and required properties
PaginationOrganism.propTypes = {};
// Default properties
PaginationOrganism.defaultProps = {};

export default PaginationOrganism;
