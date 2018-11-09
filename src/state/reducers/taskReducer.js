import * as actionType from '../../constants/actionTypes'

const _initialState = []

export default function reducer(state = _initialState, action) {
  switch (action.type) {
  case actionType.CREATE_TASK: {
    const { stageID, ...rest } = action.payload // eslint-disable-line no-unused-vars
    return state.concat(rest)
  }

  case actionType.DELETE_TASK:
    return state.filter(task => task.id !== action.payload.id)

  case actionType.UPDATE_TASK: {
    return state.map(task => {
      if (task.id === action.payload.id) return { ...task, ...action.payload }
      return task
    })
  }

  case actionType.DELEGATE_TASK: {
    return state.map(task => {
      if (task.id === action.payload.taskID)
        return { ...task, teamMemberID: action.payload.memberID }
      return task
    })
  }

  case actionType.TASK_EDITED: {
    return state.map(task => {
      if (task.id === action.payload.id)
        return { ...task, freshlyAdded: false }
      return task
    })
  }

  default:
    return state
  }
}

export const getTasksById = (stageTaskIDs, allTasks) => {
  if (Array.isArray(stageTaskIDs) && stageTaskIDs.length > 0)
    return stageTaskIDs.map(id => allTasks.find(task => task.id === id))
}
