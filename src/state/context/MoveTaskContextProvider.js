import React from 'react'
import store from '../store'
import { swapTasks } from '../actions/stageActions'
const MoveTaskContext = React.createContext()

export function moveTask(Component) {
  return function MoveTask(props) {
    return (
      <MoveTaskContext.Consumer>
        {context => <Component {...props} moveTaskContext={context} />}
      </MoveTaskContext.Consumer>
    )
  }
}

class MoveTaskContextProvider extends React.Component {
  state = {
    tasksMoving: false,
    fromTaskID: null,
    toTaskID: null,
    fromStageID: null,
    toStageID: null
  }

  startMove = ({ taskID, stageID }) => {
    this.setState({
      tasksMoving: true,
      fromTaskID: taskID,
      fromStageID: stageID
    })
  }

  endMove = ({ taskID, stageID }) => {
    this.setState(
      {
        tasksMoving: false,
        toTaskID: taskID,
        toStageID: stageID
      },
      () => {
        if (this.state.toTaskID !== this.state.fromTaskID)
          store.dispatch(swapTasks({ ...this.state }))
      }
    )
  }

  render() {
    return (
      <MoveTaskContext.Provider
        value={{
          ...this.state,
          startMove: this.startMove,
          endMove: this.endMove
        }}
      >
        {this.props.children}
      </MoveTaskContext.Provider>
    )
  }
}

export default MoveTaskContextProvider
