// eslint-disable-next-line no-unused-vars
import React from 'react'
import {
  ScrollView,
  View,
  Dimensions,
  Button,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Text
} from 'react-native'
import TaskListItem from './TaskListItem'
import EditableText from './EditableText'
import TextButton from './TextButton'
import PropTypes from 'prop-types'

const { width } = Dimensions.get('window')

class Stage extends React.Component {
  _handleTaskPress = taskID => {
    const { tasksMoving, id, navigation, endMove } = this.props
    if (!tasksMoving)
      navigation.navigate('TaskDetails', { id: taskID, stageID: id })
    else endMove({ taskID: taskID, stageID: id })
  }

  handleLongPress = taskID => {
    const { tasksMoving, id, startMove } = this.props
    if (!tasksMoving) startMove({ taskID, stageID: id })
  }

  onAddPress = () => {
    const { id, createTask } = this.props
    createTask({
      title: 'New task',
      description: '',
      stageID: id,
      freshlyAdded: true
    })
    setTimeout(() => {
      this._scroll.scrollToEnd()
    }, 100)
  }

  handleStageTitleChange = prop => {
    const { id, renameStage } = this.props
    renameStage({ id, ...prop })
  }

  onRemoveStage = () => {
    const { id, tasks, deleteStage } = this.props
    deleteStage({ id, tasks })
  }

  handleStageRemovePress = () => {
    Alert.alert(
      `Remove ${title}?`,
      "Are you sure you want to remove the stage with all it's tasks? This cannot be undone!",
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', onPress: this.onRemoveStage }
      ]
    )
  }

  handleTaskTitleChange = task => {
    const { updateTask } = this.props
    updateTask({ ...task })
  }

  renderEmptyTask = () => {
    const { tasksMoving, id, tasks, fromStageID, endMove } = this.props
    if (tasksMoving)
      if (!tasks || id !== fromStageID)
        return (
          <TaskListItem
            onPress={() => endMove({ stageID: id })}
            moving={tasksMoving}
            id=""
          />
        )
  }

  handleStageMove = () => {
    const { onStageMove, id } = this.props
    onStageMove(id)
  }

  handleStageEndMove = () => {
    const { onStageEndMove, id } = this.props
    onStageEndMove(id)
  }

  _renderTasks = tasks => {
    const { deleteTask, taskEdited } = this.props
    return tasks.map(task => (
      <TaskListItem
        title={task.title}
        id={task.id}
        key={task.id}
        onPress={this._handleTaskPress}
        onLongPress={this.handleLongPress}
        onChange={this.handleTaskTitleChange}
        deleteTask={deleteTask}
        freshlyAdded={task.freshlyAdded}
        taskEdited={taskEdited}
      />
    ))
  }

  render() {
    const { title, tasks, tasksMoving, stagesMoving } = this.props

    return (
      <View style={styles.main}>
        <View style={styles.topBar}>
          <TextButton
            title="⟨⟩"
            onPress={this.handleStageMove}
            disabled={tasksMoving}
          />
          <EditableText
            value={title}
            name="title"
            onChangeText={this.handleStageTitleChange}
            style={styles.stageTitle}
            editable={!tasksMoving}
          />
          <TextButton
            title="╳"
            onPress={this.handleStageRemovePress}
            disabled={tasksMoving}
          />
        </View>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          ref={component => (this._scroll = component)}
        >
          {tasks && this._renderTasks(tasks)}
          {this.renderEmptyTask()}
        </ScrollView>
        <Button
          title="Add a task"
          onPress={this.onAddPress}
          disabled={tasksMoving}
        />
        {stagesMoving && (
          <TouchableOpacity
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
              backgroundColor: 'white',
              opacity: 0.7,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 10
            }}
            onPress={this.handleStageEndMove}
          >
            <Text>Tap here to move stage</Text>
          </TouchableOpacity>
        )}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main: {
    margin: 10,
    flex: 1,
    width: width - 20,
    backgroundColor: '#ddd',
    borderRadius: 10,
    padding: 10
  },
  stageTitle: {
    fontSize: 24,
    color: '#666',
    flex: 1
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
})

Stage.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  id: PropTypes.string.isRequired,
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      title: PropTypes.string,
      description: PropTypes.string,
      teamMemberID: PropTypes.string,
      freshlyAdded: PropTypes.bool
    })
  ),
  createTask: PropTypes.func.isRequired,
  renameStage: PropTypes.func.isRequired,
  navigation: PropTypes.object,
  deleteStage: PropTypes.func.isRequired,
  tasksMoving: PropTypes.bool.isRequired,
  startMove: PropTypes.func.isRequired,
  endMove: PropTypes.func.isRequired,
  fromStageID: PropTypes.string,
  updateTask: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
  taskEdited: PropTypes.func.isRequired,
  onStageMove: PropTypes.func.isRequired,
  stagesMoving: PropTypes.bool.isRequired,
  onStageEndMove: PropTypes.func.isRequired
}

export default Stage
