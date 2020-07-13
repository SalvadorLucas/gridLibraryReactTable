import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
/*
 Here goes initial state and properties to be changed
 */
export const initialState = {
  data: [],
  pages: null,
  loading: false,
  rowSelected: [0],
  selectAll: false,
  page: 1,
  pageSize: 10,
}
/*
 Action types
 */
export const LOADING_DATA = 'LOADING_DATA'
export const ERROR_GET_DATA = 'ERROR_GET_DATA'
export const SUCCESS_GET_DATA = 'SUCCESS_GET_DATA'
export const UPDATE_DATA = 'UPDATE_DATA'
export const CHANGE_PAGE = 'CHANGE_PAGE'
export const UPDATE_ROWS_SELECTED = 'CHANGE_ROWS_SELECTED'
export const UPDATE_PAGE_SIZE = 'CHANGE_PAGE_SIZE'
export const SELECT_ALL = 'SELECT_ALL'
/*
 Arrow function for change state
 */
export const startGetdata = () => ({
  type: LOADING_DATA
})
export const successGetData = (payload) => ({
  type: SUCCESS_GET_DATA,
  payload: payload
})
export const errorGetData = (payload) => ({
  type: ERROR_GET_DATA,
  payload
})
/*
 Reducer to describe how the state changed
 */
export default function Reducer(state = initialState, { type, payload }) {
  switch (type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true
      }
    case SUCCESS_GET_DATA:
      return {
        ...state,
        data: payload,
        loading: false
      }
    case ERROR_GET_DATA:
      return {
        ...state,
        error: payload,
        loading: false
      }
    default:
      return state
  }
}
// Async functions
export const GetData = (entity, columns, page, pageSize) => async (dispatch) => {
  const QUERY = gql`
  {
    find${entity}List(page:{ number: ${page} size: ${pageSize}}){
      totalElements
      totalPages
      content{
        ${columns.map(item => {
    return item.accessor
  })}
      }
    }
  }
  `
  const { error, data } = useQuery(QUERY)
  if (error) {
    dispatch(errorGetData(error))
  } else
    if (data) {
      dispatch(successGetData(data[`find${entity}List`].content))
    }
}
