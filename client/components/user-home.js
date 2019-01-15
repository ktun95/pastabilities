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
import {withStyles} from '@material-ui/core/styles'
import {fetchOrdersByUser} from '../store'
import Typography from '@material-ui/core/Typography'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import {itemPrice} from './UtilityFunctions.js/functions'

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

class UserHome extends Component {
  componentDidMount() {
    try {
      console.log(this.props.userId)
      this.props.fetchOrdersByUser(this.props.userId)
    } catch (err) {
      console.log(err)
    }
  }
  render() {
    const {email, classes, userOrders} = this.props
    console.log(userOrders)
    return (
      <React.Fragment>
        <CssBaseline>
          <div className={classes.title}>
            <Typography variant="h3" align="center">
              Past Orders
            </Typography>
          </div>
          <div className={classes.main}>
            <Paper className={classes.root}>
              <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Order Number</TableCell>
                    <TableCell align="center">Qrder Status</TableCell>
                    <TableCell align="center">Order Date</TableCell>
                    <TableCell align="center">Order Details</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {userOrders.map(order => (
                    <TableRow key={order.id}>
                      <TableCell align="center">{order.id}</TableCell>
                      <TableCell align="center">{order.status}</TableCell>
                      <TableCell align="center">
                        {order.orderDate.slice(0, 10)}
                      </TableCell>
                      <ExpansionPanel>
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                          <Typography className={classes.heading}>
                            Products...
                          </Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                          {order.products.map(product => (
                            <div key={product.id}>
                              <p>{product.name}</p>
                              <p>
                                {parseFloat(
                                  itemPrice(product).subTotal / 100
                                ).toFixed(2)}
                              </p>
                              <p>{product.orderproduct.quantity}</p>
                              <p>
                                {parseFloat(
                                  itemPrice(product).total / 100
                                ).toFixed(2)}
                              </p>
                            </div>
                          ))}
                        </ExpansionPanelDetails>
                      </ExpansionPanel>
                      <ExpansionPanel />
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Paper>
          </div>
        </CssBaseline>
      </React.Fragment>
    )
  }
}

const mapState = state => {
  return {
    email: state.user.email,
    userOrders: state.order.userOrders,
    userId: state.user.id
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchOrdersByUser: userId => {
      dispatch(fetchOrdersByUser(userId))
    }
  }
}

export default connect(mapState, mapDispatchToProps)(
  withStyles(styles)(UserHome)
)
