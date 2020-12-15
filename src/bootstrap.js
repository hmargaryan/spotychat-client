import * as Font from 'expo-font'

export const bootstrap = async () => {
  await Font.loadAsync({
    'Circular-Book': require('../assets/fonts/CircularStd-Book.ttf'),
    'Circular-Medium': require('../assets/fonts/CircularStd-Medium.ttf'),
    'Circular-Bold': require('../assets/fonts/CircularStd-Bold.ttf'),
    'Circular-Black': require('../assets/fonts/CircularStd-Black.ttf')
  })
}