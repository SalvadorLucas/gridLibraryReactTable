import axios from 'axios'

export const ClientAxios = (uri, entity, columns, page, pageSize, columnsToFilter, value, defaultFilter) => {
    return new Promise((resolve, reject) => {
        axios.get(uri, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
            }
        }).then(result => {
            let payload = {
                data: result.data.result.data,
                pages: result.data.metadata.pagination.totalPages
            }
            resolve(payload)
        }).catch(error => {
            reject(error)
        })
    })
}