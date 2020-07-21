import React from 'react'
import PropTypes from 'prop-types'
// CORE COMPONENTS AND ATOMS TO USE
import {
  AppBar,
  Toolbar,
  Menu,
  MenuItem
} from '@material-ui/core'
import CustomColumns from '../../Atoms/CustomColumns'
import IconButton from '@material-ui/core/IconButton'
// ICONS
import SettingsIcon from '@material-ui/icons/Settings'
// import { Grid } from '@material-ui/core'
// STYLES
import { makeStyles } from '@material-ui/core/styles'
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}))
//MAIN FUNCTION
/*
 @param props: component properties
 @param ref: reference made by React.forward
*/
const ToolbarMolecule = React.forwardRef((props, ref) => {
  // Properties of the molecule
  const { somethingprop, ...rest } = props
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = React.useState(null)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  return (
    /* 
     @prop data-testid: Id to use inside toolbar.test.js file.
     */
    <div className={classes.root} data-testid={'ToolbarTestId'}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={handleClick}
          >
            <SettingsIcon />
          </IconButton>
          <Menu
            data-testid={'SettingsTestId'}
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem><CustomColumns {...rest} />Settings</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </div>
  )
})
// Type and required properties
ToolbarMolecule.propTypes = {
  somethingprop: PropTypes.any
}

export default ToolbarMolecule
