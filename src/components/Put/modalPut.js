import React from 'react';
import Axios from 'axios';
//IMPORTS MATERIAL UI
import EditIcon from '@material-ui/icons/Edit';
// import Button from '@material-ui/core/Button';
import Button from "../CustomButtons/Button.js";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import GridContainer from "../Grid/GridContainer.js";
import GridItem from "../Grid/GridItem.js";
//IMPORTS COMPONENTS DATE & SELECT
import styles from "../../assets/jss/material-dashboard-pro-react/views/notificationsStyle.js";
import DateComponent from '../Date/dateComponent'
import { CreateForm, CreateComboBox } from '../../functions/createForm'
import { BuildBody } from '../../functions/buildBody'
//CREATE STYLES
const useStylesTexfield = makeStyles(theme => ({
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
}))
const useStyles = makeStyles(styles);

export default function FormDialog(props) {
  const [open, setOpen] = React.useState(false)//STATE FOR OPEN OR CLOSE MODAL
  const columns = props.columns//COLUMNS FOR BUILD FORM
  var rowData = props.rowData//ROW DATA
  const id = props.id//ROW ID

  const classes = useStyles();
  const classesTextfield = useStylesTexfield();

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  function createUpdateForm(item) {
    if (item.form == true && !item.foreignKeyEntity) {
      switch (item.type) {
        case 'date':
          return (
            <GridItem
              xs={12}
              md={6}
              lg={6}
              key={item.accessor} >
              <DateComponent
                key={item.accessor}
                defaultValue={rowData[item.accessor]}
                id={item.accessor}
                label={item.header.toUpperCase()}
                name={item.accessor} />
            </GridItem>//CREATE DATE COMPONENT
          )
        case 'number':
          return (
            <GridItem
              xs={12}
              md={6}
              lg={6}
              key={item.accessor}> 
              <TextField
                key={item.accessor}
                className={classesTextfield.textField}
                autoFocus
                margin={'normal'}
                InputLabelProps={{ shrink: true, }}
                variant={'outlined'}
                id={item.accessor}
                type={item.type}
                name={item.accessor}
                required={item.required}
                defaultValue={rowData[item.accessor]}
                label={item.header.toUpperCase()}
                fullWidth />
            </GridItem>
          )
        case 'text':
          return (
            <GridItem
              xs={12}
              md={6}
              lg={6}
              key={item.accessor}> 
              <TextField
                key={item.accessor}
                className={classesTextfield.textField}
                autoFocus
                margin={'normal'}
                InputLabelProps={{ shrink: true, }}
                variant={'outlined'}
                id={item.accessor}
                type={item.type}
                name={item.accessor}
                required={item.required}
                defaultValue={rowData[item.accessor]}
                label={item.header.toUpperCase()}
                fullWidth />
            </GridItem>
          )
        case 'array':
          return (
            <GridItem
              xs={12}
              md={6}
              lg={6}
              key={item.accessor} 
            >
              <TextField //CREATE NUMBER COMPONENT IN FORM
                className={classesTextfield.textField} //THEME FOR COMPONENT
                autoFocus //ANIMATION FOR COMPONENT
                margin={'normal'} //MARGIN TYPE
                InputLabelProps={{ shrink: true, }} //PROPS FOR LABEL 
                variant={'outlined'} //VARIANT TO USE
                id={item.accessor} //ID FOR GET VALUE
                type={'number'} //TEXTFIELD TYPE
                name={item.accessor} //TEXTFIELD NAME
                defaultValue={rowData[item.accessor]}
                required={item.required} //TEXTFIELD REQUIRED
                label={item.header.toUpperCase()} //LABEL FOR COMPONENT
                fullWidth />
            </GridItem>
          )
      }
    }
  }

  function buildBody(id, type) {
          switch(type){
            case 'text':
              return document.getElementById(id).value;
            case 'number':
              return Number(document.getElementById(id).value);
            case 'array':
              return document.getElementById(id).value;
            default:
              break;
          }
        }

  function put() {

    let query = `query {
      modify${props.entity} (
          request:{
            id:${props.rowData[props.id]}
              ${props.columns.map(item => {
      if (item.form == true) {
        switch (item.type) {
          case "text":
            return item.accessor + ':"' + buildBody(item.accessor, item.type) + '"';
          case "number":
            return item.accessor + ':' + buildBody(item.accessor, item.type);
          case "array":
            return item.accessor + ':[' + rowData[item.accessor] + buildBody(item.accessor, item.type) + ']'
        }
      }
    })}
              ${props.foreignKeys ?
        props.foreignKeys.map(item => {
          switch (item.options.type) {
            case "text":
              return item.fk + ':"' + BuildBody(item.query, item.options.type) + '"'
            case "number":
              return item.fk + ':' + BuildBody(item.query, item.options.type)
            case "array":
              return item.fk + ':[' + rowData[item.query] + BuildBody(item.query, item.options.type)+']'
          }
        }) : ''}
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
      alert("Updated: "+JSON.stringify(res.data.data.createRequest));
      handleClose();
    }).catch(err=>{
      console.log(err.message);
    })
  }
  return (
    <div>
      <Button
        color={'success'}
        simple
        className={classes.actionButton}
        onClick={handleClickOpen}
      >
        <EditIcon />
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle >MODIFY {props.entity.replace('-', '_').toUpperCase()}?</DialogTitle>
        <form className={'commentForm'} onSubmit={put}>
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
              createUpdateForm(element)
            )}
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
    </div >
  );
}