import React from 'react'
import {withStyles} from '@material-ui/core/styles'
import {Link} from 'react-router-dom'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import classNames from 'classnames'

const styles = theme => ({
  heroUnit: {
    marginTop: 10,
    marginBottom: 10
  },
  layout: {
    width: 'auto',
    display: 'flex'
  },
  cardGrid: {
    padding: 50
  },
  card: {
    minWidth: 350,
    display: 'flex',
    flexDirection: 'column'
  },
  cardMedia: {
    paddingTop: '56.25%' // 16:9
  },
  cardContent: {
    flexGrow: 1
  },
  footer: {
    padding: 20
  },
  paperFooter: {
    flexGrow: 1
  },
  content: {
    marginTop: 10,
    marginBottom: 10,
    width: '100%',
    height: 'auto'
  }
})

const MainFeatures = props => {
  const {classes} = props
  return (
    <React.Fragment>
      <div className={classes.main}>
        <img
          className={classes.content}
          src="https://cdn.pixabay.com/photo/2015/03/07/13/55/pasta-663096_1280.jpg"
          alt="pasta"
        />
      </div>
      <div className={classNames(classes.layout, classes.cardGrid)}>
        <Grid container spacing={16} justify="space-evenly">
          <Grid item>
            <Card className={classes.card}>
              <CardMedia
                className={classes.cardMedia}
                image="https://cdn.pixabay.com/photo/2017/02/12/19/05/noodles-2060886_1280.jpg"
              />
              <CardContent className={classes.cardContent}>
                <Typography gutterBottom variant="h5" component="h2">
                  Pasta of the Month
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" color="primary">
                  Go
                </Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid item>
            <Card className={classes.card}>
              <CardMedia
                className={classes.cardMedia}
                image="https://cdn.pixabay.com/photo/2016/04/06/17/49/noodles-1312384_1280.jpg"
              />
              <CardContent className={classes.cardContent}>
                <Typography gutterBottom variant="h5" component="h2">
                  Pasta on Sale
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" color="primary">
                  Go
                </Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid item>
            <Card className={classes.card}>
              <CardMedia
                className={classes.cardMedia}
                image="https://cdn.pixabay.com/photo/2018/07/24/20/18/noodles-3559956_1280.jpg"
              />
              <CardContent className={classes.cardContent}>
                <Typography gutterBottom variant="h5" component="h2">
                  Easy Pasta Receipes
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" color="primary">
                  Go
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </div>
      <footer className={classes.footer}>
        <Paper className={classes.paperFooter}>
          <Tabs value={0} indicatorColor="primary" textColor="primary" centered>
            <Tab label="Greg" value={0} href="https://github.com/apoyando" />
            <Tab label="Chris" alue={1} href="https://github.com/celipas" />
            <Tab label="Kevin" alue={2} href="https://github.com/ktun95" />
            <Tab label="Duc" alue={3} href="https://github.com/ducvtrann" />
          </Tabs>
        </Paper>
      </footer>
    </React.Fragment>
  )
}

export default withStyles(styles)(MainFeatures)
