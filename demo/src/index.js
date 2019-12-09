import React, {Component} from 'react'
import {render} from 'react-dom'

import Example from '../../src'
/**SERVICE */
const columns = [
  { header:'Id', accessor:'id', type:'number', form: false, required: true, hidden: true },
  { header:'Abbrev', accessor:'abbrev', type:'text', form: true, required:true, url:true },
  { header:'Display Name', accessor:'display_name', type:'text', form: true, required: true, url:true },
  { header:'Description', accessor:'description', type:'text', form: true, required: true, url:true},
  { header:'Service Status', accessor:'service_status', type:'text', form: false, required: true, url:true },
  { header:'Name', accessor:'name', type:'text', form: true, required: true, url: true },
  // { header:'Reference', accessor:'reference', type:'text', form: true, required: true, url: true },
  // { header:'Email', accessor:'email', type:'text', form: true, required: true, url: true },
  // { header:'Contact Name', accessor:'contact_name', type:'text', form: true, required: true, url: true },
  // { header:'Country Id', accessor:'country_id', type:'number', form: true, required: true, url: true },
  // { header:'Service Type Id', accessor:'service_type_id', type:'number', form: true, required: true, url: true },
]

/**SERVICE-TYPE FOREIGN KEY */
// const settingForeignKeys = { 
//   'service-type': [
//     { accessor:'id', type:'number', option:'value' },
//     { accessor:'description', type:'text', option:'description', url:true },
//   ]
// }

class Demo extends Component {
  render() {
    return <div>
      <Example
      columns={columns}
      host={'http://172.17.61.4:8290/api-sm/0.3/'}
      entity={'service'}
      id={'id'}
      // settingForeignKeys={settingForeignKeys}
      token={'753d0093-015c-340d-8b5c-4d8fa967209d'}
      title={'Service'}
      />
    </div>
  }
}

render(<Demo/>, document.querySelector('#demo'))
