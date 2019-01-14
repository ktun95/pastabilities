import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import {withStyles} from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import {Link} from 'react-router-dom'

const styles = theme => ({
  root: {
    display: 'flex'
  },
  formControl: {
    margin: theme.spacing.unit * 3
  },
  group: {
    margin: `${theme.spacing.unit}px 0`,
    'flex-direction': 'row'
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  dense: {
    marginTop: 16
  },
  menu: {
    width: 200
  }
})
/**
 * COMPONENT
 */
const AuthForm = props => {
  const {name, displayName, handleSubmit, error, classes} = props

  return (
    <Card>
      <form onSubmit={handleSubmit} name={name}>
        <CardContent>
          <TextField
            id="email"
            label="Email"
            name="email"
            className={classes.textField}
            margin="normal"
          />
          <TextField
            id="password"
            label="Password"
            name="password"
            className={classes.textField}
            margin="normal"
            type="password"
          />
        </CardContent>
        <CardActions>
          <Button variant="contained" color="primary" type="submit" name={name}>
            {displayName}
          </Button>

          <a href="/auth/google">
            <Button color="primary">{displayName} with Google</Button>
          </a>

          <a href="/auth/facebook">
            <Button color="primary">{displayName} with Facebook</Button>
          </a>
        </CardActions>
        <CardActions>
          {displayName === 'Login' ? (
            <Link to="/signup">
              <Button size="small" color="secondary">
                SIGN UP
              </Button>
            </Link>
          ) : (
            <Link to="/login">
              <Button size="small" color="secondary">
                LOGIN
              </Button>
            </Link>
          )}
        </CardActions>
        {error &&
          error.response && (
            <div className="error"> {error.response.data} </div>
          )}
        <br />
      </form>
    </Card>
  )
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      dispatch(auth(email, password, formName))
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(
  withStyles(styles)(AuthForm)
)
export const Signup = connect(mapSignup, mapDispatch)(
  withStyles(styles)(AuthForm)
)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object,
  classes: PropTypes.object.isRequired
}
