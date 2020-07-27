import React from 'react'
import PropTypes from 'prop-types'
// CORE COMPONENTS AND ATOMS TO USE
import {
  Input,
  MenuItem,
  FormControl,
  ListItemText,
  Select,
  Checkbox,
  Chip,
} from '@material-ui/core'
// STYLES
import { makeStyles } from '@material-ui/core/styles'
const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(0),
    minWidth: 150,
    maxWidth: 500,
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 0,
  },
}))
const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
}
//MAIN FUNCTION
/*
 @param props: component properties
 @param ref: reference made by React.forward
*/
const GlobalFilterMolecule = React.forwardRef((props, ref) => {
  const { columns, UpdateColumnsToFilter, clean, ...rest } = props
  const classes = useStyles()
  const [selection, setSelection] = React.useState([])
  const handleChange = (event) => {
    UpdateColumnsToFilter(event.target.value)
    setSelection(event.target.value)
  }

  return (
    /* 
     @prop data-testid: Id to use inside globalfilter.test.js file.
     */
    <FormControl className={classes.formControl} data-testid={'GlobalFilterTestId'} ref={ref}>
      <Select
        labelId="demo-mutiple-checkbox-label"
        id="demo-mutiple-checkbox"
        multiple
        value={selection}
        onChange={handleChange}
        input={<Input />}
        renderValue={(selected) => (
          <div className={classes.chips}>
            {selected.map((value) => (
              <Chip key={value} label={value} className={classes.chip} />
            ))}
          </div>
        )}
        MenuProps={MenuProps}
      >
        {columns.map((column, key) => (
          column.filter ?
            <MenuItem key={key} value={column.accessor}>
              <Checkbox color="primary" checked={selection.indexOf(column.accessor) > -1} />
              <ListItemText primary={column.Header} />
            </MenuItem>
            : null
        ))}
      </Select>
    </FormControl>
  )
})
// Type and required properties
GlobalFilterMolecule.propTypes = {
  columns: PropTypes.array.isRequired,
  UpdateColumnsToFilter: PropTypes.func.isRequired,
  clean: PropTypes.bool
}
// Default properties
GlobalFilterMolecule.defaultProps = {
  clean: false
}

export default GlobalFilterMolecule
