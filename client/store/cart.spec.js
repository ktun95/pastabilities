import {expect} from 'chai'
import {addToCart, removeFromCart} from './cart'

import configureMockStore from 'redux-mock-store'

const mockStore = configureMockStore

import {createStore} from 'redux'
import {reducer} from './index'

const initialState = {}
