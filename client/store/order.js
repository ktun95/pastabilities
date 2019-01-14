import axios from 'axios'

/**
 * ACTION TYPES
 */
//clear cart and create order
//need to add to the cart store
const ADD_ORDER = 'ADD_ORDER'
const GET_ORDERS = 'GET_ORDERS'
const GET_ORDERS_BY_USER = 'GET_ORDERS_BY_USER'
const GET_ORDERS_BY_STATUS = 'GET_ORDERS_BY_STATUS'
const GET_SINGLE_ORDER = 'GET_SINGLE_ORDER'
const UPDATE_STATUS = 'UPDATE_STATUS'

/**
 * ACTION CREATORS
 */
//clear cart and create order
//need to add to the cart store
const createOrder = order => ({
  type: ADD_ORDER,
  order
})

const getOrders = orders => ({
  type: GET_ORDERS,
  orders
})

const getOrder = singleOrder => ({
  type: GET_SINGLE_ORDER,
  singleOrder
})

const getOrdersByUser = orders => ({
  type: GET_ORDERS_BY_USER,
  orders
})

const getOrdersByStatus = orders => ({
  type: GET_ORDERS_BY_STATUS,
  orders
})

const updateOrdersByStatus = updatedOrder => ({
  type: UPDATE_STATUS,
  updatedOrder
})

/**
 * THUNK CREATORS
 */
export const postOrder = cart => async dispatch => {
  try {
    const res = await axios.post(`/api/orders`, cart)
    return dispatch(createOrder(res.data))
  } catch (error) {
    console.error(error)
  }
}

export const fetchOrders = () => async dispatch => {
  try {
    const res = await axios.get('/api/orders')
    dispatch(getOrders(res.data))
  } catch (error) {
    console.error(error)
  }
}

export const fetchSingleOrder = id => async dispatch => {
  try {
    const res = await axios.get(`/api/orders/${id}`)
    dispatch(getOrder(res.data))
  } catch (error) {
    console.error(error)
  }
}

export const fetchOrdersByUser = userId => async dispatch => {
  try {
    const userOrders = await axios.get(`/api/orders/orderSummary/${userId}`)
    dispatch(getOrdersByUser(userOrders.data))
  } catch (error) {
    console.error(error)
  }
}

export const fetchOrdersByStatus = status => async dispatch => {
  let res
  try {
    if (status) {
      res = await axios.get(`/api/orders/statuses/${status}`)
    } else {
      res = await axios.get('/api/orders')
    }
    dispatch(getOrdersByStatus(res.data))
  } catch (error) {
    console.error(error)
  }
}

export const updateOrderStatus = status => {
  return async dispatch => {
    const res = await axios.put(`/api/orders/status/${status.id}`, status)
    dispatch(updateOrdersByStatus(res.data))
  }
}

/**
 * INITIAL STATE
 */

const initialState = {
  orders: [],
  userOrders: [],
  singleOrder: {}
}

export default reducer
