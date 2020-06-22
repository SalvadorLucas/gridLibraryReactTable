import React from 'react';
import TextField from '@material-ui/core/TextField';
import GridItem from "../components/Grid/GridItem.js";
//IMPORTS COMPONENTS DATE & SELECT
import DateComponent from '../components/Date/dateComponent'
import SimpleSelect from '../components/Select/selectComponent'
export function CreateComboBox(element, host, key, foreignKeyData, method) {//CREATE COMBO BOX COMPONENT WITH FOREIGN KEYS
  return (
    <GridItem xs={12} md={6} lg={6} key={key}>
      <SimpleSelect
        label={element.entity} //LABEL FOR COMPONENT
        foreignKey={element}//SETTING FOREIGN KEY
        host={host}
        foreignKeyData={foreignKeyData}
        method={method}
      />
    </GridItem>
  )
}

export function CreateForm(item, theme, defaultValue, method) {//CREATE FORM
  if (item.form == true) {
    switch (item.type) {
      case 'date':
        return (
          <GridItem
            xs={12}
            md={6}
            lg={6}
            key={item.accessor} //KEY FOR NEW COMPONENT
          >
            <DateComponent //CREATE DATE COMPONENT 
              id={item.accessor+method} //ID FOR GET VALUE
              label={item.header.toUpperCase()} //LABEL FOR COMPONENT
              name={item.accessor} //NAME FOR COMPONENT
              defaultValue={defaultValue}
            />
          </GridItem>
        )
      case 'number':
        return (
          <GridItem
            xs={12}
            md={6}
            lg={6}
            key={item.accessor} //KEY FOR NEW COMPONENT
          >
            <TextField //CREATE NUMBER COMPONENT IN FORM
              className={theme} //THEME FOR COMPONENT
              autoFocus //ANIMATION FOR COMPONENT
              margin={'normal'} //MARGIN TYPE
              InputLabelProps={{ shrink: true, }} //PROPS FOR LABEL 
              variant={'outlined'} //VARIANT TO USE
              id={item.accessor+method} //ID FOR GET VALUE
              type={'number'} //TEXTFIELD TYPE
              name={item.accessor} //TEXTFIELD NAME
              defaultValue={defaultValue}
              required={item.required} //TEXTFIELD REQUIRED
              label={item.header.toUpperCase()} //LABEL FOR COMPONENT
              fullWidth />
          </GridItem>
        )
      case 'text':
        return (
          <GridItem
            xs={12}
            ms={6}
            lg={6}
            key={item.accessor} //KEY FOR NEW COMPONENT
          >
            <TextField //CREATE TEXT COMPONENT IN FORM
              className={theme} //THEME
              autoFocus //ANIMATION
              margin={'normal'} //MARGIN TYPE
              InputLabelProps={{ shrink: true, }} //PROPS FOR LABEL
              variant={'outlined'} //VARIAN TO USE
              id={item.accessor+method} //ID FOR GET VALUE
              type={'text'} //TEXTFIELS TYPE
              defaultValue={defaultValue}
              name={item.accessor} //TEXTFIELD NAME
              required={item.required} //TEXTFIELD REQUIRED
              label={item.header.toUpperCase()} //LABEL FOR COMPONENT
              fullWidth />
          </GridItem>
        )
        case 'array':
          return (
            <GridItem
              xs={12}
              md={6}
              lg={6}
              key={item.accessor} //KEY FOR NEW COMPONENT
            >
              <TextField //CREATE NUMBER COMPONENT IN FORM
                className={theme} //THEME FOR COMPONENT
                autoFocus //ANIMATION FOR COMPONENT
                margin={'normal'} //MARGIN TYPE
                InputLabelProps={{ shrink: true, }} //PROPS FOR LABEL 
                variant={'outlined'} //VARIANT TO USE
                id={item.accessor+method} //ID FOR GET VALUE
                type={'number'} //TEXTFIELD TYPE
                name={item.accessor} //TEXTFIELD NAME
                defaultValue={defaultValue}
                required={item.required} //TEXTFIELD REQUIRED
                label={item.header.toUpperCase()} //LABEL FOR COMPONENT
                fullWidth />
            </GridItem>
          )
    }
  }
}