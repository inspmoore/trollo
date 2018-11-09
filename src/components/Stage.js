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

function Stage({
  title,
  id,
  tasks,
  createTask,
  renameStage,
  navigation,
  deleteStage,
  tasksMoving,
  startMove,
  endMove,
  fromStageID,
  updateTask,
  deleteTask,
  taskEdited,
  onStageMove,
  stagesMoving,
  onStageEndMove
}) {
  const _handleTaskPress = taskID => {
    if (!tasksMoving)
      navigation.navigate('TaskDetails', { id: taskID, stageID: id })
    else endMove({ taskID: taskID, stageID: id })
  }

  const handleLongPress = taskID => {
    if (!tasksMoving) startMove({ taskID, stageID: id })
  }

  const onAddPress = () => {
    createTask({
      title: 'New task',
      description: '',
      stageID: id,
      freshlyAdded: true
    })
  }

  const handleStageTitleChange = prop => {
    renameStage({ id, ...prop })
  }

  const onRemoveStage = () => {
    deleteStage({ id, tasks })
  }

  const handleStageRemovePress = () => {
    Alert.alert(
      `Remove ${title}?`,
      'Are you sure you want to remove the stage with all it\'s tasks? This cannot be undone!',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', onPress: onRemoveStage }
      ]
    )
  }

  const handleTaskTitleChange = task => {
    updateTask({ ...task })
  }

  const renderEmptyTask = () => {
    if (tasksMoving)
      if (!tasks || id !== fromStageID)
        return (
          <TaskListItem
            onPress={() => endMove({ stageID: id })}
            moving={tasksMoving}
          />
        )
  }

  const handleStageMove = () => {
    onStageMove(id)
  }

  const handleStageEndMove = () => {
    onStageEndMove(id)
  }

  const _renderTasks = tasks => {
    return tasks.map(task => (
      <TaskListItem
        title={task.title}
        id={task.id}
        key={task.id}
        onPress={_handleTaskPress}
        onLongPress={handleLongPress}
        onChange={handleTaskTitleChange}
        deleteTask={deleteTask}
        freshlyAdded={task.freshlyAdded}
        taskEdited={taskEdited}
      />
    ))
  }

  return (
    <View style={styles.main}>
      <View style={styles.topBar}>
        <TextButton
          title="⟨⟩"
          onPress={handleStageMove}
          disabled={tasksMoving}
        />
        <EditableText
          value={title}
          name="title"
          onChangeText={handleStageTitleChange}
          style={styles.stageTitle}
          editable={!tasksMoving}
        />
        <TextButton
          title="╳"
          onPress={handleStageRemovePress}
          disabled={tasksMoving}
        />
      </View>
      <ScrollView keyboardShouldPersistTaps="handled">
        {tasks && _renderTasks(tasks)}
        {renderEmptyTask()}
      </ScrollView>
      <Button title="Add a task" onPress={onAddPress} disabled={tasksMoving} />
      {stagesMoving && (
        <TouchableOpacity
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            backgroundColor: 'white',
            opacity: 0.5,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 10
          }}
          onPress={handleStageEndMove}
        >
          <Text>Tap here to move stage</Text>
        </TouchableOpacity>
      )}
    </View>
  )
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
