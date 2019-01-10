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

const ProductReview = props => {
  const {classes, review} = props
  return (
    <Card className={classes.card}>
      <CardContent>
        <StarRatings
          rating={Number(review.rating)}
          starRatedColor="blue"
          starDimension="40px"
          starSpacing="15px"
        />
        <Typography component="p">{review.comment}</Typography>
      </CardContent>
    </Card>
  )
}

ProductReview.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(ProductReview)
