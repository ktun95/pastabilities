import React from 'react'
import {withStyles} from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import StarRatings from 'react-star-ratings'

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
  }
}

class AddProductReview extends React.Component {
  constructor() {
    super()
    this.state = {
      id: 0,
      rating: 0,
      comment: ''
    }
  }

  changeRating(newRating) {
    this.setState({
      rating: newRating
    })
  }
  render() {
    const {classes, review} = this.props
    return (
      <Card className={classes.card}>
        <CardContent>
          <StarRatings
            rating={this.state.rating}
            starRatedColor="blue"
            starDimension="40px"
            starSpacing="15px"
            changeRating={this.changeRating}
          />
          <Typography component="p">{review.comment}</Typography>
        </CardContent>
      </Card>
    )
  }
}

AddProductReview.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(AddProductReview)
