import React, {Component} from 'react'
import {withStyles} from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Grid from '@material-ui/core/Grid'
import {Typography} from '@material-ui/core'

class reviewForm extends Component {
  render() {
    return (
      <React.Fragment>
        <Typography variant="h6" gutterBottom>
          <List disablePadding>
            {cart.map(product => (
              <ListItem className={classes.listItem} key={product.name}>
                <ListItemText
                  primary={product.name}
                  secondary={product.description}
                />
                <Typography variant="body2">{product.price}</Typography>
              </ListItem>
            ))}
            <ListItem className={classes.listItem}>
              <ListItemText primary="Total" />
              <Typography variant="subtitle1" className={classes.total}>
                $34.06
              </Typography>
            </ListItem>
          </List>
          <Grid container spacing={16}>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6" gutterBottom className={classes.title}>
                Shipping
              </Typography>
              <Typography variant="h6" gutterBottom>
                Shipping
              </Typography>
              <Typography gutterBottom>Address</Typography>
            </Grid>
            <Grid item container direction="column" xs={12} sm={6}>
              <Typography variant="h6" gutterBottom className={classes.title}>
                Payment details
              </Typography>
              <Grid container>
                {payments.map(payment => (
                  <React.Fragment key={payment.name}>
                    <Grid item xs={6}>
                      <Typography gutterBottom>{payment.name}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography gutterBottom>{payment.detail}</Typography>
                    </Grid>
                  </React.Fragment>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Typography>
      </React.Fragment>
    )
  }
}

export default reviewForm
