import React from 'react';
// material-ui components
import { makeStyles } from "@material-ui/core/styles";
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Close from "@material-ui/icons/Close";
import AddIcon from '@material-ui/icons/Add'
// core components
import Button from "../CustomButtons/Button.js";
import styles from "../../assets/jss/material-dashboard-pro-react/views/notificationsStyle.js";
//FUNCTIONS
import CreateForm from '../../functions/createForm'
import BuildBody from '../../functions/buildBody'
//NOTIFICATIONS
import SweetAlert from '../SweetAlert/SweetAlert'


const useStyles = makeStyles(styles);
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});
//CREATE STYLES
const useStylesTexfield = makeStyles(theme => ({
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
}))

export default function FormDialog(props) {

  const [open, setOpen] = React.useState(false)//MODAL STATE
  const columns = props.columns//COLUMNS
  const settingForeignKeys = props.settingForeignKeys//ARRAY FOREIGN KEYS
  const classes = useStyles();
  const classesTextfield = useStylesTexfield();

  function handleClickOpen() {//OPEN MODAL
    setOpen(true);
  }

  function handleClose() {//CLOSE MODAL
    setOpen(false);
  }
  
  function getDate() {
    let date =  new Date()
    let anio = date.getFullYear()
    let mes = date.getMonth()+1
    let dia = date.getDate()
    if(dia<9){
      dia='0'+dia
    }
    date = anio + '-' + mes + '-' + dia
    return date
  }

  function post(e){//SEND POST REQUEST
    var body = BuildBody(props.columns, props.entity, 'post_')//GET BODY REQUEST
    e.preventDefault()
    var xhr = new XMLHttpRequest();
    xhr.open('POST', props.host+props.entity, true);
    //Send the proper header information along with the request
    xhr.setRequestHeader('Content-type', 'application/json; charset=UTF-8')
    xhr.setRequestHeader('Authorization', `Bearer ${props.token}`)
    xhr.send(JSON.stringify(body));
    xhr.onreadystatechange = function() { // Call a function when the state changes.
      if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
        handleClose()
        return(<SweetAlert message={'A new element has been added'}/>)
      }
    }
  }

  return (
    <div align={'right'}>
      <Button
          justIcon
          round
          color={'success'}
          onClick={handleClickOpen}
        >
        <AddIcon />
      </Button>
      <Dialog
        classes={{
          root: classes.center,
          paper: classes.modal
        }}
        open={open}
        transition={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="modal-slide-title"
        aria-describedby="modal-slide-description"
      >
        <DialogTitle
          id="classic-modal-slide-title"
          disableTypography
          className={classes.modalHeader}
        >
          <Button
              justIcon
              className={classes.modalCloseButton}
              key="close"
              aria-label="Close"
              color="transparent"
              onClick={() => setOpen(false)}
            >
              <Close className={classes.modalClose} />
            </Button>
          <h4 className={classes.modalTitle}>NEW {props.entity.replace('-',' ').toUpperCase()}</h4>
        </DialogTitle>
        <form className={'commentForm'} onSubmit={post} method={'POST'}>
        <DialogContent
          id="modal-slide-description"
          className={classes.modalBody}
        >
          {columns.map((element) =>
            CreateForm(element, classesTextfield.textField, settingForeignKeys)
          )}
        </DialogContent>
        <DialogActions
          className={classes.modalFooter + " " + classes.modalFooterCenter}
        >
          <Button onClick={handleClose}>Cancel</Button>
          <Button type={'submit'} color="success">
            Done
          </Button>
        </DialogActions>
        </form>
      </Dialog>

    </div>
  )
}