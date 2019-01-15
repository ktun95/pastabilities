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
import {fetchOrdersByUser} from '../store'
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

class UserHome extends Component {
  componentDidMount() {}
  render() {
    const {email, classes, userOrders} = this.props
    console.log(this.props)
    return (
      <React.Fragment>
        <CssBaseline>
          <div className={classes.title}>
            <Typography variant="h3" align="center">
              Shopping Cart
            </Typography>
          </div>
          <div className={classes.main}>
            <Paper className={classes.root}>
              <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Order Number</TableCell>
                    <TableCell align="center">Qrder Status</TableCell>
                    <TableCell align="center">Order Total</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell align="center">Order Number</TableCell>
                    <TableCell align="center">Qrder Status</TableCell>
                    <TableCell align="center">Order Total</TableCell>
                  </TableRow>
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
