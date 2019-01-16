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
const db = require('../../server/db')

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
  const twoProducts = [
    {
      name: 'Pasta al Tartufo',
      description: 'Yummy Pasta',
      price: 1000,
      quantity: 100,
      image:
        'https://media.eataly.com/media/catalog/product/cache/21/small_image/303x/9df78eab33525d08d6e5fb8d27136e95/p/a/pasta_al_tartufo.jpg',
      type: 'whole-wheat',
      shape: 'long'
    },
    {
      name: 'Pasta Duc',
      description: 'Yummy Pasta',
      price: 1500,
      quantity: 100,
      image:
        'https://media.eataly.com/media/catalog/product/cache/21/small_image/303x/9df78eab33525d08d6e5fb8d27136e95/s/p/spaghetti_pomodoro_gift_box_update_1.jpg',
      type: 'gluten-free',
      shape: 'ribbon'
    }
  ]
  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
    store = mockStore(initialState)
    return db.sync({force: true})
  })

  afterEach(() => {
    mockAxios.restore()
    store.clearActions()
  })

  describe.only('fetchOrder', () => {
    it('dispatches the GET ORDER action', async () => {
      const fakeOrder = oneOrder
      console.log(oneOrder.id)
      // mockAxios.onGet(`api/orders/${oneOrder.id}`).replyOnce(200, fakeOrder)
      // await store.dispatch(fetchOrder(fakeOrder.id))
      // const actions = store.getActions()
      // expect(actions[0].type).to.be.equal('GET_ORDER')
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
