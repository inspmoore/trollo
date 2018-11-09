import React from 'react'
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
  Keyboard
} from 'react-native'
import EditableText from './EditableText'
import PropTypes from 'prop-types'

class TaskListItem extends React.Component {
  handlePress = () => {
    this.props.onPress(this.props.id)
  }

  handleLongPress = () => {
    this.props.onLongPress(this.props.id)
  }

  handleTitleChange = taskTitle => {
    const task = {
      id: this.props.id,
      ...taskTitle
    }
    this.props.onChange(task)
  }

  handleDeletePress = () => {
    console.log(this.props.id)
    Keyboard.dismiss()
    this.props.deleteTask({ id: this.props.id })
  }

  render() {
    const { title, moving, freshlyAdded, id } = this.props

    if (freshlyAdded)
      return (
        <View style={[style.main, style.editMode]}>
          <EditableText
            value={title}
            style={[{ lineHeight: 20, flex: 1 }, style.title]}
            onChangeText={this.handleTitleChange}
            name="title"
            placeholder="Task name"
            autoFocus={freshlyAdded}
            editable={freshlyAdded}
            onBlur={() => {
              this.props.taskEdited({ id })
            }}
            multiline={false}
            returnKeyType="done"
          />
          <TouchableOpacity onPress={this.handleDeletePress}>
            <Text>X</Text>
          </TouchableOpacity>
        </View>
      )

    return (
      <TouchableOpacity
        style={[style.main, { opacity: moving ? 0.5 : 1 }]}
        onPress={this.handlePress}
        onLongPress={this.handleLongPress}
      >
        {moving ? (
          <Text style={[style.title, { textAlign: 'center' }]}>
            Tap to move here
          </Text>
        ) : (
          <Text style={style.title}>{title}</Text>
        )}
      </TouchableOpacity>
    )
  }
}

const style = StyleSheet.create({
  main: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 8,
    marginTop: 10
  },
  editMode: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  title: {
    fontSize: 16
  }
})

TaskListItem.propTypes = {
  deleteTask: PropTypes.func,
  freshlyAdded: PropTypes.bool,
  id: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  onLongPress: PropTypes.func,
  onPress: PropTypes.func,
  taskEdited: PropTypes.func,
  title: PropTypes.string
}

export default TaskListItem
