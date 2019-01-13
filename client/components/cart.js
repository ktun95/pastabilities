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
import Delete from '@material-ui/icons/DeleteRounded'
import {withStyles} from '@material-ui/core/styles'
import {fetchProducts} from '../store'
import {Typography} from '@material-ui/core'
import {billing} from './UtilityFunctions.js/functions'

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
    this.state = {}
  }

  componentDidMount() {}

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
                            {product.quantity}
                          </TableCell>
                          <TableCell align="right">
                            <IconButton>
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
              </div>)
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
