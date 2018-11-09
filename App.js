import React from 'react'
import { Provider } from 'react-redux'
import {
  createBottomTabNavigator,
  createStackNavigator
} from 'react-navigation'
import store from './src/state/store'
import StagesContainer from './src/containers/StagesContainer'
import TaskDetailsContainer from './src/containers/TaskDetailsContainer'
import ChooseMemberContainer from './src/containers/ChooseMemberContainer'
import ChooseStageContainer from './src/containers/ChooseStageContainer'
import TeamContainer from './src/containers/TeamContainer'
import MemberDetailsContainer from './src/containers/MemberDetailsContainer'
import MoveTaskContextProvider from './src/state/context/MoveTaskContextProvider'
import { Text } from 'react-native'

const StagesStack = createStackNavigator(
  {
    Stages: StagesContainer,
    TaskDetails: TaskDetailsContainer,
    ChooseMember: ChooseMemberContainer,
    ChooseStage: ChooseStageContainer
  },
  {
    title: 'Details',
    mode: 'modal'
  }
)

const TeamStack = createStackNavigator({
  Team: TeamContainer,
  MemberDetails: MemberDetailsContainer
})

const RootNav = createBottomTabNavigator(
  {
    Stages: { screen: StagesStack },
    Team: TeamStack
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state
        let iconText
        if (routeName === 'Stages') {
          iconText = '🗄'
        } else if (routeName === 'Team') {
          iconText = '🧔'
        }

        // You can return any component that you like here! We usually use an
        // icon component from react-native-vector-icons
        return <Text>{iconText}</Text>
      }
    }),
    tabBarOptions: {
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray'
    }
  }
)

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <MoveTaskContextProvider>
          <RootNav />
        </MoveTaskContextProvider>
      </Provider>
    )
  }
}
export default App
