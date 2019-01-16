import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
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
    width: '200px',
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
    marginLeft: '10px'
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
  updateHandler = event => {
    const updatedOrder = {
      ...event.target.value[0],
      status: event.target.value[1]
    }
    this.props.updateOrderStatus(updatedOrder)
  }
  updateShowHandler = event => {
    console.log(event.target.value)
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
            All Orders
          </Typography>
          <hr />

          <table className={classes.table}>
            <tbody>
              <tr>
                <td colSpan="3" />
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
                <td align="center">Change Status</td>
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
const mapState = ({product, user}) => {
  return {
    products: product.allProducts,
    isAdmin: user.isAdmin,
    userId: user.id,
    currentPage: product.currentPage,
    numPages: product.numPages,
    productsPerPage: product.productsPerPage,
    visibleProducts: product.visibleProducts,
    types: product.types,
    shapes: product.shapes
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

function IndividualOrder({order, updateHandler}) {
  return (
    <tr key={order.id}>
      <td>{order.id}</td>
      <td>{order.orderDate.slice(0, 10)}</td>
      <td>{order.status}</td>
      <td align="center">
        <Select
          value={order.status}
          onChange={updateHandler}
          inputProps={{
            name: 'status',
            id: 'status'
          }}
        >
          <MenuItem value={[order, 'created']}>Created</MenuItem>
          <MenuItem value={[order, 'processing']}>Processing</MenuItem>
          <MenuItem value={[order, 'canceled']}>Canceled</MenuItem>
          <MenuItem value={[order, 'completed']}>Completed</MenuItem>
        </Select>
      </td>
    </tr>
  )
}
