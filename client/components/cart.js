import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import FormControl from '@material-ui/core/FormControl'
import Delete from '@material-ui/icons/DeleteRounded'
import {withStyles} from '@material-ui/core/styles'
import {fetchProducts, removeFromCart, changeQuantity} from '../store'
import {Typography, Icon} from '@material-ui/core'
import {billing} from './UtilityFunctions.js/functions'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 5,
    overflowX: 'auto'
  },
  title: {
    margin: theme.spacing.unit * 2
  },
  table: {
    minWidth: 700
  },
  minNav: {
    margin: theme.spacing.unit * 2,
    display: 'flex',
    justifyContent: 'center',
    alignItem: 'center'
  },
  button: {
    margin: theme.spacing.unit * 2
  },
  main: {
    marginLeft: theme.spacing.unit * 5,
    marginRight: theme.spacing.unit * 5
  }
})

class Cart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      qty: 0
    }
  }

  componentDidMount() {}

  handleChange = (event, product) => {
    this.setState({[event.target.name]: event.target.value}, () => {
      this.props.changeQty(product, this.state.qty)
    })
  }

  render() {
    const {classes, cart} = this.props
    const bill = billing(cart)

    return (
      <React.Fragment>
        <CssBaseline>
          <div className={classes.title}>
            <Typography variant="h3" align="center">
              Shopping Cart
            </Typography>
          </div>
          {cart.length === 0 ? (
            <div className={classes.title}>
              <Typography variant="h3" align="center">
                Your cart is empty! Why don't you stock up on some pastas?
              </Typography>
            </div>
          ) : (
            <React.Fragment>
              <div className={classes.main}>
                <Paper className={classes.root}>
                  <Table className={classes.table}>
                    <TableHead>
                      <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell align="right">Description</TableCell>
                        <TableCell align="right">Price</TableCell>
                        <TableCell align="right">Quantity</TableCell>
                        <TableCell align="right">Remove</TableCell>
                      </TableRow>
                    </TableHead>

                    <TableBody>
                      {cart.map(product => (
                        <TableRow key={product.name}>
                          <TableCell>{product.name}</TableCell>
                          <TableCell align="right">
                            {product.description}
                          </TableCell>
                          <TableCell align="right">
                            {(product.price / 100).toFixed(2)}
                          </TableCell>
                          <TableCell align="right">
                            <FormControl>
                              <Select
                                value={product.quantity}
                                onChange={event =>
                                  this.handleChange(event, product)
                                }
                              >
                                <MenuItem value={1}>1</MenuItem>
                                <MenuItem value={2}>2</MenuItem>
                                <MenuItem value={3}>3</MenuItem>
                                <MenuItem value={4}>4</MenuItem>
                                <MenuItem value={5}>5</MenuItem>
                              </Select>
                            </FormControl>
                          </TableCell>
                          <TableCell align="right">
                            <IconButton
                              onClick={() => {
                                this.props.removeItem(product)
                              }}
                            >
                              <Delete />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                      <TableRow>
                        <TableCell rowSpan={3} />
                        <TableCell colSpan={2} align="right">
                          Subtotal
                        </TableCell>
                        <TableCell colSpan={2} align="right">
                          {bill.subTotal}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell colSpan={2} align="right">
                          Tax
                        </TableCell>
                        <TableCell colSpan={2} align="right">
                          {bill.tax}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell colSpan={2} align="right">
                          Total
                        </TableCell>
                        <TableCell colSpan={2} align="right">
                          {bill.total}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </Paper>
              </div>
              <div className={classes.minNav}>
                <Link to="/products">
                  <Button
                    variant="contained"
                    color="secondary"
                    className={classes.button}
                  >
                    Continue shopping
                  </Button>
                </Link>
                <Link to="/checkout">
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                  >
                    CheckOut
                  </Button>
                </Link>
              </div>
            </React.Fragment>
          )}
        </CssBaseline>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    cart: state.cart.cart,
    userId: state.user.id
  }
}

const mapDispatchToProps = dispatch => {
  return {
    removeItem: product => {
      dispatch(removeFromCart(product))
    },
    changeQty: (product, qty) => {
      dispatch(changeQuantity(product, qty))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles)(Cart)
)
