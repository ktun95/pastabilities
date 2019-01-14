import React from 'react'
import ProductForm from './productForm'
import {putProduct, fetchProduct} from '../store'
import {connect} from 'react-redux'

class EditProduct extends React.Component {
  constructor() {
    super()
    this.state = {
      name: '',
      description: '',
      price: 0,
      quantity: 0,
      image: '',
      type: '',
      shape: '',
      error: {}
    }
    this.updateHandler = this.updateHandler.bind(this)
    this.submitHandler = this.submitHandler.bind(this)
    this.goAddPage = this.goAddPage.bind(this)
  }
  async componentDidMount() {
    const {match} = this.props
    const productId = Number(match.params.productId)
    // const thisProduct = allProducts.find(item => item.id === productId)
    // await this.setState(thisProduct)
    await this.props.fetchProduct(productId)
    // const {selectedProduct} = this.props
    console.log(this.props)
    this.setState(this.props.currentProduct)
  }
  updateHandler(event) {
    this.setState({error: {}})
    this.setState({[event.target.name]: event.target.value})
  }
  submitHandler(event) {
    const {match} = this.props

    try {
      event.preventDefault()
      if (!Number.isInteger(+this.state.price) || +this.state.price <= 0) {
        throw new Error(
          `The product's price must be a number greater than zero.`
        )
      }
      if (!Number.isInteger(+this.state.quantity) || +this.state.quantity < 0) {
        throw new Error(`The product's quantity must be a number.`)
      }
      this.props.putProduct(this.state)
      this.props.history.push(`/products/${Number(match.params.productId)}`)
    } catch (err) {
      this.setState({
        error: err
      })
    }
  }
  goAddPage(event) {
    this.props.history.goBack()
  }
  render() {
    return (
      <div>
        <button
          type="button"
          className="back-btn"
          value="/products/admin"
          onClick={this.goAddPage}
        >
          CANCEL
        </button>
        <div id="new-item">
          <h1>EDIT PASTA</h1>

          <ProductForm
            state={this.state}
            submitHandler={this.submitHandler}
            updateHandler={this.updateHandler}
          />
        </div>
      </div>
    )
  }
}

const mapState = ({product}) => {
  return {
    allProducts: product.allProducts,
    currentProduct: product.currentProduct
  }
}
const mapDispatch = dispatch => ({
  putProduct: product => dispatch(putProduct(product)),
  fetchProduct: product => dispatch(fetchProduct(product))
})

export default connect(mapState, mapDispatch)(EditProduct)
