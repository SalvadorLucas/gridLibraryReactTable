import React, {Component} from 'react'
import {render} from 'react-dom'

import Example from '../../src'
/**SERVICE */
const columns = [
  { header:'Id', accessor:'id', type:'text', form: false, hidden: false },
  { header:'Category', accessor:'category', type:'text', form: true, required:true, url:false },
  { header:'Name', accessor:'name', type:'text', form: true, required: true, url:false },
  { header:'Owner Id', accessor:'ownerId', type:'text', form: true, required: true, url:false},
  { header:'Status', accessor:'status', type:'text', form: true, url:false },
  { header:'UUID', accessor:'uuid', type:'text', form: true, required: true, url: false },
]

class Demo extends Component {
  render() {
    return <div>
      <Example
      columns={columns}
      host={'https://ebs.cimmyt.org:8243/arm/1.0/'}
      entity={'service'}
      id={'id'}
      token={'753d0093-015c-340d-8b5c-4d8fa967209d'}
      title={'Service'}
      owner={'e.briones@cimmyt.org'}
      />
    </div>
  }
}

render(<Demo/>, document.querySelector('#demo'))
