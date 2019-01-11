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
        <img className={classes.content} src="/images/hero.jpg" alt="pasta" />
      </div>
      <div className={classNames(classes.layout, classes.cardGrid)}>
        <Grid container spacing={16} justify="space-evenly">
          <Grid item>
            <Card className={classes.card}>
              <CardMedia
                className={classes.cardMedia}
                image="/images/pasta1.jpg"
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
                image="/images/pasta2.jpg"
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
                image="/images/pasta3.jpg"
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
