import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
const useStyles = makeStyles(theme => ({
    textField: {
      marginLeft: theme.spacing(0),
      marginRight: theme.spacing(2),
    },
  }));
  export default function DateComponent(props){
    const classes = useStyles();
    function getDate(){
      var date = new Date()
      if(props.defaultValue){
        date = new Date(props.defaultValue)
      }
      return date
    }

    const [value, setValue] = React.useState(getDate());
  
    function handleDateChange(date) {
      setValue(date);
    }
    return(
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            className={classes.textField} 
            autoOk
            variant="inline"
            inputVariant="outlined"
            format="yyyy/MM/dd"
            margin="normal"
            id={props.name}
            label={props.label}
            value={value}
            onChange={handleDateChange}
            InputAdornmentProps={{ position: "start" }}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
        </MuiPickersUtilsProvider>
    )
  }