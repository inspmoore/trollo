import * as actionTypes from '../../constants/actionTypes'

export function startMove({ taskID, stageID }) {
  return {
    type: actionTypes.START_MOVE,
    payload: {
      taskID,
      stageID
    }
  }
}

export function endMove({ taskID, stageID }) {
  return {
    type: actionTypes.END_MOVE,
    payload: {
      taskID,
      stageID
    }
  }
}

export function cancelMove() {
  return {
    type: actionTypes.CANCEL_MOVE
  }
}
