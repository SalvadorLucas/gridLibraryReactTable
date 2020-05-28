import React from 'react';
// material-ui components
import { makeStyles } from "@material-ui/core/styles";
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Close from "@material-ui/icons/Close";
import AddIcon from '@material-ui/icons/Add';
import GridContainer from "../Grid/GridContainer.js";
import Axios from "axios";
// core components
import Button from "../CustomButtons/Button.js";
import styles from "../../assets/jss/material-dashboard-pro-react/views/notificationsStyle.js";
//FUNCTIONS
import { CreateForm, CreateComboBox } from '../../functions/createForm'
import { BuildBody } from '../../functions/buildBody'
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
  const foreignKeys = props.foreignKeys//ARRAY FOREIGN KEYS
  const classes = useStyles();
  const classesTextfield = useStylesTexfield();

  function handleClickOpen() {//OPEN MODAL
    setOpen(true);
  }

  function handleClose() {//CLOSE MODAL
    setOpen(false);
  }

  function getDate() {
    let date = new Date()
    let anio = date.getFullYear()
    let mes = date.getMonth() + 1
    let dia = date.getDate()
    if (dia < 9) {
      dia = '0' + dia
    }
    date = anio + '-' + mes + '-' + dia
    return date
  }

  function post() {//SEND POST REQUEST 
    
    let query = `query {
      create${props.entity} (
          request:{
            id:0
              ${props.columns.map(item => {
                if (item.form == true) {
                  switch(item.type){
                    case "text":
                      return item.accessor+':"'+BuildBody(item.accessor, item.type, 'add')+'"';
                    case "number":
                      return item.accessor+':'+BuildBody(item.accessor, item.type, 'add');
                    case "array":
                      return item.accessor+':['+BuildBody(item.accessor, item.type, 'add')+']'
                  }
                }
              })}
              ${props.foreignKeys ?
                props.foreignKeys.map(item => {
                  switch(item.options.type){
                    case "text":
                      return item.fk+':"'+BuildBody(item.query, item.options.type, 'add')+'"'
                    case "number":
                      return item.fk+':'+BuildBody(item.query, item.options.type, 'add')
                    case "array":
                      return item.fk+':['+BuildBody(item.query, item.options.type, 'add')+']'
                  }
                }) : null}
              }){
          id
          uuid
      }
  }`


    Axios({
      url: props.host,
      method: 'POST',
      data: {
        query: query
      }
    }).then(res=>{
      alert("Added: "+JSON.stringify(res.data.data.createRequest));
      handleClose();
    }).catch(err=>{
      handleClose();
      alert(err.message);
    })
  }

  return (
    <div>
      <Button
        justIcon
        round
        disabled={props.owner ? false : true}
        color={'success'}
        onClick={handleClickOpen}
      >
        <AddIcon />
      </Button>
      <Dialog
        fullWidth={true}
        maxWidth={'md'}
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
          <h4 className={classes.modalTitle}>NEW {props.entity.replace('-', ' ').toUpperCase()}</h4>
        </DialogTitle>
        <form className={'commentForm'} onSubmit={post}>
        <DialogContent
          id="modal-slide-description"
          className={classes.modalBody}
        >
          <GridContainer
            direction="row"
            justify="flex-start"
            alignItems="center"
          >
            {columns.map((element) =>
              CreateForm(element, classesTextfield.textField, null)
            )}
            {foreignKeys ? foreignKeys.map(element =>
              CreateComboBox(element.class, element.query, props.host, element.options)
            ) : null}
          </GridContainer>
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