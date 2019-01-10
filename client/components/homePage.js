import React from 'react'
import {withStyles} from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'

const styles = () => ({
  main: {
    marginTop: 10,
    marginBottom: 10
  },
  content: {
    width: '100%',
    height: 'auto'
  },
  container: {
    paddingTop: 10,
    flexWrap: 'nowrap',
    justifyContent: 'space-evenly'
  },
  item: {
    flex: 1
  },
  card: {
    height: 450
  },
  cardMedia: {
    paddingTop: '60%'
  },
  cardContent: {
    flexGrow: 1
  },
  footer: {
    padding: 50
  }
})

const MainFeatures = props => {
  const {classes} = props
  return (
    <React.Fragment>
      <div className={classes.main}>
        <img
          className={classes.content}
          src="https://media.eataly.com/media/catalog/category/header_pastaweek72.jpg"
          alt="pasta"
        />
      </div>
      <Grid container spacing={40} className={classes.container}>
        <Grid item className={classes.item}>
          <Card className={classes.card}>
            <CardMedia
              className={classes.cardMedia}
              image="https://cdn.pixabay.com/photo/2017/06/01/18/27/cook-2364182__480.jpg"
            />
            <CardContent className={classes.cardContent}>
              <Typography gutterBottom variant="h5" component="h2">
                Pasta of the Month
              </Typography>
              <Typography>
                This is a media card. You can use this section to describe the
                content.
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" color="primary">
                View
              </Button>
              <Button size="small" color="primary">
                Edit
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item className={classes.item}>
          <Card className={classes.card}>
            <CardMedia
              className={classes.cardMedia}
              image="https://cdn.pixabay.com/photo/2017/11/13/08/01/noodles-2944877__480.jpg"
            />
            <CardContent className={classes.cardContent}>
              <Typography gutterBottom variant="h5" component="h2">
                Pasta On Sale!
              </Typography>
              <Typography>
                This is a media card. You can use this section to describe the
                content.
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" color="primary">
                View
              </Button>
              <Button size="small" color="primary">
                Edit
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item className={classes.item}>
          <Card className={classes.card}>
            <CardMedia
              className={classes.cardMedia}
              image="https://cdn.pixabay.com/photo/2015/03/05/18/30/spaghetti-660748__480.jpg"
            />
            <CardContent className={classes.cardContent}>
              <Typography gutterBottom variant="h5" component="h2">
                Pasta Reciepe
              </Typography>
              <Typography>
                This is a media card. You can use this section to describe the
                content.
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" color="primary">
                View
              </Button>
              <Button size="small" color="primary">
                Edit
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
      <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="textSecondary"
          component="p"
        >
          Something should go here =p
        </Typography>
      </footer>
    </React.Fragment>
  )
}

export default withStyles(styles)(MainFeatures)
