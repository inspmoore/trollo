import React from 'react'
import { connect } from 'react-redux'
import TaskDetails from '../components/TaskDetails'
import { updateTask, deleteTask } from '../state/actions/tasksActions'

class TaskDetailsContainer extends React.Component {
  static navigationOptions = {
    title: 'Edit task'
  }
  render() {
    return <TaskDetails {...this.props} />
  }
}

function mapStateToProps(state, ownProps) {
  const id = ownProps.navigation.getParam('id', '')
  const stageID = ownProps.navigation.getParam('stageID')
  return {
    task: state.tasks.find(task => task.id === id),
    members: state.members.map(m => ({
      label: `${m.name} ${m.surname}`,
      id: m.id
    })),
    stageID,
    currentStageTitle:
      state.stages[
        state.stages
          .map(stage => stage.tasks)
          .map(tasks => tasks.indexOf(id))
          .findIndex(val => val > -1)
      ].title
  }
}

const mapDispatchToProps = {
  updateTask,
  deleteTask
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskDetailsContainer)
