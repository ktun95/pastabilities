import {expect} from 'chai'
import {
  fetchOrder,
  postOrder,
  fetchOrders,
  fetchOrdersByUser,
  fetchOrdersByStatus,
  updateOrderStatus
} from './order'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

import {createStore} from 'redux'
import {reducer} from './index'

describe('thunk creators', () => {
  let store
  let mockAxios

  const initialState = {
    orders: [],
    userOrders: [],
    singleOrder: {}
  }

  const oneOrder = {
    id: 1,
    status: 'completed',
    orderDate: '2019-01-14 15:59:30.067-06',
    email: 'test@user.com',
    userId: 1
  }

  const twoOrders = [
    {
      id: 2,
      status: 'canceled',
      orderDate: '2019-01-14 15:59:30.067-06',
      email: 'test2@user.com',
      userId: 2
    },
    {
      id: 3,
      status: 'processing',
      orderDate: '2019-01-14 15:59:30.067-06',
      email: 'test2@user.com',
      userId: 2
    }
  ]

  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
    store = mockStore(initialState)
  })

  afterEach(() => {
    mockAxios.restore()
    store.clearActions()
  })

  describe.only('fetchOrder', () => {
    it('dispatches the GET ORDER action', async () => {
      const fakeOrder = oneOrder
      mockAxios.onGet(`api/orders/${oneOrder.id}`).replyOnce(200, fakeOrder)
      await store.dispatch(fetchOrder(fakeOrder.id))
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('GET_ORDER')
      // expect(actions[0].singleOrder).to.be.deep.equal(fakeOrder)
    })
  })
  describe('fetchProducts', () => {
    it('dispatches the GET PRODUCTS action', async () => {
      const fakeProducts = twoProducts
      mockAxios.onGet(`api/products`).replyOnce(200, fakeProducts)
      await store.dispatch(fetchProducts())
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('GET_PRODUCTS')
      expect(actions[0].products).to.be.deep.equal(fakeProducts)
    })
  })

  describe('postProduct', () => {
    it('dispatches the ADD PRODUCT action', async () => {
      const fakeProduct = oneProduct
      mockAxios.onPost(`api/products`).replyOnce(201, fakeProduct)
      await store.dispatch(postProduct(fakeProduct))
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('ADD_PRODUCT')
      expect(actions[0].product).to.be.deep.equal(fakeProduct)
    })
  })

  describe('Product - real store', () => {
    let testStore
    beforeEach(() => {
      testStore = createStore(reducer)
    })
    it('*** returns the initial state by default', () => {
      const action = {type: 'BLARGH', oneProduct}
      testStore.dispatch(action)
      const newState = testStore.getState()

      expect(newState.product.allProducts).to.deep.equal([])
      expect(newState.product.currentProduct).to.deep.equal({})
    })
    it('reduces on GET_PRODUCTS action', () => {
      const action = {type: 'GET_PRODUCTS', products: twoProducts}

      const prevState = testStore.getState()
      testStore.dispatch(action)
      const newState = testStore.getState()

      expect(newState.product.allProducts).to.be.deep.equal(twoProducts)
      expect(newState.product.allProducts).to.not.be.equal(
        prevState.product.allProducts
      )
    })
    it('reduces on ADD_PRODUCT action', () => {
      const action = {type: 'GET_PRODUCTS', products: twoProducts}
      testStore.dispatch(action)

      const action2 = {type: 'ADD_PRODUCT', product: oneProduct}

      const prevState = testStore.getState()
      testStore.dispatch(action2)
      const newState = testStore.getState()

      expect(newState.product.allProducts).to.be.deep.equal([
        ...twoProducts,
        oneProduct
      ])
      expect(newState.product.allProducts).to.not.be.equal(
        prevState.product.allProducts
      )
    })
  })
})
