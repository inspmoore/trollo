// eslint-disable-next-line no-unused-vars
import React from 'react'
import { Button, ScrollView, View } from 'react-native'
import Prompt from 'react-native-input-prompt'
import Stage from './Stage'
import { getTasksById } from '../state/reducers/taskReducer'
import TextButton from './TextButton'
import PropTypes from 'prop-types'

class Stages extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const editMode = navigation.getParam('tasksMoving', false)
    const stagesEditMode = navigation.getParam('stagesMoving', false)
    if (editMode)
      return {
        title: 'Tap destination',
        headerRight: (
          <TextButton
            title="Cancel"
            onPress={navigation.getParam('cancelMove', () => {})}
          />
        ),
        headerStyle: {
          backgroundColor: '#ffe564'
        }
      }
    if (stagesEditMode)
      return {
        title: 'Tap destination',
        headerRight: (
          <TextButton
            title="Cancel"
            onPress={navigation.getParam('cancelStageMove', () => {})}
          />
        ),
        headerStyle: {
          backgroundColor: '#ffe564'
        }
      }
    return {
      title: 'Stages',
      headerRight: (
        <TextButton
          title="➕"
          onPress={navigation.getParam('showNewStagePrompt', () => {})}
        />
      )
    }
  }

  state = {
    prompt: false
  }
  temp = null
  temp2 = null

  showNewStagePrompt = () => {
    this.setState({ prompt: true })
  }

  componentWillMount() {
    this.props.navigation.setParams({
      showNewStagePrompt: this.showNewStagePrompt,
      tasksMoving: this.props.tasksMoving,
      cancelMove: this.props.cancelMove,
      stagesMoving: this.props.stagesMoving,
      cancelStageMove: this.props.cancelStageMove
    })
    this.temp = this.props.tasksMoving
    this.temp2 = this.props.stagesMoving
  }

  componentDidUpdate() {
    if (this.temp !== this.props.tasksMoving) {
      this.props.navigation.setParams({
        tasksMoving: this.props.tasksMoving,
        stagesMoving: this.props.stagesMoving
      })
      this.temp = this.props.tasksMoving
      this.temp2 = this.props.stagesMoving
    }
    if (this.temp2 !== this.props.stagesMoving) {
      this.props.navigation.setParams({
        stagesMoving: this.props.stagesMoving
      })
      this.temp2 = this.props.stagesMoving
    }
  }

  createNewStage = text => {
    this.setState({
      prompt: false
    })
    this.props.createStage({ title: text })
    setTimeout(() => {
      this._scrollRef.scrollToEnd()
    }, 100)
  }

  handleStageMove = stageID => {
    const { stagesMoving, startStageMove } = this.props
    console.log(stageID)
    if (!stagesMoving) startStageMove({ stageID })
  }

  handleStageEndMove = stageID => {
    const { endStageMove } = this.props
    endStageMove({ stageID })
  }

  _renderStages = () => {
    const {
      stages,
      createTask,
      tasks,
      navigation,
      renameStage,
      deleteStage,
      deleteTask,
      tasksMoving,
      startMove,
      endMove,
      fromStageID,
      updateTask,
      taskEdited,
      stagesMoving
    } = this.props
    return stages.map(stage => {
      let newStage = { ...stage }
      newStage.tasks = getTasksById(stage.tasks, tasks)
      return (
        <Stage
          {...newStage}
          key={stage.id}
          createTask={createTask}
          navigation={navigation}
          renameStage={renameStage}
          deleteStage={deleteStage}
          deleteTask={deleteTask}
          tasksMoving={tasksMoving}
          startMove={startMove}
          endMove={endMove}
          fromStageID={fromStageID}
          updateTask={updateTask}
          deleteTask={deleteTask}
          taskEdited={taskEdited}
          onStageMove={this.handleStageMove}
          stagesMoving={stagesMoving}
          onStageEndMove={this.handleStageEndMove}
        />
      )
    })
  }

  render() {
    const { stages } = this.props
    if (Array.isArray(stages))
      return (
        <View style={{ flex: 1 }}>
          <ScrollView
            horizontal={true}
            pagingEnabled={true}
            showsVerticalScrollIndicator={true}
            ref={component => (this._scrollRef = component)}
            keyboardShouldPersistTaps="always"
          >
            {this._renderStages()}
          </ScrollView>
          <Prompt
            visible={this.state.prompt}
            title="Create new stage"
            placeholder="New Stage"
            onCancel={() =>
              this.setState({
                prompt: false
              })
            }
            onSubmit={this.createNewStage}
            submitText="Create"
          />
        </View>
      )
    return <Text>No stage boards. Add one!</Text>
  }
}

Stages.propTypes = {
  cancelMove: PropTypes.func,
  cancelStageMove: PropTypes.func,
  createStage: PropTypes.func,
  createTask: PropTypes.func,
  deleteStage: PropTypes.func,
  deleteTask: PropTypes.func,
  endMove: PropTypes.func,
  endStageMove: PropTypes.func,
  fromStageID: PropTypes.string,
  navigation: PropTypes.object,
  renameStage: PropTypes.func,
  stages: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      title: PropTypes.string,
      tasks: PropTypes.arrayOf(PropTypes.string)
    })
  ),
  stagesMoving: PropTypes.bool,
  startMove: PropTypes.func,
  startStageMove: PropTypes.func,
  taskEdited: PropTypes.func,
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string,
      description: PropTypes.string,
      teamMemberID: PropTypes.string,
      freshlyAdded: PropTypes.bool
    })
  ),
  tasksMoving: PropTypes.bool,
  updateTask: PropTypes.func
}

export default Stages
