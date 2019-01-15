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
const GET_ORDER = 'GET_ORDER'
const UPDATE_STATUS = 'UPDATE_STATUS'

/**
 * ACTION CREATORS
 */
//clear cart and create order
//need to add to the cart store
export const createOrder = order => ({
  type: ADD_ORDER,
  order
})

const getOrders = orders => ({
  type: GET_ORDERS,
  orders
})

const getOrder = singleOrder => ({
  type: GET_ORDER,
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
    console.log('postOrder cart', cart)
    console.log('cart.streetLine1', cart.streetLine1)
    const res = await axios.post(`/api/orders/checkout`, cart)
    console.log('cart!!!', cart)
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

export const fetchOrder = orderId => async dispatch => {
  try {
    const {data} = await axios.get(`/api/orders/${orderId}`)
    dispatch(getOrder(data))
  } catch (err) {
    console.error(err)
  }
}

export const fetchOrdersByUser = userId => async dispatch => {
  try {
    const userOrders = await axios.get(`/api/orders/orderHistory/${userId}`)
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

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ORDER:
      return {
        ...state,
        orders: [...state.orders, action.order],
        singleOrder: action.order
      }
    case GET_ORDER:
      return {...state, singleOrder: action.singleOrder}
    case GET_ORDERS_BY_USER:
      return {...state, userOrders: action.orders}
    case GET_ORDERS:
      return {...state, orders: action.orders}
    case GET_ORDERS_BY_STATUS:
      return {...state, orders: action.orders}
    // eslint-disable-next-line no-case-declarations
    case UPDATE_STATUS:
      const updatedOrders = state.orders.map(
        order =>
          action.updatedOrder.id === order.id ? action.updatedOrder : order
      )
      return {
        ...state,
        orders: updatedOrders,
        singleOrder: action.updatedOrder
      }
    default:
      return state
  }
}

export default reducer
