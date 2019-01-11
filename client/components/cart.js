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
      cart: []
    }
  }

  componentDidMount() {
    this.props.fetchProducts()
    const {cart, allProducts} = this.props
    const keyProducts = Object.keys(cart)
    const bigCart = []
    allProducts.forEach(item => {
      if (keyProducts.includes(item.id.toString())) {
        item.quantity = cart[item.id]
        bigCart.push(item)
      }
    })
    this.setState({
      cart: bigCart
    })
  }

  render() {
    const {classes} = this.props

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
