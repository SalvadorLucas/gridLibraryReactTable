import React from 'react';
import TextField from '@material-ui/core/TextField';
//IMPORTS COMPONENTS DATE & SELECT
import DateComponent from '../components/Date/dateComponent'
import SelectComponent from '../components/Select/selectComponent'

const createComboBox = (accessor, foreignKeyEntity, settingForeignKeys, host, token) => {//CREATE COMBO BOX COMPONENT WITH FOREIGN KEYS
    return(
      <SelectComponent 
      key={React.createRef()} //KEY FOR NEW COMPONENT
      name={accessor} //NAME
      label={naaccessorme} //LABEL FOR COMPONENT
      columns={settingForeignKeys}//SETTING FOREIGN KEY
      entity={foreignKeyEntity}
      host={host}
      token={token}/>
      
    )
  }

export default function createForm(item, theme, host, token, settingForeignKeys, defaultValue){//CREATE FORM
    if (item.form==true){
      if(item.foreignKeyEntity){
        const combo = createComboBox(
          item.accessor, 
          item.foreignKeyEntity, 
          settingForeignKeys[item.foreignKeyEntity], 
          host, token, defaultValue
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
              name={item.accessor} //NAME FOR COMPONENT
              defaultValue={defaultValue ? defaultValue : null}
              /> 
            )
          case 'number':
            return (
              <TextField //CREATE NUMBER COMPONENT IN FORM
                key={item.accessor} //KEY FOR NEW COMPONENT
                className={theme} //THEME FOR COMPONENT
                autoFocus //ANIMATION FOR COMPONENT
                margin={'normal'} //MARGIN TYPE
                InputLabelProps={{shrink: true,}} //PROPS FOR LABEL 
                variant={'outlined'} //VARIANT TO USE
                id={item.accessor} //ID FOR GET VALUE
                type={item.type} //TEXTFIELD TYPE
                name={item.accessor} //TEXTFIELD NAME
                defaultValue={()=>{return defaultValue ? defaultValue : null}}
                required={item.required} //TEXTFIELD REQUIRED
                label={item.header.toUpperCase()} //LABEL FOR COMPONENT
                fullWidth/>
                )
          case 'text':
            return (
              <TextField //CREATE TEXT COMPONENT IN FORM
                key={item.accessor} //KEY FOR NEW COMPONENT
                className={theme} //THEME
                autoFocus //ANIMATION
                margin={'normal'} //MARGIN TYPE
                InputLabelProps={{shrink: true,}} //PROPS FOR LABEL
                variant={'outlined'} //VARIAN TO USE
                id={item.accessor} //ID FOR GET VALUE
                type={item.type} //TEXTFIELS TYPE
                defaultValue={()=>{return defaultValue ? defaultValue : null}}
                name={item.accessor} //TEXTFIELD NAME
                required={item.required} //TEXTFIELD REQUIRED
                label={item.header.toUpperCase()} //LABEL FOR COMPONENT
                fullWidth/>
                )
            }
      }
    }
  }