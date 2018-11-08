import * as actionTypes from '../../constants/actionTypes'
import { uuidv4 } from '../../helpers'

export function addToStage({ id, stageID }) {
  return {
    type: actionTypes.ADD_TO_STAGE,
    payload: {
      id,
      stageID
    }
  }
}
export function removeFromStage({ id }) {
  return {
    type: actionTypes.REMOVE_FROM_STAGE,
    payload: {
      id
    }
  }
}

export function renameStage({ id, title }) {
  return {
    type: actionTypes.RENAME_STAGE,
    payload: {
      id,
      title
    }
  }
}

export function createStage({ title }) {
  return {
    type: actionTypes.CREATE_STAGE,
    payload: {
      title,
      tasks: [],
      id: uuidv4()
    }
  }
}

export function deleteStage({ id }) {
  return {
    type: actionTypes.DELETE_STAGE,
    payload: {
      id
    }
  }
}

export function swapTasks({ fromTaskID, toTaskID, fromStageID, toStageID }) {
  return {
    type: actionTypes.SWAP_TASKS,
    payload: {
      fromTaskID,
      toTaskID,
      fromStageID,
      toStageID
    }
  }
}

export function swapStages({ fromStageID, toStageID }) {
  return {
    type: actionTypes.MOVE_STAGE,
    payload: {
      fromStageID,
      toStageID
    }
  }
}
