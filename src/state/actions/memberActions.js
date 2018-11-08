import * as actionType from '../../constants/actionTypes'
import { uuidv4 } from '../../helpers'
export function addMember({ name, surname, id }) {
  return {
    type: actionType.CREATE_MEMBER,
    payload: {
      name,
      surname,
      id
    }
  }
}

export function deleteMember({ id }) {
  return {
    type: actionType.DELETE_MEMBER,
    payload: {
      id
    }
  }
}

export function updateMember({ id, name, surname }) {
  return {
    type: actionType.UPDATE_MEMBER,
    payload: {
      id,
      name,
      surname
    }
  }
}
