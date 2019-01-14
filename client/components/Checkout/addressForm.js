import React, {Component} from 'react'
import Grid from '@material-ui/core/Grid'
import Typographhy from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'

class addressForm extends Component {
  render() {
    const {handleTextChange, state} = this.props
    return (
      <React.Fragment>
        <Typographhy variant="h6" gutterBottom>
          Shipping address
        </Typographhy>
        <Grid container spacing={24}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="firstName"
              name="firstName"
              value={state.firstName}
              onChange={handleTextChange}
              label="First name"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="lastName"
              name="lastName"
              value={state.lastName}
              onChange={handleTextChange}
              label="Last name"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="email"
              name="email"
              value={state.email}
              onChange={handleTextChange}
              label="Email"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="address1"
              name="address1"
              value={state.address1}
              onChange={handleTextChange}
              label="Address line 1"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="address2"
              name="address2"
              value={state.address2}
              onChange={handleTextChange}
              label="Address line 2"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="city"
              name="city"
              value={state.city}
              onChange={handleTextChange}
              label="City"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="state"
              name="state"
              value={state.state}
              onChange={handleTextChange}
              label="State"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="zipCode"
              name="zipCode"
              value={state.zipCode}
              onChange={handleTextChange}
              label="Zip / Postal code"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="country"
              name="country"
              value={state.country}
              onChange={handleTextChange}
              label="Country"
              fullWidth
            />
          </Grid>
        </Grid>
      </React.Fragment>
    )
  }
}

export default addressForm
