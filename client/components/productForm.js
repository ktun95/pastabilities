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

//I have just started incorporating the Material.UI code. Holding until after code review

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

export function ProductForm(props) {
  const {classes} = props
  return (
    <form>
      {/* <label htmlFor="name">
        Pasta Name:
        <span className="warning" hidden={props.state.name !== ''}>
          Field is required
        </span>
      </label>
      <input
        type="text"
        name="name"
        value={props.state.name}
        onChange={props.updateHandler}
      /> */}
      <TextField
        id="standard-name"
        label="Name"
        name="name"
        className={classes.textField}
        value={props.state.name}
        onChange={props.updateHandler}
        margin="normal"
      />
      <span className="warning" hidden={props.state.name !== ''}>
        Name is required
      </span>
      <br />
      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend">
          Pasta Type{' '}
          <span className="warning" hidden={props.state.type !== ''}>
            Pasta type is required
          </span>
        </FormLabel>

        <RadioGroup
          aria-label="Type"
          name="type"
          className={classes.group}
          value={props.state.type}
          onChange={props.updateHandler}
        >
          <FormControlLabel
            value="semolina"
            control={<Radio />}
            label="Semolina"
          />
          <FormControlLabel
            value="whole-wheat"
            control={<Radio />}
            label="Whole Wheat"
          />
          <FormControlLabel
            value="gluten-free"
            control={<Radio />}
            label="Gluten-free"
          />
        </RadioGroup>
      </FormControl>
      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend">
          Pasta Shape{' '}
          <span className="warning" hidden={props.state.shape !== ''}>
            Pasta shape is required
          </span>
        </FormLabel>

        <RadioGroup
          aria-label="Shape"
          name="shape"
          className={classes.group}
          value={props.state.shape}
          onChange={props.updateHandler}
        >
          <FormControlLabel value="long" control={<Radio />} label="long" />
          <FormControlLabel value="ribbon" control={<Radio />} label="ribbon" />
          <FormControlLabel
            value="tubular"
            control={<Radio />}
            label="tubular"
          />
          <FormControlLabel value="shaped" control={<Radio />} label="shaped" />
          <FormControlLabel
            value="stuffed"
            control={<Radio />}
            label="stuffed"
          />
        </RadioGroup>
      </FormControl>

      <label htmlFor="description">
        Description:
        <span className="warning" hidden={props.state.description !== ''}>
          Field is required
        </span>
      </label>
      <input
        type="text"
        name="description"
        value={props.state.description}
        onChange={props.updateHandler}
      />
      <br />

      <label htmlFor="price">
        Price:
        <span className="warning" hidden={props.state.price !== ''}>
          Field is required
        </span>
      </label>
      <input
        type="text"
        name="price"
        value={props.state.price}
        onChange={props.updateHandler}
      />
      <br />

      <label htmlFor="quantity">
        Quantity:
        <span className="warning" hidden={props.state.quantity !== ''}>
          Field is required
        </span>
      </label>
      <input
        type="text"
        name="quantity"
        value={props.state.quantity}
        onChange={props.updateHandler}
      />
      <br />

      <label htmlFor="image">
        Image Url:
        <span className="warning" hidden={props.state.image !== ''}>
          Field is required
        </span>
      </label>

      <input
        type="text"
        name="image"
        value={props.state.image}
        onChange={props.updateHandler}
      />

      <button
        type="submit"
        className="nav-btn"
        disabled={
          props.state.name === '' ||
          props.state.type === '' ||
          props.state.description === '' ||
          props.state.price === '' ||
          props.state.quantity === '' ||
          props.state.image === '' ||
          props.state.shape === ''
        }
        onClick={props.submitHandler}
      >
        Submit
      </button>
      {props.state.error.toString() === '[object Object]' ? (
        <div />
      ) : (
        <div className="error">{props.state.error.toString()}</div>
      )}
    </form>
  )
}

ProductForm.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(ProductForm)