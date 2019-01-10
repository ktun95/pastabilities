import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import ShoppingCart from '@material-ui/icons/ShoppingCart'
import {withStyles} from '@material-ui/core/styles'

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  }
})

const Navbar = ({handleClick, isLoggedIn, isAdmin, classes}) => (
  <React.Fragment>
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography variant="h6" color="inherit" noWrap style={{flex: 1}}>
          Pastabilities
        </Typography>
        {isAdmin ? (
          <Link to="/products/admin">
            <Button
              variant="contained"
              className={classes.button}
              color="secondary"
            >
              Home
            </Button>
          </Link>
        ) : (
          <Link to="/">
            <Button
              variant="contained"
              className={classes.button}
              color="secondary"
            >
              Home
            </Button>
          </Link>
        )}
        <Link to="/products">
          <Button
            variant="contained"
            className={classes.button}
            color="secondary"
          >
            Catalog
          </Button>
        </Link>
        <Button
          variant="contained"
          className={classes.button}
          color="secondary"
        >
          Contact
        </Button>
        {isLoggedIn ? (
          <Link to="/home">
            <Button
              variant="contained"
              className={classes.button}
              color="secondary"
              onClick={handleClick}
            >
              Logout
            </Button>
          </Link>
        ) : (
          <Link to="/login">
            <Button
              variant="contained"
              className={classes.button}
              color="secondary"
            >
              Login
            </Button>
          </Link>
        )}
        <IconButton color="inherit">
          <ShoppingCart />
        </IconButton>
      </Toolbar>
    </AppBar>
  </React.Fragment>
)

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
  isAdmin: PropTypes.bool.isRequired
}

export default connect(mapState, mapDispatch)(withStyles(styles)(Navbar))
