import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import {withStyles} from '@material-ui/core/styles'
import MenuItem from '@material-ui/core/MenuItem'
import TextField from '@material-ui/core/TextField'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormHelperText from '@material-ui/core/FormHelperText'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'
import Button from '@material-ui/core/Button'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import InputAdornment from '@material-ui/core/InputAdornment'
import Select from '@material-ui/core/Select'
import {fetchTypes, fetchShapes, newShape, newType} from '../store'
import {connect} from 'react-redux'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

const styles = theme => ({
  root: {
    display: 'flex'
  },
  formControl: {
    margin: theme.spacing.unit * 3
  },
  group: {
    margin: `${theme.spacing.unit}px 0`,
    'flex-direction': 'row'
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  dense: {
    marginTop: 16
  },
  menu: {
    width: 200
  }
})

class ProductForm extends React.Component {
  constructor() {
    super()
    this.state = {
      openType: false,
      openShape: false,
      newType: '',
      newShape: ''
    }
  }
  componentDidMount() {
    this.props.fetchShapes()
    this.props.fetchTypes()
  }
  handleClickOpenType = () => {
    this.setState({openType: true})
  }
  handleClickOpenShape = () => {
    this.setState({openShape: true})
  }

  handleClose = () => {
    this.setState({
      openType: false,
      openShape: false,
      newType: '',
      newShape: ''
    })
  }
  updateHandler = event => {
    this.setState({[event.target.name]: event.target.value})
  }
  submitType = () => {
    this.props.newType(this.state.newType)
    this.handleClose()
  }
  submitShape = () => {
    this.props.newShape(this.state.newShape)
    this.handleClose()
  }
  render() {
    const {classes} = this.props
    return (
      <form>
        <InputLabel htmlFor="name">
          Name:
          <span className="warning" hidden={this.props.state.name !== ''}>
            Name is required
          </span>
        </InputLabel>
        <Input
          type="text"
          name="name"
          value={this.props.state.name}
          onChange={this.props.updateHandler}
        />
        <br />
        <FormControl component="fieldset" className={classes.formControl}>
          <FormLabel component="legend">
            Pasta Type{' '}
            <span className="warning" hidden={this.props.state.type !== ''}>
              Pasta type is required
            </span>
          </FormLabel>
          <Button
            variant="outlined"
            color="primary"
            onClick={this.handleClickOpenType}
          >
            Add new type
          </Button>
          <Dialog
            open={this.state.openType}
            onClose={this.handleClose}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">New Type</DialogTitle>
            <DialogContent>
              <DialogContentText>Add a new pasta type:</DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="newType"
                name="newType"
                type="text"
                value={this.state.newType}
                onChange={this.updateHandler}
                fullWidth
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose} color="primary">
                Cancel
              </Button>
              <Button onClick={this.submitType} color="primary">
                Add Type
              </Button>
            </DialogActions>
          </Dialog>
          <Select
            value={this.props.state.type}
            onChange={this.props.updateHandler}
            inputProps={{
              name: 'type',
              id: 'type'
            }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {this.props.types &&
              this.props.types.map(type => {
                return (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                )
              })}
          </Select>
        </FormControl>
        <FormControl component="fieldset" className={classes.formControl}>
          <FormLabel component="legend">
            Pasta Shape{' '}
            <span className="warning" hidden={this.props.state.shape !== ''}>
              Pasta shape is required
            </span>
          </FormLabel>
          <Button
            variant="outlined"
            color="primary"
            onClick={this.handleClickOpenShape}
          >
            Add new shape
          </Button>
          <Dialog
            open={this.state.openShape}
            onClose={this.handleClose}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">New Shape</DialogTitle>
            <DialogContent>
              <DialogContentText>Add a new pasta shape:</DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="newShape"
                name="newShape"
                type="text"
                value={this.state.newShape}
                onChange={this.updateHandler}
                fullWidth
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose} color="primary">
                Cancel
              </Button>
              <Button onClick={this.submitShape} color="primary">
                Add Shape
              </Button>
            </DialogActions>
          </Dialog>
          <Select
            value={this.props.state.shape}
            onChange={this.props.updateHandler}
            inputProps={{
              name: 'shape',
              id: 'shape'
            }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {this.props.shapes &&
              this.props.shapes.map(shape => {
                return (
                  <MenuItem key={shape} value={shape}>
                    {shape}
                  </MenuItem>
                )
              })}
          </Select>
        </FormControl>

        <InputLabel htmlFor="description">
          Description:
          <span
            className="warning"
            hidden={this.props.state.description !== ''}
          >
            Field is required
          </span>
        </InputLabel>
        <Input
          type="text"
          name="description"
          value={this.props.state.description}
          onChange={this.props.updateHandler}
        />
        <br />

        <InputLabel htmlFor="price">
          Price (in cents):
          <span className="warning" hidden={this.props.state.price !== ''}>
            Field is required
          </span>
        </InputLabel>
        <Input
          type="text"
          name="price"
          value={this.props.state.price}
          onChange={this.props.updateHandler}
          // startAdornment={<InputAdornment position="start">$</InputAdornment>}
        />

        <br />

        <InputLabel htmlFor="quantity">
          Inventory Quantity:
          <span className="warning" hidden={this.props.state.quantity !== ''}>
            Field is required
          </span>
        </InputLabel>
        <Input
          type="text"
          name="quantity"
          value={this.props.state.quantity}
          onChange={this.props.updateHandler}
        />
        <br />

        <InputLabel htmlFor="image">
          Image Url:
          <span className="warning" hidden={this.props.state.image !== ''}>
            Field is required
          </span>
        </InputLabel>

        <Input
          type="text"
          name="image"
          value={this.props.state.image}
          onChange={this.props.updateHandler}
        />

        <Button
          type="submit"
          disabled={
            this.props.state.name === '' ||
            this.props.state.type === '' ||
            this.props.state.description === '' ||
            this.props.state.price === '' ||
            this.props.state.quantity === '' ||
            this.props.state.image === '' ||
            this.props.state.shape === ''
          }
          onClick={this.props.submitHandler}
          variant="contained"
          color="secondary"
        >
          Submit
        </Button>
        {this.props.state.error.toString() === '[object Object]' ? (
          <div />
        ) : (
          <div className="error">{this.props.state.error.toString()}</div>
        )}
      </form>
    )
  }
}

ProductForm.propTypes = {
  classes: PropTypes.object.isRequired
}
const mapState = ({product}) => {
  return {
    shapes: product.shapes,
    types: product.types
  }
}
const mapDispatch = dispatch => ({
  fetchShapes: () => dispatch(fetchShapes()),
  fetchTypes: () => dispatch(fetchTypes()),
  newShape: shape => dispatch(newShape(shape)),
  newType: type => dispatch(newType(type))
})

export default connect(mapState, mapDispatch)(withStyles(styles)(ProductForm))
