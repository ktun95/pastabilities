import React from 'react'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'

function singleProduct(props) {
  return (
    <div>
      <Paper>
        <Grid container>
          <Grid item>Item Picture</Grid>
          <Grid item>Item Details</Grid>
        </Grid>
      </Paper>
    </div>
  )
}

export default singleProduct
