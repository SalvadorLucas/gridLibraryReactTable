import React from "react";
import PropTypes from "prop-types";
// CORE COMPONENTS AND ATOMS TO USE
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  InputBase,
  Menu,
  MenuItem,
  Input,
  FormControl,
  ListItemText,
  Select,
  Checkbox,
  Chip,
} from "@material-ui/core";
// OTHER COMPONENTS
import CustomColumns from "../../Atoms/CustomColumns";
import FilterICon from "../../Atoms/Icons/addFilter";
import RemoveFilterICon from "../../Atoms/Icons/removeFilter";
import CSVExport from "../../../functions/csv";
// ICONS
import BuildIcon from "@material-ui/icons/Build";
import SearchIcon from "@material-ui/icons/Search";
import MoreIcon from "@material-ui/icons/MoreVert";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";
// STYLES
import { fade, makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  icons: {
    "& > svg": {
      margin: theme.spacing(2),
    },
  },
  formControl: {
    margin: theme.spacing(0),
    minWidth: 150,
    maxWidth: 500,
  },
  chips: {
    display: "flex",
    flexWrap: "wrap",
  },
  chip: {
    margin: 0,
  },
}));
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
//MAIN FUNCTION
/*
 @param props: component properties
 @param ref: reference made by React.forward
*/
const ToolBarOrganism = React.forwardRef((props, ref) => {
  const {
    uri,
    entity,
    title,
    columns,
    page,
    pageSize,
    columnsToFilter,
    filterValue,
    FetchFunction,
    rowsSelected,
    hiddenColumns,
    callstandard,
    defaultfilter,
    setFilterValue,
    setColumnsToFilter,
    toolbarActions,
    toolbarMobileActions,
    data,
    select,
    globalFilter,
    ...rest
  } = props;
  const searchInputRef = React.useRef(null);
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [searchvalue, setsearchvalue] = React.useState("");
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const [selection, setSelection] = React.useState([]);
  const handleChangeSelection = (event) => {
    setColumnsToFilter(event.target.value);
    setSelection(event.target.value);
  };
  const handleClearFilter = () => {
    searchInputRef.current.value = "";
    setSelection([]);
    setsearchvalue("");
    setFilterValue(null);
    setColumnsToFilter([]);
    uri
      ? FetchFunction(
          uri,
          entity,
          columns,
          callstandard,
          1,
          pageSize,
          [],
          null,
          defaultfilter
        )
      : FetchFunction(1, pageSize, [], null);
  };
  const refreshGrid = () => {
    uri
      ? FetchFunction(
          uri,
          entity,
          columns,
          callstandard,
          page,
          pageSize,
          columnsToFilter,
          filterValue,
          defaultfilter
        )
      : FetchFunction(page, pageSize, columnsToFilter, filterValue);
  };

  const handleSettingsMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleFilter = () => {
    setFilterValue(searchvalue);
    uri
      ? FetchFunction(
          uri,
          entity,
          columns,
          callstandard,
          1,
          pageSize,
          columnsToFilter,
          searchvalue,
          defaultfilter
        )
      : FetchFunction(1, pageSize, columnsToFilter, searchvalue);
  };

  const handleChange = (event) => {
    setsearchvalue(event.target.value);
  };

  const csvExport = () => {
    let headers = {};
    let formatData = [];
    // Format Headers
    columns.map((column) => {
      if (!column.hidden) {
        headers[column.accessor] = column.Header;
      }
    });
    // Format Data
    data.map((item) => {
      let itemFormatted = {};
      columns.map((column) => {
        if (!column.hidden) {
          itemFormatted[column.accessor] = item[column.accessor];
        }
      });
      formatData.push(itemFormatted);
    });
    // Export Data to CSV
    CSVExport(headers, formatData, `${title.replace(" ", "")}CSV`);
  };

  const menuId = "primary-settings-menu";

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem>
        {" "}
        <CustomColumns {...rest} />
        Settings
      </MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-settings-menu-mobile";

  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleSettingsMenuOpen}>
        <IconButton
          aria-label="settings of current user"
          aria-controls="primary-settings-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <BuildIcon />
        </IconButton>
        <p>Settings</p>
      </MenuItem>
      <MenuItem onClick={csvExport}>
        <IconButton color="inherit">
          <CloudDownloadIcon />
        </IconButton>
        <p>Export</p>
      </MenuItem>
      {toolbarMobileActions && toolbarMobileActions(rowsSelected, refreshGrid)}
    </Menu>
  );
  return (
    /* 
     @prop data-testid: Id to use inside toolbar.test.js file.
     */
    <div className={classes.grow}>
      <AppBar position="static" data-testid={"ToolbarTestId"}>
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            {title}
          </Typography>
          {(globalFilter && (
            <React.Fragment>
              <div className={classes.search}>
                <InputBase
                  inputRef={searchInputRef}
                  placeholder="Search…"
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  defaultValue={filterValue}
                  onChange={handleChange}
                  inputProps={{ "aria-label": "search" }}
                />
                <IconButton
                  color="inherit"
                  className={classes.searchIcon}
                  onClick={handleFilter}
                >
                  <SearchIcon />
                </IconButton>
              </div>
              <div className={classes.icons}>
                {/* ENABLE BUTTON TO CLEAR FILTERS */}
                {columnsToFilter.length > 0 || searchvalue ? (
                  <IconButton color={"inherit"} onClick={handleClearFilter}>
                    <RemoveFilterICon color={"inherit"} />
                  </IconButton>
                ) : (
                  <IconButton color={"inherit"} onClick={() => {}}>
                    <FilterICon color={"inherit"} />
                  </IconButton>
                )}
              </div>
              <div className={classes.grow}>
                <FormControl
                  className={classes.formControl}
                  data-testid={"GlobalFilterTestId"}
                  ref={ref}
                >
                  <Select
                    labelId="demo-mutiple-checkbox-label"
                    id="demo-mutiple-checkbox"
                    multiple
                    variant="standard"
                    value={selection}
                    onChange={handleChangeSelection}
                    input={<Input />}
                    renderValue={(selected) => (
                      <div className={classes.chips}>
                        {selected.map((value) => (
                          <Chip
                            key={value}
                            label={value}
                            className={classes.chip}
                          />
                        ))}
                      </div>
                    )}
                    MenuProps={MenuProps}
                  >
                    {columns.map((column, key) =>
                      column.filter ? (
                        <MenuItem key={key} value={column.accessor}>
                          <Checkbox
                            color="default"
                            checked={selection.indexOf(column.accessor) > -1}
                          />
                          <ListItemText primary={column.Header} />
                        </MenuItem>
                      ) : null
                    )}
                  </Select>
                </FormControl>
              </div>
            </React.Fragment>
          )) || <div className={classes.grow} />}
          <div className={classes.sectionDesktop}>
            {toolbarActions ? toolbarActions(rowsSelected, refreshGrid) : null}
            <IconButton onClick={csvExport} color="inherit">
              <CloudDownloadIcon />
            </IconButton>
            <IconButton
              edge="end"
              aria-label="settings of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleSettingsMenuOpen}
              color="inherit"
            >
              <BuildIcon />
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
});
// Type and required properties
ToolBarOrganism.propTypes = {
  uri: PropTypes.string,
  title: PropTypes.string,
  columns: PropTypes.array,
  pagesize: PropTypes.number,
  columnstofilter: PropTypes.array,
  FetchFunction: PropTypes.func.isRequired,
};
// Default properties
ToolBarOrganism.defaultProps = {};

export default ToolBarOrganism;
