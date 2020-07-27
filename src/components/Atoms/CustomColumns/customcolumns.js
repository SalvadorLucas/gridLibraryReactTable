import React from 'react'
import PropTypes from 'prop-types'
// CORE COMPONENTS
import { makeStyles } from '@material-ui/core/styles'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import ListItemText from '@material-ui/core/ListItemText'
import Select from '@material-ui/core/Select'
import Checkbox from '@material-ui/core/Checkbox'
const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: '100%',
    maxWidth: '100%',
  }
}))
const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 200,
    },
  },
}

const IndeterminateCheckbox = React.forwardRef(
  (props, ref) => {
    const { indeterminate, ...rest } = props
    const defaultRef = React.useRef()
    const resolvedRef = ref || defaultRef

    React.useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate
    }, [resolvedRef, indeterminate])

    return (<Checkbox ref={resolvedRef} {...rest} />)
  }
)

//MAIN FUNCTION
/*
 @param props: component properties
 @param ref: reference made by React.forward
*/
const CustomColumnsAtom = React.forwardRef((props, ref) => {
  // Properties of the atom
  const { allColumns, getToggleHideAllColumnsProps, ...rest } = props
  const classes = useStyles()
  const [personName, setPersonName] = React.useState([])
  const handleChange = (event) => {
    setPersonName(event.target.value)
  }

  return (
    /* 
     @prop data-testid: Id to use inside customcolumns.test.js file.
     */
    <FormControl data-testid='CustomColumnsTestId' className={classes.formControl} ref={ref}>
      <InputLabel >Columns</InputLabel>
      <Select
        variant='standard'
        multiple
        value={personName}
        onChange={handleChange}
        input={<Input />}
        renderValue={(selected) => `Custom`}
        MenuProps={MenuProps}
      >
        {/* <MenuItem>
          <IndeterminateCheckbox color="primary" {...getToggleHideAllColumnsProps()} />
          <ListItemText primary={'Toggle All'} />
        </MenuItem> */}
        {allColumns.map(column => (
          column.hidden != true ?
            <MenuItem key={column.id} value={column.id}>
              <Checkbox color="default" {...column.getToggleHiddenProps()} />
              <ListItemText primary={column.id} />
            </MenuItem>
            : null
        ))}
      </Select>
    </FormControl>
  )
})
// Type and required properties
CustomColumnsAtom.propTypes = {

}

export default CustomColumnsAtom
