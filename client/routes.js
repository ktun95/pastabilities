import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  Login,
  Signup,
  UserHome,
  AllProducts,
  AdminProducts,
  AddProduct,
  EditProduct,
  HomePage,
  SingleProduct,
  Cart,
  AddProductReview,
  EditProductReview,
  Checkout,
  AdminOrders,
  AdminUsers
} from './components'
import {me, getGuestCart, setUserCart} from './store'

class Routes extends Component {
  async componentDidMount() {
    this.props.loadInitialData()
    setTimeout(() => {
      if (!this.props.isLoggedIn) {
        this.props.loadCart()
      } else {
        this.props.setUserCart([], this.props.userId)
      }
    }, 200)
  }

  componentDidUpdate() {
    if (!this.props.isLoggedIn) this.props.loadCart()
  }

  render() {
    const {isLoggedIn, isAdmin} = this.props

    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route exact path="/" component={HomePage} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/cart" component={Cart} />
        <Route path="/checkout" component={Checkout} />
        <Route exact path="/products" component={AllProducts} />
        <Route exact path="/products/:productID" component={SingleProduct} />
        {isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route path="/home" component={UserHome} />

            <Route
              exact
              path="/products/:productId/review/"
              component={AddProductReview}
            />
            <Route
              exact
              path="/products/:productId/review/:reviewId"
              component={EditProductReview}
            />
            {isAdmin && (
              <Switch>
                <Route exact path="/admin/products" component={AdminProducts} />
                <Route
                  exact
                  path="/admin/products/add"
                  component={AddProduct}
                />
                <Route
                  exact
                  path="/admin/products/:productId/edit"
                  component={EditProduct}
                />
                <Route exact path="/admin/orders" component={AdminOrders} />
                <Route exact path="/admin/users" component={AdminUsers} />
              </Switch>
            )}
          </Switch>
        )}
        {/* Displays our Login component as a fallback */}
      </Switch>
    )
  }
}

const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id,
    isAdmin: state.user.isAdmin,
    userId: state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
      return true
    },
    loadCart() {
      dispatch(getGuestCart())
    },
    setUserCart(currentCart, userId) {
      dispatch(setUserCart(currentCart, userId))
    }
  }
}

Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))
