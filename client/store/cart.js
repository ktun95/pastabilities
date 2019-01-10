import axios from 'axios'

/**
 * ACTION TYPES
 */
const ADD_TO_CART = 'ADD_TO_CART'
const REMOVE_FROM_CART = 'REMOVE_FROM_CART'
const CHANGE_QUANTITY = 'CHANGE_QUANTITY'
const SET_CART = 'SET_CART'
/**
 * ACTION CREATORS
 */
export const setCart = cart => ({SET_CARD, cart})
export const addToCart = product => ({type: ADD_TO_CART, product})
export const changeQuantity = (product, quantity) => ({
  type: CHANGE_QUANTITY,
  product,
  quantity
})
export const removeFromCart = product => ({type: REMOVE_FROM_CART, product})
/**
 * THUNK CREATORS
 */

export const getCart = () => async dispatch => {}
export const addToCartDB = product => async dispatch => {
  //rest of code here

  dispatch(addToCart(product))
}

/**
 * INITIAL STATE
 */

const initialState = {
  cartProducts: {}
}

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_TO_CART: {
      let productId = action.product.id
      let newOrAddedProduct = state.cartProducts[productId]
        ? state.cartProducts[productId] + 1
        : 1

      return {
        ...state,
        cartProducts: {
          ...state.cartProducts,
          [productId]: newOrAddedProduct
        }
      }
    }
    case REMOVE_FROM_CART: {
      let productId = action.product.id

      if (!state.cartProducts[productId]) {
        console.log('That item is not in the cart')
        return state
      } else {
        return {
          ...state,
          cartProducts: {
            ...state.cartProducts,
            [productId]: 0
          }
        }
      }
    }
    case CHANGE_QUANTITY:
      return {
        ...state,
        cartProducts: {
          ...state.cartProducts,
          [action.product.id]: action.quantity
        }
      }

    default:
      return state
  }
}
