import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchProducts} from '../store'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import {withStyles} from '@material-ui/core/styles'

const styles = () => ({
  title: {
    paddingTop: 10
  }
})
export class AllProducts extends React.Component {
  componentDidMount() {
    this.props.fetchProducts()
  }

  render() {
    const {classes, products} = this.props
    console.log(classes)
    const noProducts = !products || products.length === 0

    return (
      <React.Fragment>
        <div className={classes.title}>
          <Paper>
            <Typography variant="h1" align="center">
              Pastas
            </Typography>
            <Grid />
          </Paper>
        </div>
      </React.Fragment>
    )
  }
}

const mapState = ({product}) => {
  return {
    products: product.allProducts
  }
}
const mapDispatch = {fetchProducts}
export default connect(mapState, mapDispatch)(withStyles(styles)(AllProducts))
