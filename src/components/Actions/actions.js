import React from "react";
import GridContainer from "../Grid/GridContainer.js";
import GridItem from "../Grid/GridItem.js";
import ModalDelete from '../Delete/modalDelete'
import ModalPut from '../Put/modalPut'
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'
import muiTheme from '../../assets/json/cimmyt-default-theme.json'
const theme = createMuiTheme(muiTheme);

export default function actions(rowData, url, title, entity, columns, id, token, refreshGrid, foreignKeys, foreignKeysData) {
  
  return (
    <MuiThemeProvider theme={theme}>
      <GridContainer
        direction="row"
        justify="flex-start"
        alignItems="center"
      >
        <GridItem xs={6} md={6} lg={6}>
          <ModalPut
            id={id}//ID ROW
            title={title}
            entity={entity}//ENTITY
            rowData={rowData}//ROW DATA
            columns={columns}//COLUMNS
            host={url}//HOST
            token={token}//TOKEN FOR API
            refreshGrid={refreshGrid}
            foreignKeys={foreignKeys}
            foreignKeysData={foreignKeysData}
          ></ModalPut>
        </GridItem>
        <GridItem xs={6} md={6} lg={6}>
          <ModalDelete
            id={id}//ID ROW
            title={title}
            entity={entity}//ENTITY
            rowData={rowData}//ROW DATA
            host={url}//HOST
            token={token}//TOKEN FOR API
            refreshGrid={refreshGrid}
            ></ModalDelete>
        </GridItem>
      </GridContainer>
    </MuiThemeProvider>
  )
}