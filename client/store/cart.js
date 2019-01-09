/**
 * ACTION TYPES
 */
const ADD_TO_CART = 'ADD_TO_CART'
const REMOVE_FROM_CART = 'REMOVE_FROM_CART'

/**
 * ACTION CREATORS
 */
const addToCart = product => ({type: ADD_TO_CART, product})
const removeFromCart = product => ({type: REMOVE_FROM_CART, product})

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_TO_CART:
      return [...state, action.product]
    case REMOVE_FROM_CART:
      ;[action.product, ...remainingItems] = state
      return remainingItems
    default:
      return state
  }
}
