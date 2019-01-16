import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'
const GET_USERS = 'GET_USERS'
const UPDATE_USER = 'UPDATE_USER'
const DELETE_USER = 'DELETE_USER'

/**
 * INITIAL STATE
 */
const defaultUser = {users: []}

/**
 * ACTION CREATORS
 */
const getUser = user => ({type: GET_USER, user})
const removeUser = () => ({type: REMOVE_USER})
const getUsers = users => ({type: GET_USERS, users})
const updateUser = user => ({type: UPDATE_USER, user})
const deleteUser = user => ({type: DELETE_USER, user})
/**
 * THUNK CREATORS
 */
export const me = () => async dispatch => {
  try {
    const res = await axios.get('/auth/me')
    dispatch(getUser(res.data || defaultUser))
  } catch (err) {
    console.error(err)
  }
}

export const auth = (email, password, method) => async dispatch => {
  let res
  try {
    res = await axios.post(`/auth/${method}`, {email, password})
  } catch (authError) {
    return dispatch(getUser({error: authError}))
  }

  try {
    dispatch(getUser(res.data))
    history.push('/home')
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout')
    dispatch(removeUser())
    history.push('/login')
  } catch (err) {
    console.error(err)
  }
}

export const fetchUsers = () => async dispatch => {
  try {
    const res = await axios.get('/api/users')
    dispatch(getUsers(res.data))
  } catch (error) {
    console.error(error)
  }
}
export const putUser = updatedUser => {
  return async dispatch => {
    const res = await axios.put(`/api/users/${updatedUser.id}`, updatedUser)
    dispatch(updateUser(updatedUser))
  }
}
export const destroyUser = user => async dispatch => {
  try {
    await axios.delete(`/api/users/${user.id}`)
    dispatch(deleteUser(user))
    const {data} = await axios.get('/api/users')
    dispatch(getUsers(data))
  } catch (err) {
    console.error(err)
  }
}
/**
 * REDUCER
 */
export default function(state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return {...state, ...action.user}
    case REMOVE_USER:
      return defaultUser
    case GET_USERS:
      return {...state, users: action.users}
    case UPDATE_USER:
      return {
        ...state,
        users: state.users.map(user => {
          if (user.id !== action.user.id) {
            return user
          } else {
            return action.user
          }
        })
      }
    case DELETE_USER:
      return {
        ...state,
        users: state.users.filter(user => user.id !== action.user.id)
      }
    default:
      return state
  }
}
