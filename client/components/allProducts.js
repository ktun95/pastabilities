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

import ReactPaginate from 'react-paginate'
import AllProductsList from './allProductsList'
// import { Pagination } from 'semantic-ui-react'

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

export class AllProducts extends React.Component {
  constructor() {
    super()
    this.state = {
      // selectedProducts: [],
      // offset: 0,
      categoryId: '',
      allProducts: '',
      perPage: 5,
      currentPage: [],
      pageCount: 0
    }
  }
  async componentDidMount() {
    if (this.props.fetchProducts) {
      await this.props.fetchProducts()
      //this is where we caculate pagination
      const products = this.props.products
      const perPage = products.length
      // const firstPage = this.props.products.slice(0, perPage)
      // const numPages = Math.ceil(this.props.products.length / perPage)
      this.setState({
        pageCount: products
      })
    }
  }
  //HANDLE PAGE CLICK SHOULD SET CURRENT PRODUCTS

  handlePageClick = (evt, {activePage}) => {
    const startIndex = (activePage - 1) * this.state.perPage
    const endIndex = startIndex + this.state.perPage
    const pageProducts = this.state.products.slice(startIndex, endIndex)
    this.setState({currentPage: pageProducts})
  }
  handleSelectPagination = (evt, {activePage}) => {
    const startIndex = (activePage - 1) * this.state.perPage
    const endIndex = startIndex + this.state.perPage
    const pageProducts = this.state.products.slice(startIndex, endIndex)
    this.setState({currentPage: pageProducts})
  }

  setPageCount = (products, offset) => {}

  //
  render() {
    const {classes, products} = this.props
    const noProducts = !products || products.length === 0
    return (
      <React.Fragment>
        <nav className={classes.productFilter}>
          <h1 className={classes.title}>Pasta</h1>
          <div className={classes.sort}>
            <div className={classes.collectionSort}>
              <label>Filter By:</label>
              <select>
                <option value="/">All Pastas</option>
              </select>
            </div>
          </div>
          <div className={classes.sort}>
            <div className={classes.collectionSort}>
              <label>Sort By:</label>
              <select>
                <option value="/">Featured</option>
              </select>
            </div>
          </div>
        </nav>
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
                <AllProductsList products={products} />
              </Grid>
              <div id="react-paginate">
                <ReactPaginate
                  boundaryRange={1}
                  siblingRange={1}
                  // onPageChange={this.handleSelectPagination}
                  size="mini"
                  onPageChange={this.handlePageClick}
                  pageCount={this.state.pageCount}
                />
              </div>
            </div>
          )}
        </div>
      </React.Fragment>
    )
  }
}

const mapState = ({product, user}) => {
  return {
    products: product.allProducts,
    isAdmin: user.isAdmin
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchProducts: () => {
      dispatch(fetchProducts())
    },
    fetchProduct: id => {
      dispatch(fetchProduct(id))
    },
    destroyProduct: id => {
      dispatch(destroyProduct(id))
    }
  }
}

export default connect(mapState, mapDispatchToProps)(
  withStyles(styles)(AllProducts)
)
