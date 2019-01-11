import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Button from '@material-ui/core/Button'
import {withStyles} from '@material-ui/core/styles'
import {fetchProducts} from '../store'

const pastaProduct = [
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
  },
  {
    name: 'Pasta Chris',
    description: 'Yummy Pasta',
    price: 2000,
    quantity: 100,
    image:
      'https://media.eataly.com/media/catalog/product/cache/21/small_image/303x/9df78eab33525d08d6e5fb8d27136e95/b/u/bucatini_al_tonno_eataly_update6.jpg',
    type: 'semolina',
    shape: 'tubular'
  },
  {
    name: 'Pasta Grey',
    description: 'Yummy Pasta',
    price: 2500,
    quantity: 100,
    image:
      'https://media.eataly.com/media/catalog/product/cache/21/small_image/303x/9df78eab33525d08d6e5fb8d27136e95/1/1/1128201.jpg',
    type: 'gluten-free',
    shape: 'stuffed'
  },
  {
    name: 'Pasta Kevin',
    description: 'Yummy Pasta',
    price: 2500,
    quantity: 100,
    image:
      'https://media.eataly.com/media/catalog/product/cache/21/small_image/303x/9df78eab33525d08d6e5fb8d27136e95/a/f/afeltra-carta-paglia-calamaro-500g-182405-1.jpg',
    type: 'whole-wheat',
    shape: 'tubular'
    //testing
  },
  {
    name: 'Pasta Sam',
    description: 'Yummy Pasta',
    price: 3000,
    quantity: 100,
    image:
      'https://media.eataly.com/media/catalog/product/cache/21/small_image/303x/9df78eab33525d08d6e5fb8d27136e95/5/0/501151-A_1.jpg',
    type: 'semolina',
    shape: 'long'
  }
]

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto'
  },
  table: {
    minWidth: 700
  }
})

class Cart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cart: pastaProduct
    }
  }

  componentDidMount() {
    this.props.fetchProducts()
    const {classes, cart, allProducts} = this.props
    console.log('cart', cart)
    console.log('product', allProducts)
    const keyProducts = Object.keys(cart)
    console.log(keyProducts)
    console.log(allProducts)
    const bigCart = []
    allProducts.forEach(item => {
      console.log(item.quantity)
      if (keyProducts.includes(item.id.toString())) {
        item.quantity = cart[item.id]
        console.log('item qty after change', item.quantity)
        bigCart.push(item)
      }
    })
    console.log(bigCart)
  }

  render() {
    const {classes, cart, allProducts} = this.props
    // console.log('cart', cart)
    // console.log('product', allProducts)
    // const keyProducts = Object.keys(cart)
    // console.log(keyProducts)
    // const bigCart = []
    // allProducts.forEach(item => {
    //   if (keyProducts.includes(item.id)) {
    //     item.quantity = cart[item.id]
    //     bigCart.push(item)
    //   }
    // })
    // console.log(bigCart)
    return (
      <React.Fragment>
        <div>
          <h1>Cart</h1>
        </div>

        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="right">Description</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell align="right">Quantity</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {this.state.cart.map(product => (
                <TableRow key={product.name}>
                  <TableCell>{product.name}</TableCell>

                  <TableCell align="right">{product.description}</TableCell>
                  <TableCell align="right">{product.price}</TableCell>
                  <TableCell align="right">{product.quantity}</TableCell>
                </TableRow>
              ))}

              <TableRow>
                <TableCell rowSpan={3} />
                <TableCell colSpan={2}>Subtotal</TableCell>
                <TableCell align="right">{100}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Tax</TableCell>
                <TableCell align="right">{}</TableCell>
                <TableCell align="right">{}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={2}>Total</TableCell>
                <TableCell align="right">{100}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Paper>
        <Link to="/checkout">
          <Button>CheckOut</Button>
        </Link>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    cart: state.cart.cartProducts,
    allProducts: state.product.allProducts
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchProducts: () => {
      dispatch(fetchProducts())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles)(Cart)
)
