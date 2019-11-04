import React from 'react';
//IMPORTS MATERIAL UI
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
//IMPORTS COMPONENTS DATE & SELECT
import DateComponent from './dateComponent'
import SelectComponent from './selectComponent'
//NOTIFICATIONS
// import AddAlert from "@material-ui/icons/AddAlert";
// import Snackbar from "./Snackbar.js";
//CREATE STYLES
const useStyles = makeStyles(theme => ({
  textField: {
    marginLeft: theme.spacing(0),
    marginRight: theme.spacing(0),
  },
}));

export default function FormDialog(props) {

  const [open, setOpen] = React.useState(false)//MODAL STATE
  const columns = props.columns//COLUMNS
  const settingForeignKeys = props.settingForeignKeys//ARRAY FOREIGN KEYS
  const classes = useStyles();

  function handleClickOpen() {//OPEN MODAL
    setOpen(true);
  }

  function createInsertForm(item){//CREATE FORM
    if (item.form==true){
      if(item.foreignKeyEntity){
        const combo = createComboBox(
          item.accessor, 
          item.foreignKeyEntity, 
          settingForeignKeys[item.foreignKeyEntity], 
          props.host, props.token
          )
        return combo
      }else{
        switch(item.type){
          case 'date':
            return(
              <DateComponent //CREATE DATE COMPONENT 
              key={item.accessor} //KEY FOR NEW COMPONENT
              id={item.accessor} //ID FOR GET VALUE
              label={item.header.toUpperCase()} //LABEL FOR COMPONENT
              name={item.accessor}/> //NAME FOR COMPONENT
            )
          case 'number':
            return (
              <TextField //CREATE NUMBER COMPONENT IN FORM
                key={item.accessor} //KEY FOR NEW COMPONENT
                className={classes.textField} //THEME FOR COMPONENT
                autoFocus //ANIMATION FOR COMPONENT
                margin={'normal'} //MARGIN TYPE
                InputLabelProps={{shrink: true,}} //PROPS FOR LABEL 
                variant={'outlined'} //VARIANT TO USE
                id={item.accessor} //ID FOR GET VALUE
                type={item.type} //TEXTFIELD TYPE
                name={item.accessor} //TEXTFIELD NAME
                required={item.required} //TEXTFIELD REQUIRED
                label={item.header.toUpperCase()} //LABEL FOR COMPONENT
                fullWidth/>
                )
          case 'text':
            return (
              <TextField //CREATE TEXT COMPONENT IN FORM
                key={item.accessor} //KEY FOR NEW COMPONENT
                className={classes.textField} //THEME
                autoFocus //ANIMATION
                margin={'normal'} //MARGIN TYPE
                InputLabelProps={{shrink: true,}} //PROPS FOR LABEL
                variant={'outlined'} //VARIAN TO USE
                id={item.accessor} //ID FOR GET VALUE
                type={item.type} //TEXTFIELS TYPE
                name={item.accessor} //TEXTFIELD NAME
                required={item.required} //TEXTFIELD REQUIRED
                label={item.header.toUpperCase()} //LABEL FOR COMPONENT
                fullWidth/>
                )
            }
      }
    }
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

  function buildBody(){//BUIL BODY REQUEST
    var data = new Object() //OBJECT TO SAVE ALL DATA
    var keyData = new Object() //OBJECT TO SAVE KEY DATA & VALUE
    props.columns.map((element)=>{ //CHECK LABELS OBJECT //PARCHE (PROPS.DATA => LABELS)
      if(element.form == true){
      var type = element.type //GET TYPE FOR EVERY COMPONENT
      switch(type){
        case 'number': //GET COMPONENT VALUE IN EVERY ID AND TRANSFORM DATATYPE
          keyData[element.accessor] = Number(document.getElementById(element.accessor).value)
          break
        case 'text': //GET COMPONENT VALUE IN EVERY ID AND TRANSFORM DATATYPE
          keyData[element.accessor] = String(document.getElementById(element.accessor).value)
          break
        case 'date'://GET COMPONENT VALUE IN EVERY ID AND BUILD FORMAT DATE
          let value = document.getElementById(element.accessor).value
          const [anio, mes, dia] = value.split('/')
          const date  = [anio, '-', mes, '-', dia].join('');
          //BUILD ALL DATA FOR REQUEST
          keyData[element.accessor] = String(date)
          break
      }
      }
    })
    //BUILD FINAL BODY
    data['post_'+props.entity.replace('-','_')]=keyData
    //RETURN BODY
    return data
  }

  function post(e){//SEND POST REQUEST
    var body = buildBody()//GET BODY REQUEST
    e.preventDefault()
    var xhr = new XMLHttpRequest();
    xhr.open('POST', props.host+props.entity, true);
    //Send the proper header information along with the request
    xhr.setRequestHeader('Content-type', 'application/json; charset=UTF-8')
    xhr.setRequestHeader('Authorization', `Bearer ${props.token}`)
    xhr.send(JSON.stringify(body));
    xhr.onreadystatechange = function() { // Call a function when the state changes.
      if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
        alert('A new element has been added')
      }
    }
    handleClose()
  }

  function createComboBox(name, entity, columns, host, token){//CREATE COMBO BOX COMPONENT WITH FOREIGN KEYS
    return(
      <SelectComponent 
      key={React.createRef()} //KEY FOR NEW COMPONENT
      name={name} //NAME
      label={name} //LABEL FOR COMPONENT
      columns={columns}//SETTING FOREIGN KEY
      entity={entity}
      host={host}
      token={token}/>
      
    )
  }

  return (
    <div align={'right'}>
      <Fab size={'small'} color="secondary" aria-label="add" onClick={handleClickOpen}>
        <AddIcon />
      </Fab>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle >NEW {props.entity.replace('-',' ').toUpperCase()}</DialogTitle>        
        <form className={'commentForm'} onSubmit={post} method={'POST'}>
        <DialogContent align={'left'}>
          {columns.map((element) =>
            createInsertForm(element)
          )}
        </DialogContent>
        <DialogActions>
          <Button variant={'contained'} onClick={handleClose} color={'secondary'}>
            Cancel
          </Button>
          <Button variant={'contained'} type={'submit'} color={'primary'}>
            Done
          </Button>
        </DialogActions>        
        </form>
      </Dialog>
    </div>
  )
}