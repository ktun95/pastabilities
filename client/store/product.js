import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_PRODUCT = 'GET_PRODUCT'
const GET_PRODUCTS = 'GET_PRODUCTS'
const ADD_PRODUCT = 'ADD_PRODUCT'
const EDIT_PRODUCT = 'EDIT_PRODUCT'
const DELETE_PRODUCT = 'DELETE_PRODUCT'

/**
 * ACTION CREATORS
 */
const getProduct = product => ({type: GET_PRODUCT, product})
const getProducts = products => ({type: GET_PRODUCTS, products})
const addProduct = product => ({type: ADD_PRODUCT, product})
const editProduct = product => ({type: EDIT_PRODUCT, product})
const deleteProduct = productId => ({type: DELETE_PRODUCT, productId})

/**
 * THUNK CREATORS
 */
//'flat pasta'
export const fetchProducts = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/products')
    dispatch(getProducts(data))
  } catch (err) {
    console.error(err)
  }
}
export const searchProductsName = searchString => async dispatch => {
  try {
    const {data} = await axios.get(`/api/products/search/${searchString}`)
    dispatch(getProducts(data))
  } catch (err) {
    console.error(err)
  }
}
export const fetchProduct = productId => async dispatch => {
  try {
    const {data} = await axios.get(`/api/products/${productId}`)
    dispatch(getProduct(data))
  } catch (err) {
    console.error(err)
  }
}
//NOTE: the below thunk won't work well as long as we have shape and type as ENUM columns; do the filtering in the redux store for now
export const fetchProductsByCategory = (type, shape) => async dispatch => {
  try {
    if (type === 'all') {
      const {data} = await axios.get(`/api/products/cat/${shape}`)
    } else if (shape === 'all') {
      const {data} = await axios.get(`/api/products/cat/${type}`)
    } else {
      const {data} = await axios.get(`/api/products/cat/${shape}/${type}`)
    }
    dispatch(getProducts(data))
  } catch (err) {
    console.error(err)
  }
}
export const postProduct = product => async dispatch => {
  try {
    const {data} = await axios.post('/api/products', product)
    dispatch(addProduct(data))
  } catch (err) {
    console.error(err)
  }
}
export const putProduct = product => async dispatch => {
  try {
    const {data} = await axios.put(`/api/products/${product.id}`, product)
    dispatch(editProduct(data))
  } catch (err) {
    console.error(err)
  }
}
export const destroyProduct = productId => async dispatch => {
  try {
    await axios.delete(`/api/products/${productId}`)
    dispatch(deleteProduct(productId))
  } catch (err) {
    console.error(err)
  }
}

/**
 * INITIAL STATE
 */
const initialState = {
  allProducts: [],
  currentProduct: {
    name: '',
    description: '',
    price: 0,
    quantity: 100,
    image: '',
    shape: '',
    type: ''
  }
}

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return {...state, allProducts: action.products}
    case GET_PRODUCT:
      return {...state, currentProduct: action.product}
    case ADD_PRODUCT:
      return {...state, allProducts: [...state.allProducts, action.product]}
    case EDIT_PRODUCT:
      return {
        allProducts: state.allProducts.map(product => {
          if (product.id !== +action.product.id) {
            return product
          } else {
            return {...action.product}
          }
        }),
        currentProduct: {...action.product}
      }
    case DELETE_PRODUCT:
      console.log(state.allProducts)
      return {
        allProducts: state.allProducts.filter(
          product => product.id !== +action.productId
        ),
        currentProduct: {}
      }
    default:
      return state
  }
}

// import axios from 'axios'

// /**
//  * ACTION TYPES
//  */
// const GET_PRODUCT = 'GET_PRODUCT'
// const GET_PRODUCTS = 'GET_PRODUCTS'
// const ADD_PRODUCT = 'ADD_PRODUCT'
// const EDIT_PRODUCT = 'EDIT_PRODUCT'
// const DELETE_PRODUCT = 'DELETE_PRODUCT'

