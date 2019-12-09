import React from "react";
import ModalDelete from '../Delete/modalDelete'
import ModalPut from '../Put/modalPut'
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'
import muiTheme from '../../assets/json/cimmyt-default-theme.json'
const theme = createMuiTheme(muiTheme);   

export default function actions(props, url, entity, datafields, id, token){
    return (
    // we've added some custom button actions
    <MuiThemeProvider theme={theme}> 
    <table
      align={'right'}>
      <tbody>
        <tr>
          <td>
            {/* UPDATE COMPONENT */}
              <ModalPut
                id={id}//ID ROW
                entity={entity}//ENTITY
                rowData={props}//ROW DATA
                columns={datafields}//DATAFIELDS
                url={url}//HOST
                token={token}//TOKEN FOR API
              ></ModalPut>
          </td>
          <td>
            {/* DELETE COMPONENT */}
              <ModalDelete
                id={id}//ID ROW
                entity={entity}//ENTITY
                rowData={props}//ROW DATA
                url={url}//HOST
                token={token}//TOKEN FOR API
              ></ModalDelete>
          </td>
        </tr>
      </tbody>
    </table>
    </MuiThemeProvider>)
  }