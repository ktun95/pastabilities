import React, {Component} from 'react'
import {connect} from 'react-redux'
import withStyles from '@material-ui/core/styles/withStyles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Paper from '@material-ui/core/Paper'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import AddressForm from './addressForm'
import Review from './reviewForm'
import StripeBtn from './stripe'
import ConfirmationPage from './confirmationPage'
import {billing} from '../UtilityFunctions.js/functions'
import {postOrder, addToCart, clearCart} from '../../store'

const steps = ['Shipping address', 'Review your order']

const styles = theme => ({
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 2 * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3,
    padding: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)]: {
      marginTop: theme.spacing.unit * 6,
      marginBottom: theme.spacing.unit * 6,
      padding: theme.spacing.unit * 3
    }
  },
  stepper: {
    padding: `${theme.spacing.unit * 3}px 0 ${theme.spacing.unit * 5}px`
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: theme.spacing.unit * 3,
    marginLeft: theme.spacing.unit
  }
})

class checkout extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeStep: 0,
      firstName: '',
      lastName: '',
      email: '',
      address1: '',
      address2: '',
      city: '',
      state: '',
      zipCode: '',
      country: '',
      paid: false,
      orderId: 0,
      userId: 0,
      cart: [],
      bill: {}
    }
  }

  componentDidMount = async () => {
    document.getElementsByClassName('StripeCheckout')[0].style.display = 'none'
    const localCart = JSON.parse(window.localStorage.pastaCart)
    // we're currently just loading up the redux cart!
    // await this.setState({cart: [...localCart.cart]})
    await this.setState({cart: [...this.props.cart]})
  }
  isPaid = async () => {
    //try catch
    const {
      email,
      firstName,
      lastName,
      address1,
      address2,
      city,
      state,
      zipCode,
      bill,
      userId,
      cart
    } = this.state

    const {subTotal, tax, total} = bill
    const orderDate = new Date()
    const status = 'processing'

    const orderId = await this.props.postOrder({
      status,
      orderDate,
      email,
      firstName,
      lastName,
      streetLine1: address1,
      streetLine2: address2,
      city,
      zipCode,
      tax,
      userId,
      state,
      cart,
      subTotal,
      total
    })
    //the below is a temporary hack because browser refresh currently kills the redux state cart and it isn't reloaded
    this.setState({paid: true, cart: []})
    console.log('this.props', this.props)
    console.log('this.state', this.state)
    console.log('orderId', orderId)
    this.props.clearCart()
    // await this.props.clearCart
    window.localStorage.clear()
  }
  getBill = async bill => {
    await this.setState({bill})
  }
  handleNext = () => {
    const {activeStep, ...userInfo} = this.state
    const {firstName, lastName, email, ...address} = userInfo
    const userObj = {firstName, lastName, email}

    if (activeStep === 0) {
      window.localStorage.user = JSON.stringify(userObj)
      window.localStorage.address = JSON.stringify(address)
    }
    if (activeStep === steps.length - 1) {
      document.getElementsByClassName('StripeCheckout')[0].click()
      return
    }
    this.setState(state => ({
      activeStep: state.activeStep + 1
    }))
  }

  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1
    }))
  }

  handleTextChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render() {
    const {classes, cart, order} = this.props
    const bill = parseFloat(billing(cart).total * 100).toFixed(2)
    const {activeStep} = this.state

    return (
      <React.Fragment>
        <CssBaseline>
          <main className={classes.layout}>
            <Paper className={classes.paper}>
              <Typography component="h1" variant="h4" align="center">
                Checkout
              </Typography>
              <Stepper activeStep={activeStep} className={classes.stepper}>
                {steps.map(label => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
              <React.Fragment>
                {this.state.paid === true ? (
                  <ConfirmationPage orderId={this.state.orderId} />
                ) : (
                  <React.Fragment>
                    {activeStep === 0 ? (
                      <AddressForm
                        handleTextChange={this.handleTextChange}
                        state={this.state}
                      />
                    ) : null}
                    {activeStep === 1 ? (
                      <Review getBill={this.getBill} />
                    ) : null}
                    <div className={classes.buttons}>
                      {activeStep !== 0 && (
                        <Button
                          onClick={this.handleBack}
                          className={classes.buttons}
                        >
                          Back
                        </Button>
                      )}
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={this.handleNext}
                        className={classes.buttons}
                      >
                        {activeStep === steps.length - 1
                          ? 'Place my order'
                          : 'Next'}
                      </Button>
                      <StripeBtn
                        isPaid={this.isPaid}
                        onClick={postOrder(this.state)}
                      />
                    </div>
                  </React.Fragment>
                )}
              </React.Fragment>
            </Paper>
          </main>
        </CssBaseline>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    cart: state.cart.cart,
    allProducts: state.product.allProducts,
    singleOrderId: state.order.singleOrder
  }
}
const mapDispatchToProps = dispatch => {
  return {
    postOrder: order => {
      dispatch(postOrder(order))
    },
    clearCart: () => {
      dispatch(clearCart())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles)(checkout)
)
