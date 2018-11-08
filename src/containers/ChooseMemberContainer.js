// eslint-disable-next-line no-unused-vars
import React from 'react'
import { connect } from 'react-redux'
import SelectList from '../components/SelectList'
import { delegateTask } from '../state/actions/tasksActions'

class ChooseMemberContainer extends React.Component {
  static navigationOptions = {
    title: 'Delegate'
  }

  render() {
    const { memberID, taskID, members, delegateTask, navigation } = this.props

    const handleSelect = id => {
      delegateTask({ taskID, memberID: id })
      navigation.goBack()
    }
    return (
      <SelectList data={members} value={memberID} onSelect={handleSelect} />
    )
  }
}

function mapStateToProps(state, ownProps) {
  const memberID = ownProps.navigation.getParam('memberID', '')
  const taskID = ownProps.navigation.getParam('taskID', '')
  return {
    memberID,
    taskID,
    members: [{ name: 'Not delegated', surname: '' }, ...state.members].map(
      m => ({
        id: m.id,
        label: `${m.name} ${m.surname}`
      })
    )
  }
}

const mapDispatchToProps = {
  delegateTask
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChooseMemberContainer)
