import { ClientGraphQL } from './Apollo'
import { ClientAxios } from './Axios'

export function extractColumns(headers) {
    let columns = []
    headers.map(header => {
        header.accessor ? columns.push(header)
            : header.columns.map(header => {
                columns.push(header)
            })
    })
    return columns
}

export default async function Client(uri, entity, columns, callStandard, page, pageSize, columnsToFilter, value, defaultFilter) {
    return new Promise((resolve, reject) => {
        let columnsExtracted = extractColumns(columns)
        switch (callStandard.toLowerCase()) {
            case 'brapi':
                ClientAxios(uri, entity, columnsExtracted, page, pageSize, columnsToFilter, value, defaultFilter)
                    .then(response => {
                        resolve(response)
                    })
                    .catch(error => {
                        reject(error)
                    })
                break
            case 'graphql':
                ClientGraphQL(uri, entity, columnsExtracted, page, pageSize, columnsToFilter, value, defaultFilter)
                    .then(response => {
                        resolve(response)
                    })
                    .catch(error => {
                        reject(error)
                    })
                break
            default:
                return
        }
    })
}