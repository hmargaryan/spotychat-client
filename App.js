import { SafeAreaProvider } from 'react-native-safe-area-context'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Provider, useDispatch, useSelector } from 'react-redux'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { StatusBar } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import { AppLoading } from 'expo'
import { SettingsScreen } from './src/screens/SettingsScreen'
import { ProfileScreen } from './src/screens/ProfileScreen'
import { SearchScreen } from './src/screens/SearchScreen'
import { AuthScreen } from './src/screens/AuthScreen'
import { ChatScreen } from './src/screens/ChatScreen'

import { defineIcon } from './src/utils/defineIcon'
import { bootstrap } from './src/bootstrap'
import store from './src/store/store'
import { THEME } from './src/theme'
import { login } from './src/store/actions'

const App = () => {
  const [isReady, setIsReady] = useState(false)

  const Tab = createBottomTabNavigator()
  const Stack = createStackNavigator()

  const dispatch = useDispatch()
  const isAuth = useSelector(state => state.user.isAuth)

  useEffect(() => {
    dispatch(login())
  }, [])

  if (!isReady) {
    return (
      <AppLoading
        startAsync={bootstrap}
        onFinish={() => setIsReady(true)}
        onError={e => console.log(e)}
      />
    )
  }

  const HomeTabs = () => (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => (
          <Ionicons name={defineIcon(route.name)} size={size} color={color} />
        )
      })}
      tabBarOptions={{
        activeTintColor: THEME.MAIN_COLOR,
        inactiveTintColor: THEME.SECOND_COLOR,
        labelStyle: {
          fontFamily: 'Circular-Book'
        },
        style: {
          backgroundColor: THEME.BACKGROUND_COLOR,
          borderTopColor: THEME.SECOND_COLOR
        }
      }}
      initialRouteName={'Chat'}
    >
      <Tab.Screen name={'Profile'} component={ProfileScreen} />
      <Tab.Screen name={'Chat'} component={ChatScreen} />
      <Tab.Screen name={'Settings'} component={SettingsScreen} />
    </Tab.Navigator>
  )

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isAuth ? (
          <>
            <Stack.Screen
              name={'Home'}
              component={HomeTabs}
              options={{ headerShown: false }}
            />
            <Stack.Screen name={'Chat'} component={ChatScreen} />
            <Stack.Screen
              name={'Search'}
              component={SearchScreen}
              options={{ headerShown: false }}
            />
          </>
        ) : (
          <Stack.Screen
            name={'Auth'}
            component={AuthScreen}
            options={{ headerShown: false }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default () => {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <App />
        <StatusBar barStyle="light-content" />
      </SafeAreaProvider>
    </Provider>
  )
}
