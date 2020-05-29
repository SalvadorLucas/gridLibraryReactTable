import React from "react";
import GridContainer from "../Grid/GridContainer.js";
import GridItem from "../Grid/GridItem.js";
import ModalDelete from '../Delete/modalDelete'
import ModalPut from '../Put/modalPut'
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'
import muiTheme from '../../assets/json/cimmyt-default-theme.json'
const theme = createMuiTheme(muiTheme);

export default function actions(props, url, title, columns, id, token, refreshGrid) {
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
            entity={title}//ENTITY
            rowData={props}//ROW DATA
            columns={columns}//COLUMNS
            host={url}//HOST
            token={token}//TOKEN FOR API
            refreshGrid={refreshGrid}
          ></ModalPut>
        </GridItem>
        <GridItem xs={6} md={6} lg={6}>
          <ModalDelete
            id={id}//ID ROW
            entity={title}//ENTITY
            rowData={props}//ROW DATA
            url={url}//HOST
            token={token}//TOKEN FOR API
            refreshGrid={refreshGrid}
            ></ModalDelete>
        </GridItem>
      </GridContainer>
    </MuiThemeProvider>
  )
}