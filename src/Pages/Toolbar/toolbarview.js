import React from 'react'
import PropTypes from 'prop-types'
// CORE COMPONENTS AND ATOMS TO USE
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  InputBase,
  // Badge,
  Menu,
  MenuItem
} from '@material-ui/core'
// OTHER COMPONENTS
import CustomColumns from '../../components/Atoms/CustomColumns'
import GlobalFilter from '../../components/Molecules/GlobalFilter'
// ICONS
import SettingsIcon from '@material-ui/icons/Settings'
import SearchIcon from '@material-ui/icons/Search'
import MoreIcon from '@material-ui/icons/MoreVert'
// STYLES
import { fade, makeStyles } from '@material-ui/core/styles'
const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}))
//You can use { name, Function, ... } as properties for you container
export default function ToolbarView(props) {
  const { uri, entity, title, columns, pageSize, columnsToFilter,
    HandleGlobalFilter, UpdateColumnsToFilter, ...rest } = props
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null)
  const [searchValue, setSearchValue] = React.useState('')

  const isMenuOpen = Boolean(anchorEl)
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl)

  const handleSettingsMenuOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
    handleMobileMenuClose()
  }

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget)
  }
  const handleGlobalFilter = () => {
    HandleGlobalFilter(uri, entity, columns, 1, pageSize, columnsToFilter, searchValue)
  }
  const handleChange = (event) => {
    setSearchValue(event.target.value)
  }
  const menuId = 'primary-settings-menu'
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem> <CustomColumns {...rest} />Settings</MenuItem>
    </Menu>
  )
  const mobileMenuId = 'primary-settings-menu-mobile'
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {/* <MenuItem>
        <IconButton aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="secondary">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge badgeContent={11} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem> */}
      <MenuItem onClick={handleSettingsMenuOpen}>
        <IconButton
          aria-label="settings of current user"
          aria-controls="primary-settings-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <SettingsIcon />
        </IconButton>
        <p>Settings</p>
      </MenuItem>
    </Menu>
  )
  /* This will be rendered in View
    @prop data-testid: Id to use inside toolbar.test.js file.
   */
  return (
    <div className={classes.grow}>
      <AppBar position="static" data-testid={'ToolbarTestId'}>
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            {title}
          </Typography>
          <div className={classes.search}>
            <IconButton
              color="inherit"
              className={classes.searchIcon}
              onClick={handleGlobalFilter}
            >
              <SearchIcon />
            </IconButton>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              onChange={handleChange}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
          <Typography className={classes.title} variant="subtitle1" noWrap>
            Filter by columns:
          </Typography>
          <div className={classes.grow}>
            <GlobalFilter UpdateColumnsToFilter={UpdateColumnsToFilter} columns={columns} />
          </div>
          <div className={classes.search} />
          <div className={classes.sectionDesktop}>
            {/* <IconButton aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={4} color="secondary">
                <MailIcon />
              </Badge>
            </IconButton>
            <IconButton aria-label="show 17 new notifications" color="inherit">
              <Badge badgeContent={17} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton> */}
            <IconButton
              edge="end"
              aria-label="settings of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleSettingsMenuOpen}
              color="inherit"
            >
              <SettingsIcon />
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
  )
}
// Type and required properties
ToolbarView.propTypes = {
  uri: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  columns: PropTypes.array.isRequired,
  pageSize: PropTypes.number.isRequired,
  columnsToFilter: PropTypes.array.isRequired,
  HandleGlobalFilter: PropTypes.func.isRequired
}
