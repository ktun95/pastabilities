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
      <InputLabel htmlFor="name">
        Name:
        <span className="warning" hidden={props.state.name !== ''}>
          Name is required
        </span>
      </InputLabel>
      <Input
        type="text"
        name="name"
        value={props.state.name}
        onChange={props.updateHandler}
      />
      <br />
      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend">
          Pasta Type{' '}
          <span className="warning" hidden={props.state.type !== ''}>
            Pasta type is required
          </span>
        </FormLabel>
        <Select
          value={props.state.type}
          onChange={props.updateHandler}
          inputProps={{
            name: 'type',
            id: 'type'
          }}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value="semolina">Semolina</MenuItem>
          <MenuItem value="whole-wheat">Whole Wheat</MenuItem>
          <MenuItem value="gluten-free">Gluten-free</MenuItem>
        </Select>

        {/* <RadioGroup
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
        </RadioGroup> */}
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

      <InputLabel htmlFor="description">
        Description:
        <span className="warning" hidden={props.state.description !== ''}>
          Field is required
        </span>
      </InputLabel>
      <Input
        type="text"
        name="description"
        value={props.state.description}
        onChange={props.updateHandler}
      />
      <br />

      <InputLabel htmlFor="price">
        Price (in cents):
        <span className="warning" hidden={props.state.price !== ''}>
          Field is required
        </span>
      </InputLabel>
      <Input
        type="text"
        name="price"
        value={props.state.price}
        onChange={props.updateHandler}
        // startAdornment={<InputAdornment position="start">$</InputAdornment>}
      />

      <br />

      <InputLabel htmlFor="quantity">
        Inventory Quantity:
        <span className="warning" hidden={props.state.quantity !== ''}>
          Field is required
        </span>
      </InputLabel>
      <Input
        type="text"
        name="quantity"
        value={props.state.quantity}
        onChange={props.updateHandler}
      />
      <br />

      <InputLabel htmlFor="image">
        Image Url:
        <span className="warning" hidden={props.state.image !== ''}>
          Field is required
        </span>
      </InputLabel>

      <Input
        type="text"
        name="image"
        value={props.state.image}
        onChange={props.updateHandler}
      />

      <Button
        type="submit"
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
        variant="contained"
        color="secondary"
      >
        Submit
      </Button>
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
