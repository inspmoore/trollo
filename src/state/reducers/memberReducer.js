import * as actionType from '../../constants/actionTypes'
import { uuidv4 } from '../../helpers'

const _initialState = [
  { name: 'Aristotle', surname: 'of Stagira', id: uuidv4() },
  { name: 'Thomas', surname: 'Aquinas', id: uuidv4() },
  { name: 'Ayn', surname: 'Rand', id: uuidv4() }
]

export default function reducer(state = _initialState, action) {
  switch (action.type) {
  case actionType.CREATE_MEMBER:
    return state.concat(action.payload)

  case actionType.DELETE_MEMBER:
    return state.filter(member => member.id !== action.payload.id)

  case actionType.UPDATE_MEMBER:
    return state.map(member => {
      if (member.id === action.payload.id)
        return { ...member, ...action.payload }
      return member
    })

  default:
    return state
  }
}
