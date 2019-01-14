import React from 'react'
import {withStyles} from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import StarRatings from 'react-star-ratings'
import {connect} from 'react-redux'
import {fetchProduct, putReview} from '../store'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

const styles = {
  card: {
    minWidth: 275,
    margin: '10px'
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)'
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 22
  },
  textField: {
    width: '350px'
  }
}

class EditProductReview extends React.Component {
  constructor() {
    super()
    this.state = {
      id: '',
      userId: 0,
      productId: 0,
      rating: 0,
      comment: '',
      error: {}
    }
    this.changeRating = this.changeRating.bind(this)
    this.updateHandler = this.updateHandler.bind(this)
    this.submitHandler = this.submitHandler.bind(this)
    this.goAddPage = this.goAddPage.bind(this)
  }
  async componentDidMount() {
    const productId = this.props.match.params.productId
    const reviewId = +this.props.match.params.reviewId
    await this.props.fetchProduct(productId)
    let currReview
    if (this.props.currentProduct.reviews) {
      currReview = this.props.currentProduct.reviews.find(
        item => item.id === reviewId
      )
    }

    this.setState({
      userId: +currReview.userId,
      productId: +currReview.productId,
      rating: +currReview.rating,
      comment: currReview.comment,
      id: currReview.id
    })
  }

  changeRating(newRating, name) {
    this.setState({
      rating: newRating
    })
  }
  updateHandler(event) {
    this.setState({error: {}})
    this.setState({[event.target.name]: event.target.value})
  }
  submitHandler(event) {
    const {match} = this.props

    try {
      event.preventDefault()
      if (this.state.comment.length < 30 || this.state.comment.length > 50) {
        throw new Error(`Your comment must be between 30 and 50 characters.`)
      }
      this.props.putReview(this.state)
      this.props.history.push(`/products/${Number(match.params.productId)}`)
    } catch (err) {
      this.setState({
        error: err
      })
    }
  }
  goAddPage(event) {
    this.props.history.goBack()
  }
  render() {
    const {classes, currentProduct} = this.props
    return (
      <div align="center">
        <button
          className="back-btn"
          value="/products/admin"
          onClick={this.goAddPage}
        >
          CANCEL
        </button>
        <div className="leftColumn">
          <img src={currentProduct.image} />
        </div>

        <div className="rightColumn">
          <div className="product-description">
            <span>Pasta</span>
            <h1>{currentProduct.name}</h1>
            <p>{currentProduct.description}</p>
          </div>
        </div>
        <Card className={classes.card}>
          <CardContent>
            <StarRatings
              name="rating"
              rating={this.state.rating}
              starRatedColor="blue"
              starDimension="40px"
              starSpacing="15px"
              changeRating={this.changeRating}
            />
            <br />
            {/* <Typography component="p">{review.comment}</Typography> */}
            <TextField
              id="standard-name"
              label="Comments"
              name="comment"
              className={classes.textField}
              value={this.state.comment}
              onChange={this.updateHandler}
              margin="normal"
            />
            <br />
            <span className="warning" hidden={this.state.comment !== ''}>
              Comments are required
            </span>
            <br />

            <Button
              disabled={this.state.comment === ''}
              onClick={this.submitHandler}
            >
              Submit Review
            </Button>
            <br />
            <div
              className="error"
              hidden={this.state.error.toString() === '[object Object]'}
            >
              {this.state.error.toString()}
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }
}

EditProductReview.propTypes = {
  classes: PropTypes.object.isRequired
}

const mapStateToProps = state => {
  return {
    currentProduct: state.product.currentProduct,
    userId: state.user.id
  }
}

const mapDispatchtoProps = dispatch => {
  return {
    fetchProduct: id => dispatch(fetchProduct(id)),
    putReview: review => dispatch(putReview(review))
  }
}

export default connect(mapStateToProps, mapDispatchtoProps)(
  withStyles(styles)(EditProductReview)
)
