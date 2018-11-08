import * as actionType from '../../constants/actionTypes'
import { uuidv4 } from '../../helpers'

const _initialState = [
  {
    title: 'To Do',
    id: uuidv4(),
    tasks: []
  },
  {
    title: 'Doing',
    id: uuidv4(),
    tasks: []
  },
  {
    title: 'Done',
    id: uuidv4(),
    tasks: []
  }
]

export default function reducer(state = _initialState, action) {
  switch (action.type) {
  case actionType.CREATE_STAGE:
    return state.concat(action.payload)

  case actionType.DELETE_STAGE:
    return state.filter(stage => stage.id !== action.payload.id)

  case actionType.RENAME_STAGE:
    return state.map(stage => {
      if (stage.id === action.payload.id)
        return { ...stage, title: action.payload.title }
      return stage
    })

  case actionType.MOVE_STAGE: {
    // swap stage obj in array
    const { fromStageID, toStageID } = action.payload
    const fromIndex = state.findIndex(stage => stage.id === fromStageID)
    const toIndex = state.findIndex(stage => stage.id === toStageID)
    const newState = [...state]
    const stageToBeMoved = newState[fromIndex]
    newState.splice(fromIndex, 1)
    newState.splice(toIndex, 0, stageToBeMoved)
    // newState[fromIndex] = newState[toIndex]
    // newState[toIndex] = temp
    return newState
  }

  case actionType.CREATE_TASK:
  case actionType.ADD_TO_STAGE:
    return state.map(stage => {
      if (stage.id === action.payload.stageID) {
        if (stage.tasks.indexOf(action.payload.id) === -1) {
          return { ...stage, tasks: stage.tasks.concat(action.payload.id) }
        }
        return stage
      }
      return stage
    })

  case actionType.REMOVE_FROM_STAGE:
  case actionType.DELETE_TASK: {
    //task id
    const { id } = action.payload
    // array index of stage that holds a task with ID
    const taskStageIndex = findStageIndexForTask(id, state)
    if (taskStageIndex > -1) {
      const newState = [...state]
      newState[taskStageIndex].tasks = state[taskStageIndex].tasks.filter(
        taskID => taskID !== id
      )
      return newState
    }
    return state
  }

  case actionType.SWAP_TASKS: {
    const newState = [...state]
    const { fromTaskID, toTaskID, fromStageID, toStageID } = action.payload
    const fromStageIx = state.findIndex(stage => stage.id === fromStageID)
    const fromTaskIx = state[fromStageIx].tasks.indexOf(fromTaskID)
    const toStageIx = state.findIndex(stage => stage.id === toStageID)
    const taskToBeMoved = newState[fromStageIx].tasks[fromTaskIx]
    newState[fromStageIx].tasks.splice(fromTaskIx, 1)
    if (toTaskID) {
      const toTaskIx = state[toStageIx].tasks.indexOf(toTaskID)
      newState[toStageIx].tasks.splice(toTaskIx, 0, taskToBeMoved)
    } else {
      newState[toStageIx].tasks.push(taskToBeMoved)
    }
    return newState
  }

  default:
    return state
  }
}

const findStageIndexForTask = (taskID, stages) => {
  return stages
    .map(stage => stage.tasks)
    .map(tasks => tasks.indexOf(taskID))
    .findIndex(val => val > -1)
}
