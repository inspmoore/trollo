import { createStore, applyMiddleware, compose } from 'redux'
import reducers from './reducers/'
import * as actionTypes from '../constants/actionTypes'
import { swapTasks, swapStages } from './actions/stageActions'
import * as storage from 'redux-storage'
import createEngine from 'redux-storage-engine-reactnativeasyncstorage'

const reducer = storage.reducer(reducers)
const persistanceEngine = createEngine('@Trollo:state')

const swapTasksMiddleware = store => next => action => {
  next(action)
  if (action.type === actionTypes.END_MOVE) {
    store.dispatch({ type: 'START_SWAP' })
  }
  if (action.type === 'START_SWAP') {
    const {
      fromTaskID,
      toTaskID,
      fromStageID,
      toStageID
    } = store.getState().tasksMove
    store.dispatch(swapTasks({ fromTaskID, toTaskID, fromStageID, toStageID }))
  }
}

const swapStagesMiddleware = store => next => action => {
  next(action)
  if (action.type === actionTypes.END_STAGE_MOVE) {
    store.dispatch({ type: 'START_STAGE_SWAP' })
  }
  if (action.type === 'START_STAGE_SWAP') {
    const { fromStageID, toStageID } = store.getState().stagesMove
    store.dispatch(swapStages({ fromStageID, toStageID }))
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const persistanceMiddleware = storage.createMiddleware(persistanceEngine)

const store = createStore(
  reducer,
  composeEnhancers(
    applyMiddleware(
      swapTasksMiddleware,
      swapStagesMiddleware,
      persistanceMiddleware
    )
  )
)

const load = storage.createLoader(persistanceEngine)
load(store)

export default store
