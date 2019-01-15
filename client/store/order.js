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
const ADD_ORDER_PRODUCTS = 'ADD_ORDER_PRODUCTS'

/**
 * ACTION CREATORS
 */
//clear cart and create order
//need to add to the cart store
const createOrder = order => ({
  type: ADD_ORDER,
  order
})

const createOrderProducts = (orderId, cart) => ({
  type: ADD_ORDER_PRODUCTS,
  orderId,
  cart
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
export const postOrder = order => async dispatch => {
  try {
    if (order.userId === 0) order.userId = null
    const res = await axios.post(`/api/orders/checkout`, order)
    const response = dispatch(createOrder(res.data))
    dispatch(createOrderProducts(response.order.id, order.cart))
    // dispatch(sendEmail)
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
    console.log('I was here')
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

export const updateOrderStatus = updatedOrder => {
  return async dispatch => {
    const res = await axios.put(`/api/orders/${updatedOrder.id}`, updatedOrder)
    if (res.data === 1) dispatch(updateOrdersByStatus(updatedOrder))
  }
}

/**
 * INITIAL STATE
 */

const initialState = {
  orders: [],
  userOrders: [],
  singleOrder: {},
  orderProducts: []
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
