import React, {Component} from 'react'
import Grid from '@material-ui/core/Grid'
import Typographhy from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'

class paymentForm extends Component {
  render() {
    return (
      <React.Fragment>
        <Typographhy variant="h6" gutterBottom>
          <Grid container spacing={24}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="cardName"
                label="Name on card"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="cardNumber"
                label="Card number"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="expirationDate"
                label="Expiration date"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField required id="cvv" label="CVV" fullWidth />
            </Grid>
          </Grid>
        </Typographhy>
      </React.Fragment>
    )
  }
}

export default paymentForm
