/**
 * ACTION TYPES
 */
const ADD_TO_CART = 'ADD_TO_CART'
const REMOVE_FROM_CART = 'REMOVE_FROM_CART'
const GET_CART_PRODUCTS = 'GET_CART_PRODUCTS'
/**
 * ACTION CREATORS
 */
export const addToCart = product => ({type: ADD_TO_CART, product})
export const removeFromCart = product => ({type: REMOVE_FROM_CART, product})

/**
 * THUNK CREATORS
 */
// export const addToCartDB

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
        return state
      } else if (state.cartProducts[productId] === 1) {
        const remainingItems = Object.assign({}, state.cartProducts)
        delete remainingItems[productId]
        return {
          ...state,
          cartProducts: remainingItems
        }
      } else {
        return {
          ...state,
          cartProducts: {
            ...state.cartProducts,
            [productId]: state.cartProducts[productId] - 1
          }
        }
      }
    }
    default:
      return state
  }
}
