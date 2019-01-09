import React from 'react'
import Paper from '@material-ui/core/Paper'
import {withStyles} from '@material-ui/core/styles'
import {Typography} from '@material-ui/core'
import {connect} from 'react-redux'

const styles = () => ({
  div: {
    paddingTop: 10,
    paddingBottom: 10
  }
})

function singleProduct(props) {
  console.log(props)
  const {classes, currentProduct} = props
  console.log(currentProduct)
  return (
    <div className={classes.div}>
      <Paper>
        <Typography variant="h1" />
      </Paper>
    </div>
  )
}

const mapStateToProps = state => {
  console.log(state)
  return {
    currentProduct: state.currentProduct
  }
}

export default connect(mapStateToProps)(withStyles(styles)(singleProduct))