// /**
//  * ACTION CREATORS
//  */
// const getProduct = product => ({ type: GET_PRODUCT, product })
// const getProducts = products => ({ type: GET_PRODUCTS, products })
// const addProduct = product => ({ type: ADD_PRODUCT, product })
// const editProduct = product => ({ type: EDIT_PRODUCT, product })
// const deleteProduct = productId => ({ type: DELETE_PRODUCT, productId })

// /**
//  * THUNK CREATORS
//  */
// //'flat pasta'
// export const fetchProducts = () => async dispatch => {
//   try {
//     const { data } = await axios.get('/api/products')
//     dispatch(getProducts(data))
//   } catch (err) {
//     console.error(err)
//   }
// }
// export const searchProductsName = searchString => async dispatch => {
//   try {
//     const { data } = await axios.get(`/api/products/search/${searchString}`)
//     dispatch(getProducts(data))
//   } catch (err) {
//     console.error(err)
//   }
// }
// export const fetchProduct = productId => async dispatch => {
//   try {
//     const { data } = await axios.get(`/api/products/${productId}`)
//     dispatch(getProduct(data))
//   } catch (err) {
//     console.error(err)
//   }
// }
// //NOTE: the below thunk won't work well as long as we have shape and type as ENUM columns; do the filtering in the redux store for now
// export const fetchProductsByCategory = (type, shape) => async dispatch => {
//   try {
//     if (type === 'all') {
//       const { data } = await axios.get(`/api/products/cat/${shape}`)
//     } else if (shape === 'all') {
//       const { data } = await axios.get(`/api/products/cat/${type}`)
//     } else {
//       const { data } = await axios.get(`/api/products/cat/${shape}/${type}`)
//     }
//     dispatch(getProducts(data))
//   } catch (err) {
//     console.error(err)
//   }
// }
// export const postProduct = product => async dispatch => {
//   try {
//     const { data } = await axios.post('/api/products', product)
//     dispatch(addProduct(data))
//   } catch (err) {
//     console.error(err)
//   }
// }
// export const putProduct = product => async dispatch => {
//   try {
//     const { data } = await axios.put(`/api/products/${product.id}`, product)
//     dispatch(editProduct(data))
//   } catch (err) {
//     console.error(err)
//   }
// }
// export const destroyProduct = productId => async dispatch => {
//   try {
//     await axios.delete(`/api/products/${productId}`)
//     dispatch(deleteProduct(productId))
//   } catch (err) {
//     console.error(err)
//   }
// }

// /**
//  * INITIAL STATE
//  */
// const initialState = {
//   allProducts: [],
//   numProductPages: 0,
//   productsPerPage: 5,
//   numPages: 0,
//   currentPage: [],
//   currentProduct: {
//     name: '',
//     description: '',
//     price: 0,
//     quantity: 100,
//     image: '',
//     shape: '',
//     type: ''
//   }
// }

// /**
//  * REDUCER
//  */
// export default function (state = initialState, action) {
//   switch (action.type) {
//     case GET_PRODUCTS:
//       return {
//         ...state,
//         allProducts: action.products,
//         numProductPages: action.products.length,
//         numPages: Math.ceil(action.products.length / 5),
//         currentPage: action.products.slice(0, state.productsPerPage)
//       }
//     case GET_PRODUCT:
//       return { ...state, currentProduct: action.product }
//     case ADD_PRODUCT:
//       return { ...state, allProducts: [...state.allProducts, action.product] }
//     case EDIT_PRODUCT:
//       return {
//         allProducts: state.allProducts.map(product => {
//           if (product.id !== +action.product.id) {
//             return product
//           } else {
//             return { ...action.product }
//           }
//         }),
//         currentProduct: { ...action.product }
//       }
//     case DELETE_PRODUCT:
//       console.log(state.allProducts)
//       return {
//         allProducts: state.allProducts.filter(
//           product => product.id !== +action.productId
//         ),
//         currentProduct: {}
//       }
//     default:
//       return state
//   }
// }
