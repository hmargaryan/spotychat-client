import React, { useLayoutEffect, useEffect, useState, useCallback } from 'react'
import { View, StyleSheet, Image, FlatList } from 'react-native'
import { AppContainer } from '../components/UI/wrappers/AppContainer'
import { AppIconButton } from '../components/UI/buttons/AppIconButton'
import { AppInput } from '../components/UI/inputs/AppInput'
import { Message } from '../components/Message'
import { THEME } from '../theme'
import placeholder from '../../assets/avatar-placeholder.png'
import { useDispatch, useSelector } from 'react-redux'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import io from 'socket.io-client'
import { fetchUser } from '../store/actions'
let socket

export const ChatScreen = ({ navigation, route }) => {
  // const [chatId, setChatId] = useState(route.params.chatId)
  // const [interlocutorId, setInterlocutorId] = useState(
  //   route.params.interlocutorId
  // )
  // const [name, setName] = useState(route.params.name)
  // const [avatar, setAvatar] = useState(route.params.avatar)
  const [message, setMessage] = useState('')
  const dispatch = useDispatch()
  // const insets = useSafeAreaInsets()
  const name = useSelector(state => state.user.name)
  const [messages, setMessages] = useState([])

  useEffect(() => {
    dispatch(fetchUser())
    socket = io('https://spotychat.herokuapp.com')
    socket.emit('join')
    socket.on('msgToClient', message => {
      setMessages(prev => [...prev, message])
    })
    return () => {
      socket.disconnect()
    }
  }, [])

  // useEffect(() => {
  //   socket.on('message', message => {
  //     console.log(message)
  //     dispatch(updateMessages(chatId, message))
  //   })
  // }, [])

  const sendMessage = () => {
    if (message) {
      socket.emit(
        'msgToServer',
        {
          text: message,
          name
        },
        () => setMessage('')
      )
    }
  }
  return (
    <>
      <AppContainer safe={false} style={styles.container}>
        <FlatList
          data={messages}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item }) => {
            return <Message text={item.text} to={item.name === name} />
          }}
        />
      </AppContainer>
      <View style={{ ...styles.form }}>
        <AppInput
          style={styles.input}
          value={message}
          onChangeText={setMessage}
        />
        <AppIconButton
          name={'ios-send'}
          size={40}
          color={THEME.SECOND_COLOR}
          onPress={sendMessage}
        />
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50
  },
  form: {
    borderTopColor: THEME.SECOND_COLOR,
    borderTopWidth: 1,
    backgroundColor: THEME.BACKGROUND_COLOR,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10
  },
  input: {
    height: 40,
    flexShrink: 1,
    flexGrow: 1,
    marginHorizontal: 10,
    overflow: 'scroll'
  }
})
