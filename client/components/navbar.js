import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import {Link, NavLink} from 'react-router-dom'
import {logout} from '../store'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import ShoppingCart from '@material-ui/icons/ShoppingCart'
import {withStyles} from '@material-ui/core/styles'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'
import AccountCircle from '@material-ui/icons/AccountCircle'

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    color: 'white'
  },
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
})

class Navbar extends React.Component {
  constructor() {
    super()
    this.state = {
      anchorEl: null
    }
  }
  handleClose = () => {
    this.setState({anchorEl: null})
  }
  handleMenu = event => {
    this.setState({anchorEl: event.currentTarget})
  }
  goAddPage = address => {
    this.props.history.push(address)
  }
  render() {
    const {handleClick, isLoggedIn, isAdmin, classes} = this.props
    const open = Boolean(this.state.anchorEl)
    return (
      <React.Fragment>
        <AppBar position="static" color="primary">
          <Toolbar>
            <Typography variant="h6" color="inherit" noWrap style={{flex: 1}}>
              Pastabilities
            </Typography>
            {isLoggedIn && (
              <div>
                <IconButton
                  aria-owns={open ? 'menu-appbar' : undefined}
                  aria-haspopup="true"
                  onClick={this.handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={this.state.anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                  }}
                  open={open}
                  onClose={this.handleClose}
                >
                  <MenuItem onClick={() => this.goAddPage('/home')}>
                    My Orders
                  </MenuItem>

                  {isAdmin && (
                    <div>
                      <MenuItem onClick={() => this.goAddPage('/admin/users')}>
                        Users Admin
                      </MenuItem>
                      <MenuItem onClick={() => this.goAddPage('/admin/orders')}>
                        Orders Admin
                      </MenuItem>
                      <MenuItem onClick={() => this.goAddPage('/products')}>
                        Products Admin
                      </MenuItem>
                    </div>
                  )}
                </Menu>
              </div>
            )}
            <Link to="/">
              <Button variant="text" className={classes.button} color="primary">
                Home
              </Button>
            </Link>

            <Link to="/products">
              <Button variant="text" className={classes.button}>
                Catalog
              </Button>
            </Link>
            <Button variant="text" className={classes.button}>
              Contact
            </Button>
            {isLoggedIn ? (
              <Link to="/home">
                <Button
                  variant="text"
                  className={classes.button}
                  onClick={handleClick}
                >
                  Logout
                </Button>
              </Link>
            ) : (
              <Link to="/login">
                <Button variant="text" className={classes.button}>
                  Login
                </Button>
              </Link>
            )}
            <Link to="/cart">
              <IconButton color="secondary">
                <ShoppingCart />
              </IconButton>
            </Link>
          </Toolbar>
        </AppBar>
      </React.Fragment>
    )
  }
}

const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    isAdmin: !!state.user.isAdmin
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  isAdmin: PropTypes.bool.isRequired,
  classes: PropTypes.object.isRequired
}

export default withRouter(
  connect(mapState, mapDispatch)(withStyles(styles)(Navbar))
)
