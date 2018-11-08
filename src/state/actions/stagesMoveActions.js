import * as actionTypes from '../../constants/actionTypes'

export function startStageMove({ stageID }) {
  return {
    type: actionTypes.START_STAGE_MOVE,
    payload: {
      stageID
    }
  }
}

export function endStageMove({ stageID }) {
  return {
    type: actionTypes.END_STAGE_MOVE,
    payload: {
      stageID
    }
  }
}

export function cancelStageMove() {
  return {
    type: actionTypes.CANCEL_STAGE_MOVE
  }
}
