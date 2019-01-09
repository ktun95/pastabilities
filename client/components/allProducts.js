import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchProducts, fetchProduct} from '../store'
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
  div: {
    paddingTop: 10,
    paddingBottom: 10
  },
  cardImg: {
    height: '100%'
  },
  gridItem: {
    width: 150
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  cardMedia: {
    paddingTop: '56.25%'
  },
  cardContent: {
    flexGrow: 1
  }
})
export class AllProducts extends React.Component {
  componentDidMount() {
    console.log(this.props)
    this.props.fetchProducts()
  }

  render() {
    const {classes, products, fetchProduct} = this.props
    console.log(classes)
    const noProducts = !products || products.length === 0

    return (
      <React.Fragment>
        <div className={classes.div}>
          <Paper>
            <Typography variant="h1" align="center">
              Pastas
            </Typography>
          </Paper>

          {noProducts ? (
            <div className={classes.div}>
              <Paper>
                <Typography variant="h1">
                  We ran out of Pasta! Please come back soon!
                </Typography>
              </Paper>
            </div>
          ) : (
            <div className={classes.div}>
              <Grid container spacing={40}>
                {products.map(product => (
                  <Grid item key={product.id} sm={6} md={4} lg={3}>
                    <Card className={classes.card}>
                      <Link to={`/products/${product.id}`}>
                        <CardMedia
                          className={classes.cardMedia}
                          image={product.image}
                        />
                      </Link>
                      <CardContent className={classes.cardContent}>
                        <Typography gutterBottom variant="h5" component="h2">
                          {product.name}
                        </Typography>
                        <Typography>{product.description}</Typography>
                      </CardContent>
                      <CardActions>
                        <Link
                          to={`/products/${product.id}`}
                          onClick={() => {
                            fetchProduct(product.id)
                          }}
                        >
                          <Button size="small" color="primary">
                            Details
                          </Button>
                        </Link>
                        <Button size="small" color="primary">
                          Add to cart
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </div>
          )}
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
//const mapDispatch = {fetchProducts}

const mapDispatchToProps = dispatch => {
  return {
    fetchProducts: () => {
      dispatch(fetchProducts())
    },
    fetchProduct: id => {
      dispatch(fetchProduct(id))
    }
  }
}

export default connect(mapState, mapDispatchToProps)(
  withStyles(styles)(AllProducts)
)
