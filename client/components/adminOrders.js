import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import {withStyles} from '@material-ui/core/styles'

const styles = theme => ({
  productFilter: {
    display: 'flex',
    margin: theme.spacing.unit * 2,
    justifyContent: 'center'
  },
  root: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  margin: {
    margin: theme.spacing.unit
  },
  textField: {
    flexBasis: 200,
    margin: theme.spacing.unit
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    spacing: 8
  },
  item: {
    padding: 10,
    flexGrow: 1,
    flexBasis: '16%',
    display: 'flex'
  },
  card: {
    width: 225,
    height: '100%'
  },
  cardMedia: {
    paddingTop: '70%'
  },

  sort: {
    display: 'flex'
  },
  collectionSort: {
    display: 'flex',
    flexDirection: 'column'
  },
  button: {
    marginBottom: '10px'
  }
})
class AdminOrders extends React.Component {
  render() {
    return (
      <Grid container className={classes.container} spacing={16}>
        ORDERS HERE
      </Grid>
    )
  }
}

export default withStyles(styles)(AdminOrders)
