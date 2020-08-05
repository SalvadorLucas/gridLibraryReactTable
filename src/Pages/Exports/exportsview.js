import React from 'react'
import PropTypes from 'prop-types'
import {
  Container,
  IconButton,
} from '@material-ui/core'
import CSVExport from './csv'
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import { makeStyles } from '@material-ui/core/styles'

//Your styles here
const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}))

//You can use { name, Function, ... } as properties for you container
export default function ExportsView(props) {
  const { columns, data, title, ...rest } = props
  const classes = useStyles()
  const csvExport = () => {
    let headers = {}
    let formatData = []
    // Format Headers
    columns.map(column => {
      if (!column.hidden) {
        headers[column.accessor] = column.Header
      }
    })
    // Format Data
    data.map(item=>{
      let itemFormatted = {}
      columns.map(column=>{
        if(!column.hidden){
          itemFormatted[column.accessor] = item[column.accessor]
        }
      })
      formatData.push(itemFormatted)
    })
    // Export Data to CSV
    CSVExport(headers, formatData, (`${title.replace(' ', '')}CSV`))
  }
  /* This will be rendered in View
    @prop data-testid: Id to use inside exports.test.js file.
   */
  return (
    <div data-testid={'ExportsTestId'} className={classes.paper}>
      <IconButton
        onClick={csvExport}
        color='inherit'
      >
        <CloudDownloadIcon />
      </IconButton>
    </div>
  )
}
// Type and required properties
ExportsView.propTypes = {
  data: PropTypes.array,
}
