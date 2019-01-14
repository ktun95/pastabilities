import React, {Component} from 'react'
import {withStyles} from '@material-ui/core/styles'
import {connect} from 'react-redux'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Grid from '@material-ui/core/Grid'
import {Typography} from '@material-ui/core'
import {billing, itemPrice} from '../UtilityFunctions.js/functions'
const styles = theme => ({
  listItem: {
    padding: `${theme.spacing.unit}px 0`
  },
  total: {
    fontWeight: '700'
  },
  title: {
    marginTop: theme.spacing.unit * 2
  }
})

class reviewForm extends Component {
  render() {
    const {classes, cart} = this.props
    const user = JSON.parse(window.localStorage.user)
    const address = JSON.parse(window.localStorage.address)
    const LocalStorageCart = JSON.parse(window.localStorage.pastaCart)
    const bill = billing(cart)

    return (
      <React.Fragment>
        <Typography variant="h6" gutterBottom>
          <List disablePadding>
            {cart.map(product => (
              <ListItem className={classes.listItem} key={product.id}>
                <ListItemText
                  primary={`${product.quantity} - ${product.name}`}
                  secondary={product.description}
                />
                <Typography variant="body2">
                  {itemPrice(product).subTotal}
                </Typography>
              </ListItem>
            ))}
            <ListItem className={classes.listItem}>
              <ListItemText primary="Subtotal" />
              <Typography variant="subtitle1" className={classes.total}>
                {bill.subTotal}
              </Typography>
            </ListItem>
            <ListItem className={classes.listItem}>
              <ListItemText primary="Tax" />
              <Typography variant="subtitle1" className={classes.total}>
                {bill.tax}
              </Typography>
            </ListItem>
            <ListItem className={classes.listItem}>
              <ListItemText primary="Total" />
              <Typography variant="subtitle1" className={classes.total}>
                {bill.total}
              </Typography>
            </ListItem>
          </List>
          <Grid container spacing={16}>
            <Grid item container direction="column" xs={12}>
              <Typography variant="h6" gutterBottom className={classes.title}>
                Shipping
              </Typography>
              <Typography gutterBottom>{`${user.firstName} ${
                user.lastName
              }`}</Typography>
              <Typography gutterBottom>{`${address.address1}`}</Typography>
              <Typography gutterBottom>{`${address.address2}`}</Typography>
              <Typography gutterBottom>{`${address.city}, ${address.state}, ${
                address.zipCode
              }`}</Typography>
            </Grid>
          </Grid>
        </Typography>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    cart: state.cart.cart
  }
}

export default connect(mapStateToProps)(withStyles(styles)(reviewForm))
