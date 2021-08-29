import store from '../store'
import { bindActionCreators } from 'redux'
import axiosMiddleware from '../middlewares/axiosMiddleware.js'

const dispatch = store.dispatch;
export const dispatchAction = (type) => (payload) => dispatch({ type, payload })
export const dispatchThunk = (thunk) => bindActionCreators(thunk,dispatch)
export const dispatchEmit = (type) => (payload) => axiosMiddleware({ type, payload: {...payload}})
