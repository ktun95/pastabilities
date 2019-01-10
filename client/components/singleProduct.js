import React, {Component} from 'react'
import {withStyles} from '@material-ui/core/styles'
import {connect} from 'react-redux'
import {fetchProduct} from '../store'
import Button from '@material-ui/core/Button'

const styles = () => ({})

class singleProduct extends Component {
  componentDidMount() {
    const productID = this.props.match.params.productID
    this.props.fetchProduct(productID)
  }

  render() {
    const {currentProduct} = this.props

    return (
      <div className="container">
        <div className="leftColumn">
          <img src={currentProduct.image} />
        </div>

        <div className="rightColumn">
          <div className="product-description">
            <span>Pasta</span>
            <h1>{currentProduct.name}</h1>
            <p>{currentProduct.description}</p>
          </div>

          <div className="product-price">
            <span>${currentProduct.price}</span>
            <Button size="small" color="primary">
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    currentProduct: state.product.currentProduct
  }
}

const mapDispatchtoProps = dispatch => {
  return {
    fetchProduct: id => dispatch(fetchProduct(id))
  }
}

export default connect(mapStateToProps, mapDispatchtoProps)(
  withStyles(styles)(singleProduct)
)
