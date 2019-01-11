import axios from 'axios'

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

/*** THUNK CREATORS***/

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
      const prevState = {...state}
      const found = prevState.cart.find((item, index) => {
        foundIdx = index
        return item.id === action.product.id
      })
      if (found) {
        found.quantity = state.cart[foundIdx].quantity + 1

        const newState = {
          ...state,
          cart: [...state.cart]
        }
        window.localStorage.pastaCart = JSON.stringify(newState)
        return newState
      } else {
        const newState = {
          ...state,
          cart: [...state.cart, {...action.product, quantity: 1}]
        }
        window.localStorage.pastaCart = JSON.stringify(newState)
        return newState
      }
    }
    case GET_GUEST_CART: {
      if (window.localStorage.pastaCart)
        return JSON.parse(window.localStorage.pastaCart)
    }
    default:
      return state
  }
}
