import React from 'react'
import { connect } from 'react-redux'
import { addToStage, removeFromStage } from '../state/actions/stageActions'
import SelectList from '../components/SelectList'

class ChooseStageContainer extends React.Component {
  static navigationOptions = {
    title: 'Choose stage'
  }

  render() {
    const {
      taskID,
      stageID,
      stages,
      navigation,
      addToStage,
      removeFromStage
    } = this.props

    const handleSelect = id => {
      removeFromStage({ id: taskID })
      addToStage({ id: taskID, stageID: id })
      navigation.goBack()
    }
    return <SelectList data={stages} value={stageID} onSelect={handleSelect} />
  }
}

const mapStateToProps = (state, ownProps) => {
  const taskID = ownProps.navigation.getParam('taskID')
  const stageID = ownProps.navigation.getParam('stageID')

  return {
    taskID,
    stageID,
    stages: state.stages.map(stage => ({ id: stage.id, label: stage.title }))
  }
}

const mapDispatchToProps = {
  addToStage,
  removeFromStage
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChooseStageContainer)
