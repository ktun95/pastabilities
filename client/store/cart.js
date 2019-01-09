/**
 * ACTION TYPES
 */
const ADD_TO_CART = 'ADD_TO_CART'
const REMOVE_FROM_CART = 'REMOVE_FROM_CART'

/**
 * ACTION CREATORS
 */
export const addToCart = product => ({type: ADD_TO_CART, product})
export const removeFromCart = product => ({type: REMOVE_FROM_CART, product})

/**
 * INITIAL STATE
 */

const initialState = {
  cartProducts: []
}

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_TO_CART:
      return {cartProducts: [...state.cartProducts, action.product]}
    case REMOVE_FROM_CART:
      return {
        cartProducts: [...state.cartProducts].filter(
          product => product.id !== action.product.id
        )
      }
    default:
      return state
  }
}
