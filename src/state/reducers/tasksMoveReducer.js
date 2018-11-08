import * as actionTypes from '../../constants/actionTypes'

const _initialState = {
  moving: false
}

export default function reducer(state = _initialState, action) {
  switch (action.type) {
  case actionTypes.START_MOVE:
    return {
      moving: true,
      fromTaskID: action.payload.taskID,
      fromStageID: action.payload.stageID,
      toTaskID: null,
      toStageID: null
    }
  case actionTypes.END_MOVE:
    return {
      ...state,
      moving: false,
      toTaskID: action.payload.taskID,
      toStageID: action.payload.stageID
    }

  case actionTypes.CANCEL_MOVE: {
    return {
      moving: false
    }
  }

  default:
    return state
  }
}
