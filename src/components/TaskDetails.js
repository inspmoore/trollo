// eslint-disable-next-line no-unused-vars
import React from 'react'
import { View, Button, StyleSheet, Alert } from 'react-native'
import LabeledValue from './LabeledValue'
import EditableText from './EditableText'

function TaskDetails({
  task,
  members,
  stageID,
  currentStageTitle,
  navigation,
  updateTask,
  deleteTask
}) {
  const handleDelegationChange = () => {
    navigation.navigate('ChooseMember', {
      memberID: task.teamMemberID,
      taskID: task.id
    })
  }

  const handleChangeStage = () => {
    navigation.navigate('ChooseStage', {
      taskID: task.id,
      stageID
    })
  }

  const delegatedTo = () => {
    const member = members.find(m => m.id === task.teamMemberID)
    return member ? member.label : 'Not delegated'
  }

  const handleChange = prop => {
    updateTask({ ...task, ...prop })
  }

  const onRemoveTask = () => {
    navigation.goBack()
    deleteTask({ id: task.id })
    // setTimeout(() => navigation.goBack(), 100)
  }

  const handleRemovePress = () => {
    Alert.alert(
      `Delete ${task.title}?`,
      'Are you sure you want to delete this task? You cannot undo this!',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', onPress: onRemoveTask }
      ]
    )
  }
  if (task)
    return (
      <View style={styles.main}>
        <View>
          <EditableText
            value={task.title}
            name="title"
            onChangeText={handleChange}
            style={styles.title}
          />
          <LabeledValue
            label="In stage"
            value={currentStageTitle}
            onPress={handleChangeStage}
          />
          <EditableText
            value={task.description}
            name="description"
            onChangeText={handleChange}
            style={styles.description}
            placeholder="Optional description"
          />
          <LabeledValue
            label="Delegated to"
            value={delegatedTo()}
            onPress={handleDelegationChange}
          />
        </View>

        <Button title="Remove Task" onPress={handleRemovePress} />
      </View>
    )
  return null
}

const styles = StyleSheet.create({
  main: {
    backgroundColor: '#fff',
    padding: 10,
    flex: 1,
    justifyContent: 'space-between'
  },
  title: {
    fontSize: 24,
    color: '#004D8E'
    // width: '100%'
  },
  description: {
    fontSize: 16,
    color: '#555555',
    minHeight: 100,
    backgroundColor: '#fafafa'
  }
})

export default TaskDetails
