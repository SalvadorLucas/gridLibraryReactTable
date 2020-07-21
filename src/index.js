import React from 'react'
// PROVIDERS
import { Provider } from 'react-redux'
// REDUX
import generateStore from './Redux'
// CORE COMPONENTS
import Table from './Pages/ReactTable'
import Rtable from './App'
const store = generateStore()

const EBSMasterDetail = (props) => {
    return (
        <Provider store={store}>
            <Table {...props} />
            {/* <Rtable /> */}
        </Provider>
    )
}
export default EBSMasterDetail