import * as actionTypes from '../../constants/actionTypes'

const _initialState = {
  moving: false
}

export default function reducer(state = _initialState, action) {
  switch (action.type) {
  case actionTypes.START_STAGE_MOVE:
    return {
      moving: true,
      fromStageID: action.payload.stageID,
      toStageID: null
    }
  case actionTypes.END_STAGE_MOVE:
    return {
      ...state,
      moving: false,
      toStageID: action.payload.stageID
    }

  case actionTypes.CANCEL_STAGE_MOVE: {
    return {
      moving: false
    }
  }

  default:
    return state
  }
}
