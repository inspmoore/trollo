import { connect } from 'react-redux'
import Stages from '../components/Stages'
import {
  createTask,
  deleteTask,
  updateTask,
  taskEdited
} from '../state/actions/tasksActions'
import {
  renameStage,
  createStage,
  deleteStage
} from '../state/actions/stageActions'
import {
  startMove,
  endMove,
  cancelMove
} from '../state/actions/tasksMoveActions'
import {
  startStageMove,
  endStageMove,
  cancelStageMove
} from '../state/actions/stagesMoveActions'

function mapStateToProps(state) {
  return {
    stages: state.stages,
    tasks: state.tasks,
    tasksMoving: state.tasksMove.moving,
    fromStageID: state.tasksMove.fromStageID,
    stagesMoving: state.stagesMove.moving
  }
}

const mapDispatchToProps = dispatch => ({
  createTask(props) {
    dispatch(createTask(props))
  },
  renameStage(props) {
    dispatch(renameStage(props))
  },
  createStage(props) {
    dispatch(createStage(props))
  },
  deleteStage({ id, tasks }) {
    dispatch(deleteStage({ id }))
    if (Array.isArray(tasks))
      tasks.forEach(task => {
        dispatch(deleteTask({ id: task.id }))
      })
  },
  startMove({ taskID, stageID }) {
    dispatch(startMove({ taskID, stageID }))
  },
  endMove({ taskID, stageID }) {
    dispatch(endMove({ taskID, stageID }))
  },
  cancelMove() {
    dispatch(cancelMove())
  },
  updateTask({ id, title, description, teamMemberID }) {
    dispatch(updateTask({ id, title, description, teamMemberID }))
  },
  deleteTask({ id }) {
    dispatch(deleteTask({ id }))
  },
  taskEdited({ id }) {
    dispatch(taskEdited({ id }))
  },
  startStageMove({ stageID }) {
    dispatch(startStageMove({ stageID }))
  },
  endStageMove({ stageID }) {
    dispatch(endStageMove({ stageID }))
  },
  cancelStageMove() {
    dispatch(cancelStageMove())
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Stages)
