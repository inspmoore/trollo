import * as actionType from '../../constants/actionTypes'
import { uuidv4 } from '../../helpers'

export function createTask({
  title,
  description,
  teamMemberID,
  stageID,
  freshlyAdded = false
}) {
  return {
    type: actionType.CREATE_TASK,
    payload: {
      title,
      description,
      teamMemberID,
      stageID,
      freshlyAdded,
      id: uuidv4()
    }
  }
}

export function deleteTask({ id }) {
  return {
    type: actionType.DELETE_TASK,
    payload: {
      id
    }
  }
}

export function updateTask({ id, title, description, teamMemberID }) {
  return {
    type: actionType.UPDATE_TASK,
    payload: {
      id,
      title,
      description,
      teamMemberID
    }
  }
}

export function delegateTask({ taskID, memberID }) {
  return {
    type: actionType.DELEGATE_TASK,
    payload: {
      taskID,
      memberID
    }
  }
}

export function taskEdited({ id }) {
  return {
    type: actionType.TASK_EDITED,
    payload: {
      id
    }
  }
}
