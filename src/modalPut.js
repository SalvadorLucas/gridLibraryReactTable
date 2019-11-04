import React from 'react';
//IMPORTS MATERIAL UI
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
//IMPORTS COMPONENTS DATE & SELECT
import DateComponent from './dateComponent'
//CREATE STYLES
const useStyles = makeStyles(theme => ({
  textField: {
    marginLeft: theme.spacing(0),
    marginRight: theme.spacing(0),
  },
}))

export default function FormDialog(props) {
  const [open, setOpen] = React.useState(false)//STATE FOR OPEN OR CLOSE MODAL
  const columns = props.columns//COLUMNS FOR BUILD FORM
  var rowData = props.rowData//ROW DATA
  const id = props.id//ROW ID
  const classes = useStyles();
  function labelsForm(){
    var label = []    
    columns.map((element) =>{ //CHECK columnsFIELDS
      if(element.form == true){ //CREATE LABELS FOR NORMAL INPUT COMPONENT
        label.push({
          'label':element.header,
          'name':element.accessor,
          'type':element.type
        })
      }
    })
    return label
}

  function handleClickOpen() {
    setOpen(true);
  }

  function createUpdateForm(item){
    if (item.form==true){
    switch(item.type){
      case 'date':
        return(
          <DateComponent 
          key={item.accessor} 
          defaultValue={rowData[item.accessor]}
          id={item.accessor}
          label={item.header.toUpperCase()} 
          name={item.accessor}/>//CREATE DATE COMPONENT
        )
      case 'number':
        return (
          <TextField 
            key={item.accessor} 
            className={classes.textField} 
            autoFocus 
            margin={'normal'} 
            InputLabelProps={{shrink: true,}} 
            variant={'outlined'} 
            id={item.accessor} 
            type={item.type} 
            name={item.accessor} 
            required={item.required} 
            defaultValue={rowData[item.accessor]}
            label={item.header.toUpperCase()} 
            fullWidth/>
            )
      case 'text':
        return (
          <TextField 
            key={item.accessor} 
            className={classes.textField} 
            autoFocus 
            margin={'normal'} 
            InputLabelProps={{shrink: true,}} 
            variant={'outlined'} 
            id={item.accessor} 
            type={item.type} 
            name={item.accessor} 
            required={item.required} 
            defaultValue={rowData[item.accessor]}
            label={item.header.toUpperCase()} 
            fullWidth/>
            )
      }
    }
  }

  function getLabel(columnsfield){
    return columnsfield.toUpperCase()
  }

  function handleClose() {
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
  
  function buildBody(){
    var body = new Object() //OBJECT TO SAVE ALL columns
    var keycolumns = new Object() //OBJECT TO SAVE KEY columns & VALUE
    columns.map((element)=>{ //CHECK LABELS OBJECT
      if(element.form == true){
      var type = element.type //GET TYPE FOR EVERY COMPONENT
      switch(type){
        case 'number': //GET COMPONENT VALUE IN EVERY ID AND TRANSFORM columnsTYPE
          keycolumns[element.accessor] = Number(document.getElementById(element.accessor).value)
          break
        case 'text': //GET COMPONENT VALUE IN EVERY ID AND TRANSFORM columnsTYPE
          keycolumns[element.accessor] = String(document.getElementById(element.accessor).value)
          break
        case 'date'://GET COMPONENT VALUE IN EVERY ID AND BUILD FORMAT DATE
          let value = document.getElementById(element.accessor).value
          const [anio, mes, dia] = value.split('/')
          const date  = [anio, '-', mes, '-', dia].join('');
          //BUILD ALL columns FOR REQUEST
          keycolumns[element.accessor] = String(date)
          break
      }
      }
    })
    keycolumns[props.id] = rowData[id]
    //BUILD FINAL BODY
    body['put_'+props.entity.replace('-','_')]=keycolumns
    //RETURN BODY
    return body
  }

  function put(e){
    var body = buildBody()//GET BODY REQUEST
    e.preventDefault()
    var xhr = new XMLHttpRequest();
    xhr.open('PUT', props.url, true);
    //Send the proper header information along with the request
    xhr.setRequestHeader('Content-type', 'application/json; charset=UTF-8')
    xhr.setRequestHeader('Authorization', `Bearer ${props.token}`)
    xhr.send(JSON.stringify(body));
    xhr.onreadystatechange = function() { // Call a function when the state changes.
      if (this.readyState === XMLHttpRequest.DONE && this.status === 202) {
        alert('A new element has been updated')
      }
    }
    handleClose()
  }

  // function createComboBox(element){//CREATE COMBO BOX COMPONENT WITH FOREIGN KEYS
  //   cont++
  //   return(
  //     <SelectComponent 
  //     key={fk[cont-1].name+cont} //KEY FOR NEW COMPONENT
  //     name={fk[cont-1].name} //NAME
  //     label={getLabel(fk[cont-1].name)} //LABEL FOR COMPONENT
  //     items={element[fk[cont-1].name]}/> //ITEMS OPTIONS IN SELECT COMPONENT
  //   )
  // }
    return (
      <div>
        <Fab size={'small'} color="secondary" aria-label="edit" onClick={handleClickOpen}>
          <EditIcon />
        </Fab>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle >MODIFY {props.entity.replace('-','_').toUpperCase()}?</DialogTitle>   
          <form className={'commentForm'} onSubmit={put} method={'PUT'}>
          <DialogContent align={'left'}>
            {columns.map((element)=>
              createUpdateForm(element)           
            )}
          </DialogContent>
          <DialogActions>
            <Button variant={'contained'} onClick={handleClose} color={'secondary'}>
              CANCEL
            </Button>
            <Button variant={'contained'} type={'submit'} color={'primary'}>
              SAVE
            </Button>
          </DialogActions>        
          </form>
        </Dialog>
      </div>
    );
}