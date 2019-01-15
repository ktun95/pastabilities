import axios from 'axios'
import {mergeCart} from '../components'

/**ACTION TYPES***/
const ADD_TO_CART = 'ADD_TO_CART'
const REMOVE_FROM_CART = 'REMOVE_FROM_CART'
const CHANGE_QUANTITY = 'CHANGE_QUANTITY'
const SET_CART = 'SET_CART'
const GET_GUEST_CART = 'GET_GUEST_CART'

/*** ACTION CREATORS***/
export const addToCart = product => ({type: ADD_TO_CART, product})
export const removeFromCart = product => ({type: REMOVE_FROM_CART, product})
export const getGuestCart = () => ({type: GET_GUEST_CART})
export const setCart = cart => ({type: SET_CART, cart})
export const changeQuantity = (product, quantity) => ({
  type: CHANGE_QUANTITY,
  product,
  quantity
})

/*** THUNK CREATORS***/
export const addWithUser = (product, userId) => async dispatch => {
  //find cart in database associated with userId in redux store
  console.log('addWithUser is firing')
  let cart
  try {
    if (userId) {
      console.log(cart)
      cart = await axios.post(`/api/carts/users/${userId}`)
      await axios.post(`/api/carts/${cart.data.id}/${product.id}`, {
        quantity: 1
      })
    }
    dispatch(addToCart(product))
  } catch (err) {
    console.error(err)
  }
}
//when user logs in, merge redux cart with DB cart
export const setUserCart = (currentCart, userId) => async dispatch => {
  const userCart = await axios.get(`/api/carts/users/${userId}`)
  dispatch(setCart(mergeCart(currentCart, userCart)))
}

/*** INITIAL STATE***/
const initialState = {
  cart: []
}
// {

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_TO_CART: {
      let foundIdx
      let newState

      const found = state.cart.find((item, index) => {
        foundIdx = index
        return item.id === action.product.id
      })

      if (found) {
        found.quantity = state.cart[foundIdx].quantity + 1
        newState = {
          ...state,
          cart: [...state.cart]
        }
      } else {
        newState = {
          ...state,
          cart: [...state.cart, {...action.product, quantity: 1}]
        }
      }
      window.localStorage.pastaCart = JSON.stringify(newState)
      return newState
    }

    case CHANGE_QUANTITY: {
      let foundIdx
      let newState

      const found = state.cart.find((item, index) => {
        foundIdx = index
        return item.id === action.product.id
      })

      if (!found) {
        console.log('There is no such item in the cart.')
      } else {
        found.quantity = action.quantity
        newState = {
          ...state,
          cart: [...state.cart]
        }
      }
      window.localStorage.pastaCart = JSON.stringify(newState)
      return newState
    }

    case REMOVE_FROM_CART: {
      const updatedCart = state.cart.filter(
        item => item.id !== action.product.id
      )

      const newState = {
        ...state,
        cart: [...updatedCart]
      }
      window.localStorage.pastaCart = JSON.stringify(newState)
      return newState
    }

    case GET_GUEST_CART: {
      if (window.localStorage.pastaCart) {
        const localCart = JSON.parse(window.localStorage.pastaCart)
        if (typeof localCart === 'object') {
          return {...state, cart: localCart}
        } else return {...state}
      }
      return {...state, cart: []}
    }

    case SET_CART: {
      return {
        ...state,
        cart: action.cart
      }
    }

    default:
      return state
  }
}
