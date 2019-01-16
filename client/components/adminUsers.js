import React from 'react'
import {connect} from 'react-redux'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import {withStyles} from '@material-ui/core/styles'
import {fetchUsers, putUser, destroyUser} from '../store'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'

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
    flexDirection: 'column',
    spacing: 8
  },
  item: {
    padding: 10,
    flexGrow: 1,
    flexBasis: '16%',
    display: 'flex'
  },
  card: {
    margin: '10px',
    height: '100%',
    padding: '10px',
    flexDirection: 'row',
    width: '100%',
    alignContent: 'flex-end'
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
  paper: {
    marginTop: '10px'
  },
  tableHeader: {
    fontWeight: 'bold'
  },
  table: {
    marginLeft: '10px',
    border: '1px'
  }
})
class AdminUsers extends React.Component {
  constructor() {
    super()
    this.state = {
      showAdmins: 'all'
    }
  }
  componentDidMount() {
    this.props.fetchUsers()
  }
  updateHandler = (user, isAdmin) => {
    // const updatedOrder = {
    //   ...event.target.value[0],
    //   status: event.target.value[1]
    // }
    const updatedUser = {
      ...user,
      isAdmin,
      updatedAt: new Date()
    }
    this.props.putUser(updatedUser)
  }
  updateShowHandler = event => {
    console.log(event.target.value)
    this.setState({showAdmins: event.target.value})
  }
  render() {
    const {classes, allUsers} = this.props
    let filteredUsers
    {
      allUsers && this.state.showAdmins !== 'all'
        ? (filteredUsers = allUsers.filter(
            user => user.isAdmin === (this.state.showAdmins === 'true')
          ))
        : (filteredUsers = allUsers)
    }
    return (
      <Paper className={classes.paper}>
        <Grid container className={classes.container} spacing={16}>
          <Typography variant="h3" align="center">
            Modify Users
          </Typography>
          <hr />

          <table className={classes.table}>
            <tbody>
              <tr>
                <td colSpan="3" />
                <td align="center">
                  Display:&nbsp;
                  <Select
                    value={this.state.showAdmins}
                    onChange={this.updateShowHandler}
                    inputProps={{
                      name: 'showAdmins',
                      id: 'showAdmins'
                    }}
                  >
                    <MenuItem value="all">All</MenuItem>
                    <MenuItem value="false">Non-Admins</MenuItem>
                    <MenuItem value="true">Admins</MenuItem>
                  </Select>
                </td>
              </tr>
              <tr className={classes.tableHeader}>
                <td>User Id</td>
                <td>Email</td>
                <td>Name</td>
                <td>Is Admin?</td>
              </tr>
              {filteredUsers &&
                filteredUsers.map(user => (
                  <IndividualUser
                    key={user.id}
                    user={user}
                    updateHandler={this.updateHandler}
                  />
                ))}
            </tbody>
          </table>
        </Grid>
      </Paper>
    )
  }
}

const mapStateToProps = ({user}) => ({
  allUsers: user.users
})
const mapDispatchToProps = dispatch => {
  return {
    fetchUsers: () => dispatch(fetchUsers()),
    destroyUser: user => dispatch(destroyUser(user)),
    putUser: user => dispatch(putUser(user))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles)(AdminUsers)
)

class IndividualUser extends React.Component {
  constructor() {
    super()
    this.state = {
      user: {},
      isAdmin: false
    }
  }
  littleUpdate = async event => {
    await this.setState({isAdmin: event.target.value})
    this.props.updateHandler(this.state.user, this.state.isAdmin)
  }
  componentDidMount() {
    this.setState({user: this.props.user, isAdmin: this.props.user.isAdmin})
  }
  render() {
    const {user} = this.props
    return (
      <React.Fragment>
        <tr>
          <td className="tdbox" />
          <td colSpan="3" className="tdbox" />
        </tr>
        <tr key={user.id} className="tdbox">
          <td>{user.id}</td>
          <td>{user.email}</td>
          <td>
            {user.firstName} {user.lastName}
          </td>
          <td>
            <Select
              value={this.state.isAdmin}
              onChange={this.littleUpdate}
              inputProps={{
                name: 'isAdmin',
                id: 'isAdmin'
              }}
            >
              <MenuItem value={false}>Non-Admin</MenuItem>
              <MenuItem value={true}>Admin</MenuItem>
            </Select>
          </td>
        </tr>
      </React.Fragment>
    )
  }
}
