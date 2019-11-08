import React, {Component} from 'react'
import {render} from 'react-dom'

import Example from '../../src'
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

class Demo extends Component {
  render() {
    return <div>
      <Example
      columns={columns}
      host={'https://ebs.cimmyt.org:8253/api-sm/0.2.1/'}
      entity={'service'}
      id={'id'}
      settingForeignKeys={settingForeignKeys}
      token={'22e33c94-df4c-3d79-bd3a-2c7bf466fd8e'}
      title={'Service'}
      />
    </div>
  }
}

render(<Demo/>, document.querySelector('#demo'))
