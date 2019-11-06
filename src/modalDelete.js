import React from 'react';
//IMPORTS MATERIAL UI
import DeleteIcon from '@material-ui/icons/Delete'
import Button from "./components/CustomButtons/Button.js";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import { makeStyles } from '@material-ui/core/styles';

import styles from "./assets/jss/material-dashboard-pro-react/views/extendedTablesStyle.js";
const useStyles = makeStyles(styles);

export default function FormDialog(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false)//MODAL STATE
  var rowData = props.rowData//ROW DATA

    function handleClickOpen() {
      setOpen(true);
    }
  
    function handleClose() {
      setOpen(false);
    }

    function buildBody(){
      var data = new Object() //OBJECT TO SAVE ALL DATA
      var keyData = new Object() //OBJECT TO SAVE KEY DATA & VALUE
      keyData[props.id] = rowData[props.id]
      //BUILD FINAL BODY
      data['delete_'+props.entity.replace('-','_')]=keyData
      //RETURN BODY
      return data
    }

    function del(e){
      var body = buildBody()
      e.preventDefault()
      var xhr = new XMLHttpRequest();
      xhr.open('DELETE', props.url, true);//PARCHE
      //Send the proper header information along with the request
      xhr.setRequestHeader('Content-type', 'application/json; charset=UTF-8')
      xhr.setRequestHeader('Authorization', `Bearer ${props.token}`)
      xhr.send(JSON.stringify(body));
      xhr.onreadystatechange = function() { // Call a function when the state changes.
      if (this.readyState === XMLHttpRequest.DONE && this.status === 202) {
        alert('An  element has been deleted')
        }
      }
      handleClose()
    }

  return (
    <div align={'right'}>
      <Button
          color={'success'}
          simple
          className={classes.actionButton}
          onClick={handleClickOpen}
        >
          <DeleteIcon />
        </Button>
      <Dialog 
      open={open} 
      onClose={handleClose} 
      aria-labelledby="form-dialog-title">
        <DialogTitle >DELETE</DialogTitle>        
        <form className={'commentForm'} onSubmit={del} method={'DELETE'}>
        <DialogContent align={'left'}>
          <DialogContentText id="alert-dialog-description">
              Are you sure to delete this item?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button className={classes.actionButton} onClick={handleClose} color={'transparent'}>
            No
          </Button>
          <Button className={classes.actionButton} type={'submit'} color={'danger'}>
            Yes
          </Button>
        </DialogActions>        
        </form>
      </Dialog>
    </div>
  );
}