// eslint-disable-next-line no-unused-vars
import React from 'react'
import { View, Text, Button, Alert, StyleSheet } from 'react-native'
import EditableText from './EditableText'
import PropTypes from 'prop-types'

function MemberDetails({ member, deleteMember, updateMember, navigation }) {
  const handleDeleteMember = () => {
    navigation.goBack()
    deleteMember({ id: member.id })
  }

  const handleDeletePress = () => {
    Alert.alert(
      `Delete ${member.name} ${member.surname}?`,
      'Are you sure you want to permanently delete this team member?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', onPress: handleDeleteMember }
      ]
    )
  }

  const handleUpdate = o => {
    updateMember({ ...member, ...o })
  }

  if (member)
    return (
      <View style={styles.main}>
        <View>
          <View style={styles.field}>
            <Text style={styles.label}>Name</Text>
            <EditableText
              value={member.name}
              name="name"
              onChangeText={handleUpdate}
              style={styles.value}
              multiline={false}
              placeholder="Name"
            />
          </View>
          <View style={styles.field}>
            <Text style={styles.label}>Surname</Text>
            <EditableText
              value={member.surname}
              name="surname"
              onChangeText={handleUpdate}
              style={styles.value}
              multiline={false}
              placeholder="Surname"
            />
          </View>
        </View>
        <Button title="Delete member" onPress={handleDeletePress} />
      </View>
    )
  return (
    <View>
      <Text>Team member does not exist</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: 10
  },
  field: {
    marginBottom: 10
  },
  label: {
    color: '#555555',
    fontSize: 12
  },
  value: {
    fontSize: 20,
    backgroundColor: '#fafafa',
    padding: 4
  }
})

MemberDetails.propTypes = {
  member: PropTypes.object,
  deleteMember: PropTypes.func,
  updateMember: PropTypes.func,
  navigation: PropTypes.object
}

export default MemberDetails
