import React from 'react'
import ProductForm from './productForm'
import {postProduct} from '../store'
import {connect} from 'react-redux'

class AddProduct extends React.Component {
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
  updateHandler(event) {
    this.setState({error: {}})
    this.setState({[event.target.name]: event.target.value})
  }
  async submitHandler(event) {
    try {
      console.log('YO')
      event.preventDefault()
      if (!Number.isInteger(+this.state.price) || +this.state.price <= 0) {
        throw new Error(
          `The product's price must be a number greater than zero.`
        )
      }
      if (!Number.isInteger(+this.state.quantity) || +this.state.quantity < 0) {
        throw new Error(`The product's quantity must be a number.`)
      }
      await this.props.postProduct(this.state)
      this.props.history.push('/admin/products')
    } catch (err) {
      this.setState({
        error: err
      })
    }
  }
  goAddPage(event) {
    this.props.history.push(event.target.value)
  }
  render() {
    return (
      <div>
        <button
          className="back-btn"
          value="/admin/products"
          onClick={this.goAddPage}
        >
          CANCEL
        </button>
        <div id="new-item">
          <h1>ADD A PASTA</h1>

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

const mapDispatch = dispatch => ({
  postProduct: product => dispatch(postProduct(product))
})

export default connect(null, mapDispatch)(AddProduct)
