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
// core components
import Button from "../CustomButtons/Button.js";
import styles from "../../assets/jss/material-dashboard-pro-react/views/notificationsStyle.js";
//FUNCTIONS
import { CreateForm, CreateComboBox } from '../../functions/createForm'
import mutationData from '../../client/mutationGraph'
//NOTIFICATIONS

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
  const foreignKeys = props.foreignKeys//settings FOREIGN KEYS
  const foreignKeysData = props.foreignKeysData //foreigng keys data
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
    // columns entity host
    let mutation = `mutation {
      create${props.entity}(${props.entity}To:{
        id:0
        ${props.columns.map(element => {
      if (element.form === true) {
        switch (element.type) {
          case 'text':
            return `${element.accessor}:"${document.getElementById(element.accessor+'Post').value}"`
          case 'number':
            return `${element.accessor}:${document.getElementById(element.accessor+'Post').value}`
        }
      }
    })}
        ${props.foreignKeys ?
        props.foreignKeys.map(element => {
          return `${element.entity.toLowerCase()}:{
              ${element.value}:${document.getElementById(element.entity+'Post').value}
            }`
        })
        : ''}
      }){
        id
      }
  }`
  console.log(mutation);
  
  mutationData(props.host, mutation).then(response=>{
    alert(`New ${props.entity} with id: ${response.data[`create${props.entity}`].id} added`);
    document.getElementById('postForm').reset()
    handleClose();
    props.refresh();
  }).catch(error=>{
    console.log(error);
  })
  }
  return (
    <div>
      <Button
        justIcon
        round
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
          NEW {props.entity.replace('-', ' ').toUpperCase()}
        </DialogTitle>
        <form className={'commentForm'} id='postForm'>
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
                CreateForm(element, classesTextfield.textField, null, 'Post')
              )}
              {foreignKeys ? foreignKeys.map((element, key) =>
                CreateComboBox(element, props.host, key, foreignKeysData?foreignKeysData[key]:null,'Post')
              ) : null}
            </GridContainer>
          </DialogContent>
          <DialogActions
            className={classes.modalFooter + " " + classes.modalFooterCenter}
          >
            <Button onClick={handleClose}>Cancel</Button>
            <Button type={'button'} color="success" onClick={post}>
              Done
          </Button>
          </DialogActions>
        </form>
      </Dialog>

    </div>
  )
}