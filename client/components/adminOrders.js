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
import {fetchOrders} from '../store'

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
  }
})
class AdminOrders extends React.Component {
  constructor() {
    super()
  }
  componentDidMount() {
    this.props.fetchOrders()
  }
  render() {
    const {classes, allOrders} = this.props
    return (
      <Paper className={classes.paper}>
        <Grid container className={classes.container} spacing={16}>
          <Paper>
            <Typography variant="h3" align="center">
              All Orders
            </Typography>
          </Paper>
          {allOrders &&
            allOrders.map(order => (
              <Card key={order.id}>
                <div>Order Id: {order.id}</div>
                <div>Order Date: {order.orderDate}</div>
                <div>Status: {order.status}</div>
              </Card>
            ))}
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
    fetchOrders: () => dispatch(fetchOrders())
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles)(AdminOrders)
)
