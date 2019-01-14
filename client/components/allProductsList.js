import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchProducts, fetchProduct, destroyProduct} from '../store'

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
    width: 200,
    height: '100%'
  },
  cardMedia: {
    paddingTop: '70%'
  },
  productFilter: {
    display: 'flex',
    paddingTop: 30,
    paddingBottom: 30
  },
  title: {
    flexGrow: 1
  },
  sort: {
    display: 'flex'
  },
  collectionSort: {
    display: 'flex',
    flexDirection: 'column'
  },
  ul: {
    display: 'inline-block',
    paddingLeft: '15px',
    paddingRight: '15px'
  },
  li: {
    display: 'inline - block'
  }
})

const AllProductsList = props => {
  const {product, classes} = props

  return (
    <div>
      <Grid key={product.id} item>
        <Card>
          <Link
            to={`/products/${product.id}`}
            onClick={() => {
              fetchProduct(product.id)
            }}
          >
            <CardMedia image={product.image} />
          </Link>
          <CardContent>
            <Typography variant="h5" align="center">
              {product.name}
            </Typography>
          </CardContent>
          <CardActions>
            <Link to={`/products/${product.id}`}>
              <Button size="small" color="primary">
                View
              </Button>
            </Link>
            <Button size="small" color="primary">
              Add to Cart
            </Button>
          </CardActions>
          {props.isAdmin ? (
            <CardActions>
              <Link to={`/admin/products/${product.id}/edit`}>
                <Button size="small" color="secondary">
                  Edit
                </Button>
              </Link>
              <Button
                size="small"
                color="secondary"
                value={product.id}
                onClick={() => {
                  destroyProduct(product.id)
                }}
              >
                Delete
              </Button>
            </CardActions>
          ) : (
            <div />
          )}
        </Card>
      </Grid>
    </div>
  )
}

export default withStyles(styles)(AllProductsList)
