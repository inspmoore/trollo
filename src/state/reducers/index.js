import { combineReducers } from 'redux'
import tasks, * as fromTasks from './taskReducer'
import stages from './stageReducer'
import members from './memberReducer'
import tasksMove from './tasksMoveReducer'
import stagesMove from './stagesMoveReducer'

export default combineReducers({
  tasks,
  stages,
  members,
  tasksMove,
  stagesMove
})

//SELECTORS
export const getTasksById = (state, allTasks) =>
  fromTasks.getTasksById(state.tasks, allTasks)
