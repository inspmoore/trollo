// eslint-disable-next-line no-unused-vars
import React from 'react'
import {
  Text,
  FlatList,
  StyleSheet,
  View,
  Button,
  TouchableOpacity
} from 'react-native'
import { uuidv4 } from '../helpers'
import TextButton from './TextButton'

class Team extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Team',
      headerRight: (
        <TextButton
          title="➕"
          onPress={navigation.getParam('createNewTeamMember', () => {})}
        />
      )
    }
  }

  handleNewTeamMember = () => {
    const id = uuidv4()
    this.props.addMember({ name: '', surname: '', id })
    this.props.navigation.navigate('MemberDetails', {
      memberID: id
    })
  }

  componentWillMount() {
    this.props.navigation.setParams({
      createNewTeamMember: this.handleNewTeamMember
    })
  }

  gotoMember = id => {
    if (id)
      this.props.navigation.navigate('MemberDetails', {
        memberID: id
      })
  }

  renderItem = member => {
    const { item } = member
    const handleMemberPress = () => {
      this.gotoMember(item.id)
    }
    return (
      <TouchableOpacity onPress={handleMemberPress}>
        <Text style={[styles.listItem, styles.textSize]}>{`${item.name} ${
          item.surname
        }`}</Text>
      </TouchableOpacity>
    )
  }

  render() {
    const { members } = this.props
    return (
      <View style={styles.main}>
        <FlatList
          data={members}
          renderItem={this.renderItem}
          keyExtractor={(item, i) => 'm' + i + item.id}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main: {
    padding: 10,
    flex: 1,
    backgroundColor: '#fff'
  },
  listItem: {
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  check: {
    color: 'red'
  },
  separator: {
    height: 1,
    width: '100%',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1
  },
  textSize: {
    fontSize: 16
  }
})

export default Team
