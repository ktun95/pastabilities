import React from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {
  fetchProducts,
  fetchProduct,
  destroyProduct,
  updatePage,
  filterProducts,
  addToCart,
  fetchTypes,
  fetchShapes
} from '../store'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import {withStyles} from '@material-ui/core/styles'
import ReactPaginate from 'react-paginate'
import StarRatings from 'react-star-ratings'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'

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
  },
  breakMe: {},
  pagination: {},
  pagesPagination: {},
  active: {}

  //   #react-paginate ul {
  //     display: inline-block;
  //     padding-left: 15px;
  //     padding-right: 15px;
  // }

  // #react-paginate li {
  //     display: inline-block;
  // }
})
export class AllProducts extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      types: 'All Pastas',
      shapes: 'All Pastas',
      sortBy: 'Name',
      search: ''
    }
  }
  componentDidMount() {
    this.props.fetchProducts()
    this.props.fetchShapes()
    this.props.fetchTypes()
  }

  handleChange = event => {
    this.setState({[event.target.name]: event.target.value})
  }

  handlePaginateClick = data => {
    const indexStart = data.selected * this.props.productsPerPage
    const indexEnd = indexStart + this.props.productsPerPage
    const newPage = this.props.visibleProducts.slice(indexStart, indexEnd)
    this.props.updatePage(newPage)
  }

  handleFilterSelection = data => {
    this.setState({[data.target.name]: data.target.value}, async () => {
      let newVisiableProducts = []
      console.log('do we hit this', data.target.value)
      if (data.target.value === 'All Pastas') {
        console.log('do we hit this')
        this.props.fetchProducts()
      } else {
        newVisiableProducts = this.props.products.filter(
          product => product.type === data.target.value
        )
        await this.props.filterProducts(newVisiableProducts)

        const indexStart = 0
        const indexEnd = indexStart + this.props.productsPerPage
        const newPage = this.props.visibleProducts.slice(indexStart, indexEnd)
        this.props.updatePage(newPage)
      }
    })
  }

  handleSortSelection = data => {
    const sortedProducts = this.props.visibleProducts.sort(
      compareValues(data.target.value)
    )
  }

  compareValues(key, order = 'asc') {
    return function(a, b) {
      if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
        // property doesn't exist on either object
        return 0
      }

      const varA = typeof a[key] === 'string' ? a[key].toUpperCase() : a[key]
      const varB = typeof b[key] === 'string' ? b[key].toUpperCase() : b[key]

      let comparison = 0
      if (varA < varB) {
        comparison = 1
      } else if (varA > varB) {
        comparison = -1
      }
      return order === 'desc' ? comparison * -1 : comparison
    }
  }

  render() {
    const {classes, products, currentPage, numPages} = this.props
    const noProducts = !products || products.length === 0

    let searchPage = currentPage.filter(
      product =>
        product.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !==
        -1
    )

    return (
      <React.Fragment>
        <CssBaseline>
          <div className={classes.productFilter}>
            <Typography variant="h3" align="center">
              Our Products
            </Typography>
          </div>
          <div className={classes.productFilter}>
            <TextField
              name="search"
              className={classes.textField}
              variant="filled"
              label="Search"
              onChange={this.handleChange}
            />
            <TextField
              select
              name="types"
              label="Filter By Type"
              variant="filled"
              value={this.state.types}
              className={classes.textField}
              onChange={event => {
                this.handleFilterSelection(event)
              }}
            >
              {this.props.types.map(type => {
                return (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                )
              })}
            </TextField>

            <TextField
              select
              name="shapes"
              label="Filter By Shapes"
              variant="filled"
              value={this.state.shapes}
              className={classes.textField}
              onChange={event => {
                this.handleFilterSelection(event)
              }}
            >
              {this.props.shapes &&
                this.props.shapes.map(shape => {
                  return (
                    <MenuItem key={shape} value={shape}>
                      {shape}
                    </MenuItem>
                  )
                })}
            </TextField>
          </div>

          {this.props.isAdmin ? (
            <Link to="/admin/products/add">
              <Button
                variant="contained"
                className={classes.button}
                color="primary"
              >
                ADD NEW PASTA
              </Button>
            </Link>
          ) : (
            <div />
          )}
          <div className={classes.div}>
            {noProducts ? (
              <div className={classes.div}>
                <Paper>
                  <Typography variant="h1">
                    We ran out of Pasta! Please come back soon!
                  </Typography>
                </Paper>
              </div>
            ) : (
              <div className={classes.product}>
                <Grid container className={classes.container} spacing={16}>
                  {searchPage.map(product => (
                    <Grid key={product.id} item className={classes.item}>
                      <Card className={classes.card}>
                        <Link
                          to={`/products/${product.id}`}
                          onClick={() => {
                            this.props.fetchProduct(product.id)
                          }}
                        >
                          <CardMedia
                            className={classes.cardMedia}
                            image={product.image}
                          />
                        </Link>
                        <CardContent className={classes.cardContent}>
                          <Typography variant="h5" align="center" noWrap={true}>
                            {product.name}
                          </Typography>
                          <Typography variant="subtitle1" align="center">
                            ${(product.price / 100).toFixed(2)}
                          </Typography>
                          <div align="center">
                            <br />
                            {product.reviews.length > 0 && (
                              <StarRatings
                                rating={Number(
                                  product.reviews.reduce((sum, item) => {
                                    return sum + +item.rating
                                  }, 0) / product.reviews.length
                                )}
                                starRatedColor="blue"
                                starDimension="20px"
                                starSpacing="5px"
                              />
                            )}
                          </div>
                        </CardContent>
                        <CardActions>
                          <Link to={`/products/${product.id}`}>
                            <Button size="small" color="primary">
                              View
                            </Button>
                          </Link>
                          <Button
                            size="small"
                            color="primary"
                            onClick={() => this.props.addToCart(product)}
                          >
                            Add to Cart
                          </Button>
                        </CardActions>
                        {this.props.isAdmin ? (
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
                                this.props.destroyProduct(product.id)
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
                  ))}
                </Grid>
                <div id="react-paginate" className={classes.reactPaginate}>
                  {numPages > 1 ? (
                    <ReactPaginate
                      previousLabel="Prev"
                      nextLabel="Next"
                      breakLabel="..."
                      breakClassName={classes.breakMe}
                      pageCount={numPages}
                      marginPagesDisplayed={2}
                      pageRangeDisplayed={5}
                      onPageChange={this.handlePaginateClick}
                      containerClassName={classes.pagination}
                      subContainerClassName={classes.pagesPagination}
                      activeClassName={classes.active}
                    />
                  ) : (
                    ''
                  )}
                </div>
              </div>
            )}
          </div>
        </CssBaseline>
      </React.Fragment>
    )
  }
}

const mapState = ({product, user}) => {
  return {
    products: product.allProducts,
    isAdmin: user.isAdmin,
    currentPage: product.currentPage,
    numPages: product.numPages,
    productsPerPage: product.productsPerPage,
    visibleProducts: product.visibleProducts,
    types: product.types
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchShapes: () => dispatch(fetchShapes()),
    fetchTypes: () => dispatch(fetchTypes()),
    fetchProducts: () => {
      dispatch(fetchProducts())
    },
    fetchProduct: id => {
      dispatch(fetchProduct(id))
    },
    destroyProduct: id => {
      dispatch(destroyProduct(id))
    },
    updatePage: id => {
      dispatch(updatePage(id))
    },
    filterProducts: id => {
      dispatch(filterProducts(id))
    },
    addToCart: product => {
      dispatch(addToCart(product))
    }
  }
}

export default connect(mapState, mapDispatchToProps)(
  withStyles(styles)(AllProducts)
)
