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
    flexDirection: 'row'
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
  }
  componentDidMount() {
    this.props.fetchOrders()
  }
  updateHandler = order => {
    console.log(order)
  }
  render() {
    const {classes, allOrders} = this.props
    return (
      <Paper className={classes.paper}>
        <Grid container className={classes.container} spacing={16}>
          <Typography variant="h3" align="center">
            All Orders
          </Typography>
          <hr />
          <table className={classes.table}>
            <tbody>
              <tr className={classes.tableHeader}>
                <td>Order Id</td>
                <td>Order Date</td>
                <td>Status</td>
              </tr>
              {allOrders &&
                allOrders.map(order => (
                  <IndividualOrder key={order.id} order={order} />
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
    updateOrderStatus: updatedOrder => dispatch(updateOrderStatus())
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles)(AdminOrders)
)

function IndividualOrder({order}) {
  return (
    <tr key={order.id}>
      <td>{order.id}</td>
      <td>{order.orderDate.slice(0, 10)}</td>
      <td>
        {order.status}
        <Select
          value={order.status}
          onChange={() => this.updateHandler(order)}
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
    </tr>
  )
}
