import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 210,
  },
  selectEmpty: {
    marginTop: theme.spacing(3),
  },
}));

function SimpleSelect(props) {
  const foreignKey = props.foreignKey;
  const foreignKeyData = props.foreignKeyData;
  const classes = useStyles();
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  
    return (
      <FormControl variant="outlined" className={classes.formControl}>
      <InputLabel id="demo-simple-select-outlined-label">{foreignKey.entity}</InputLabel>
      <Select
        id={foreignKey.entity+props.method} 
        value={age}
        onChange={handleChange}
        label="Age"
      >
        <MenuItem value="">
          <em></em>
        </MenuItem>
        {foreignKeyData?foreignKeyData.map((element,key)=>{
          return <MenuItem key={key} value={element[foreignKey.value]}>{element[foreignKey.label]}</MenuItem>
        }):null}
      </Select>
    </FormControl>
    )
}
export default SimpleSelect