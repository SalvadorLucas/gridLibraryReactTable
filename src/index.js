import React, {Component} from 'react'
import Table from './ReactTables'
// import Table from './views/Tables/ReactTables'

/**SERVICE */
const columns = [
  { header:'Id', accessor:'id', type:'number', form: false, required: true, hidden: true },
  { header:'Code', accessor:'code', type:'text', form: true, required:true, url:true },
  { header:'Description', accessor:'description', type:'text', form: true, required: true, url:true },
  { header:'Service Type Id', accessor:'service_type_id', type:'number', form: true, required: true, url:true, foreignKeyEntity:'service-type'},
  { header:'Name', accessor:'name', type:'number', form: false, required: true },
  { header:'Pilot', accessor:'pilot', type:'number', form: false, required: true },
  { header:'URL', accessor:'url', type:'number', form: false, required: true },
  { header:'Vehicle Class', accessor:'vehicle_class', type:'number', form: false, required: true }
]

/**SERVICE-TYPE FOREIGN KEY */
const settingForeignKeys = { 
  'service-type': [
    { accessor:'id', type:'number', option:'value' },
    { accessor:'description', type:'text', option:'description', url:true },
  ]
}
  
/**SERVICE-TYPE */
// const columns = [
  // { header:'Id', accessor:'id', type:'number', form: true, required: true, hidden: true },
  // { header:'Description', accessor:'description', type:'text', form: true, required: true, },
// ]

/**VENDOR */
// const columns = [
//   { header:'Id', accessor:'id', type:'number', form: false, required: true, hidden: true },
//   { header:'Assay Id', accessor:'assay_id', type:'number', form: true, required:true },
//   { header:'Name', accessor:'name', type:'text', form: true, required: true },
//   { header:'Service Type Id', accessor:'servie_type_id', type:'number', form: true, required: true }
// ]

/**REQUEST-TYPE */
// const columns = [
//   { header:'Id', accessor:'id', type:'number', form: false, required: true, hidden: true },
//   { header:'Description', accessor:'description', type:'text', form: true, required: true, },
// ]

/**SERVICE-PROVIDER */
// const columns = [
//   { header:'Id', accessor:'id', type:'number', form: false, required: true, hidden: true },
//   { header:'Name', accessor:'name', type:'text', form: true, required: true, url:true },
// ]

export default class extends Component {
  render() {
    return <div>
      <Table 
      columns={columns}
      host={'https://ebs.cimmyt.org:8253/api-sm/0.2.1/'}
      entity={'service'}
      id={'id'}
      settingForeignKeys={settingForeignKeys}
      ></Table>
    </div>
  }
}
