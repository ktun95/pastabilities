import React, {Component} from 'react'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'

class Cart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cart: []
    }
  }
  render() {
    return (
      <React.Fragment>
        <div>
          <h1>Cart</h1>
        </div>

        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Quantity</TableCell>
              </TableRow>
            </TableHead>
          </Table>
          <TableBody>
            {this.state.cart.map(product => (
              <TableRow key={product.id}>
                <TableCell>{product.name}</TableCell>

                <TableCell>{product.description}</TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell>{product.quantity}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Paper>
      </React.Fragment>
    )
  }
}

export default Cart
