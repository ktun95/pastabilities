import axios from 'axios'
import {mergeCart} from '../components/UtilityFunctions.js/functions'

/**ACTION TYPES***/
const ADD_TO_CART = 'ADD_TO_CART'
const REMOVE_FROM_CART = 'REMOVE_FROM_CART'
const CHANGE_QUANTITY = 'CHANGE_QUANTITY'
const SET_CART = 'SET_CART'
const GET_GUEST_CART = 'GET_GUEST_CART'
const CLEAR_CART = 'CLEAR_CART'

/*** ACTION CREATORS***/
export const addToCart = (product, isUser) => ({
  type: ADD_TO_CART,
  product,
  isUser
})
export const removeFromCart = product => ({type: REMOVE_FROM_CART, product})
export const getGuestCart = () => ({type: GET_GUEST_CART})
export const setCart = cart => ({type: SET_CART, cart})
export const changeQuantity = (product, quantity) => ({
  type: CHANGE_QUANTITY,
  product,
  quantity
})

export const clearCart = cart => ({
  type: CLEAR_CART,
  cart
})

/*** THUNK CREATORS***/
export const addWithUser = (product, userId) => async dispatch => {
  //find cart in database associated with userId in redux store
  console.log('addWithUser is firing')
  let cart
  let isUser = false
  try {
    if (userId) {
      console.log(cart)
      cart = await axios.post(`/api/carts/users/${userId}`)
      await axios.post(`/api/carts/${cart.data.id}/${product.id}`, {
        quantity: 1
      })
      isUser = true
    }
    dispatch(addToCart(product, isUser))
  } catch (err) {
    console.error(err)
  }
}

export function convertCartToOrder(cart) {
  return async dispatch => {
    dispatch(clearCart(cart))
  }
}

//when user logs in, merge redux cart with DB cart
export const setUserCart = (currentCart, userId) => async dispatch => {
  window.localStorage.pastaCart = JSON.stringify({cart: []})
  console.log('attempting to merge carts')
  //userCart includes products with the INVENTORY quantity, not the quantity in cartProducts; requires fix
  const userCart = await axios.get(`/api/carts/users/${userId}`)
  console.log(userCart.data)
  const mergedCart = mergeCart(currentCart, userCart.data.products)
  await dispatch(setCart(mergedCart))
  //still need to change cart in DB
}
//need a thunk for removing from user cart
//need a thunk for changing quantity from user cart

/*** INITIAL STATE***/
const initialState = {
  cart: []
}
// {

/**
 * REDUCER
 */
// eslint-disable-next-line complexity
export default function(state = initialState, action) {
  switch (action.type) {
    case CLEAR_CART: {
      return {...state, cart: []}
    }
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

      if (!action.isUser)
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
      if (!action.isUser)
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
      if (!action.isUser)
        window.localStorage.pastaCart = JSON.stringify(newState)
      return newState
    }

    case GET_GUEST_CART: {
      if (window.localStorage.pastaCart) {
        console.log('local pasta cart found')
        const localCart = JSON.parse(window.localStorage.pastaCart)
        if (typeof localCart === 'object') {
          console.log('pasta cart is an object, return pasta cart')
          return {...state, cart: localCart.cart}
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
