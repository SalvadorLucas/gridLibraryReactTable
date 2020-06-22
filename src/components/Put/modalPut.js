import React from 'react';
//IMPORTS MATERIAL UI
import EditIcon from '@material-ui/icons/Edit';
// import Button from '@material-ui/core/Button';
import Button from "../CustomButtons/Button.js";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Close from "@material-ui/icons/Close";
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import GridContainer from "../Grid/GridContainer.js";
//IMPORTS COMPONENTS DATE & SELECT
import styles from "../../assets/jss/material-dashboard-pro-react/views/notificationsStyle.js";
import { CreateForm, CreateComboBox } from '../../functions/createForm'
import mutationData from '../../client/mutationGraph'

//CREATE STYLES
const useStylesTexfield = makeStyles(theme => ({
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
}))
const useStyles = makeStyles(styles);

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export default function FormDialog(props) {
  const [open, setOpen] = React.useState(false)//STATE FOR OPEN OR CLOSE MODAL
  const columns = props.columns//COLUMNS FOR BUILD FORM
  const foreignKeys = props.foreignKeys//ARRAY FOREIGN KEYS
  const foreignKeysData = props.foreignKeysData
  var rowData = props.rowData//ROW DATA
  const classes = useStyles();
  const classesTextfield = useStylesTexfield();

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  function put() {
    let mutation = `mutation {
      modify${props.entity}(${props.entity}To:{
        id:${rowData[props.id]}
        ${props.columns.map(element => {
      if (element.form === true) {
        switch (element.type) {
          case 'text':
            return `${element.accessor}:"${document.getElementById(element.accessor+'Put').value}"`
          case 'number':
            return `${element.accessor}:${document.getElementById(element.accessor+'Put').value}`
        }
      }
    })}
        ${props.foreignKeys ?
        props.foreignKeys.map(element => {
          return `${element.entity.toLowerCase()}:{
              ${element.value}:${document.getElementById(element.entity+'Put').value}
            }`
        })
        : null}
      }){
        id
      }
  }`
    mutationData(props.host, mutation).then(response=>{
    alert(`${props.entity} with id: ${response.data[`modify${props.entity}`].id} has been modified`);
    handleClose()
    props.refreshGrid()
    }).catch(error=>{
      console.log(error);
    })
  }

  return (
    <div>
      <Button
        justIcon
        simple
        color={'success'}
        onClick={handleClickOpen}
      >
        <EditIcon />
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
          MODIFY {props.title.replace('-', '_').toUpperCase()}?</DialogTitle>
        <form className={'commentForm'} id='putForm'>
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
                CreateForm(element, classesTextfield.textField, rowData[element.accessor], 'Put')
              )}
              {foreignKeys ? foreignKeys.map((element, key) =>
                CreateComboBox(element, props.host, key, foreignKeysData?foreignKeysData[key]:null, 'Put')
              ) : null}
            </GridContainer>
          </DialogContent>
          <DialogActions
            className={classes.modalFooter + " " + classes.modalFooterCenter}
          >
            <Button onClick={handleClose}>Cancel</Button>
            <Button type={'button'} color="success" onClick={put}>
              Done
          </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div >
  );
}