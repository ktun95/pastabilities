import React from 'react'
import {connect} from 'react-redux'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import {withStyles} from '@material-ui/core/styles'
import {fetchOrders, updateOrderStatus} from '../store'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'

const styles = theme => ({
  productFilter: {
    display: 'flex',
    margin: theme.spacing.unit * 2,
    justifyContent: 'center'
  },
  root: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  margin: {
    margin: theme.spacing.unit
  },
  textField: {
    flexBasis: 200,
    margin: theme.spacing.unit
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column',
    spacing: 8
  },
  item: {
    padding: 10,
    flexGrow: 1,
    flexBasis: '16%',
    display: 'flex'
  },
  card: {
    margin: '10px',
    height: '100%',
    padding: '10px',
    flexDirection: 'row',
    width: '100%',
    alignContent: 'flex-end'
  },
  cardMedia: {
    paddingTop: '70%'
  },

  sort: {
    display: 'flex'
  },
  collectionSort: {
    display: 'flex',
    flexDirection: 'column'
  },
  button: {
    marginBottom: '10px'
  },
  paper: {
    marginTop: '10px'
  },
  tableHeader: {
    fontWeight: 'bold'
  },
  table: {
    marginLeft: '10px',
    marginRight: '10px',
    border: '1px'
  }
})
class AdminOrders extends React.Component {
  constructor() {
    super()
    this.state = {
      status: 'all'
    }
  }
  componentDidMount() {
    this.props.fetchOrders()
  }
  updateHandler = (order, status) => {
    // const updatedOrder = {
    //   ...event.target.value[0],
    //   status: event.target.value[1]
    // }
    const updatedOrder = {
      ...order,
      status,
      updatedAt: new Date()
    }
    this.props.updateOrderStatus(updatedOrder)
  }
  updateShowHandler = event => {
    this.setState({status: event.target.value})
  }
  render() {
    const {classes, allOrders} = this.props
    let filteredOrders
    {
      allOrders && this.state.status !== 'all'
        ? (filteredOrders = allOrders.filter(
            order => order.status === this.state.status
          ))
        : (filteredOrders = allOrders)
    }
    return (
      <Paper className={classes.paper}>
        <Grid container className={classes.container} spacing={16}>
          <Typography variant="h3" align="center">
            Modify Orders
          </Typography>
          <hr />

          <table className={classes.table}>
            <tbody>
              <tr>
                <td colSpan="4" />
                <td align="center">
                  Display:&nbsp;
                  <Select
                    value={this.state.status}
                    onChange={this.updateShowHandler}
                    inputProps={{
                      name: 'showStatus',
                      id: 'showStatus'
                    }}
                  >
                    <MenuItem value="all">All</MenuItem>
                    <MenuItem value="created">Created</MenuItem>
                    <MenuItem value="processing">Processing</MenuItem>
                    <MenuItem value="canceled">Canceled</MenuItem>
                    <MenuItem value="completed">Completed</MenuItem>
                  </Select>
                </td>
              </tr>
              <tr className={classes.tableHeader}>
                <td>Order Id</td>
                <td>Order Date</td>
                <td>Status</td>
                <td>Destination</td>
                <td>Products</td>
              </tr>
              {filteredOrders &&
                filteredOrders.map(order => (
                  <IndividualOrder
                    key={order.id}
                    order={order}
                    updateHandler={this.updateHandler}
                  />
                ))}
            </tbody>
          </table>
        </Grid>
      </Paper>
    )
  }
}

const mapStateToProps = ({order}) => ({
  allOrders: order.orders
})
const mapDispatchToProps = dispatch => {
  return {
    fetchOrders: () => dispatch(fetchOrders()),
    updateOrderStatus: updatedOrder => dispatch(updateOrderStatus(updatedOrder))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles)(AdminOrders)
)

class IndividualOrder extends React.Component {
  constructor() {
    super()
    this.state = {
      order: {},
      status: ''
    }
  }
  littleUpdate = async event => {
    await this.setState({status: event.target.value})
    this.props.updateHandler(this.state.order, this.state.status)
  }
  componentDidMount() {
    this.setState({order: this.props.order, status: this.props.order.status})
  }
  render() {
    const {order, updateHandler} = this.props
    return (
      <React.Fragment>
        <tr>
          <td colSpan="5" className="tdbox" />
        </tr>
        <tr key={order.id} className="tdbox">
          <td>{order.id}</td>
          <td> {order.orderDate.slice(0, 10)}</td>

          <td>
            <Select
              value={this.state.status}
              onChange={this.littleUpdate}
              inputProps={{
                name: 'status',
                id: 'status'
              }}
            >
              <MenuItem value="created">Created</MenuItem>
              <MenuItem value="processing">Processing</MenuItem>
              <MenuItem value="canceled">Canceled</MenuItem>
              <MenuItem value="completed">Completed</MenuItem>
            </Select>
          </td>
          <td>
            {order.firstName} {order.lastName}
            <br />
            {order.streetLine1}
            <br />
            {order.streetLine2}
            <br />
            {order.city},
            {order.state} {order.zipCode}
          </td>
          <td>
            {order.products.map(product => {
              return (
                <div key={product.id}>
                  <p>
                    Product: {product.name}
                    <br />
                    Quantity: {product.orderproduct.quantity}
                    <br />
                    Price: ${(product.orderproduct.price / 100).toFixed(2)}
                  </p>
                </div>
              )
            })}
          </td>
        </tr>
      </React.Fragment>
    )
  }
}
