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
import { updateMessages } from '../store/actions/chat.action'
import { socket } from '../utils/socket'
import { useFocusEffect } from '@react-navigation/native'

export const ChatScreen = ({ navigation, route }) => {
  const [chatId, setChatId] = useState(route.params.chatId)
  const [interlocutorId, setInterlocutorId] = useState(
    route.params.interlocutorId
  )
  const [name, setName] = useState(route.params.name)
  const [avatar, setAvatar] = useState(route.params.avatar)
  const [message, setMessage] = useState('')

  const dispatch = useDispatch()
  const insets = useSafeAreaInsets()
  const userId = useSelector(state => state.user.id)
  const m = useSelector(
    state => state.chat.chats.find(c => c._id === chatId).messages
  )
  const [messages, setMessages] = useState(m)

  useLayoutEffect(() => {
    navigation.setOptions({
      title: name,
      headerTitleAlign: 'center',
      headerTitleStyle: {
        color: '#fff'
      },
      headerStyle: {
        backgroundColor: THEME.BACKGROUND_COLOR,
        elevation: 0,
        shadowColor: 'transparent'
      },
      headerRight: () => (
        <Image
          style={styles.avatar}
          source={avatar ? { uri: avatar } : placeholder}
        />
      )
    })
  }, [])

  useLayoutEffect(() => {}, [])

  useFocusEffect(
    useCallback(() => {
      socket.emit('joinToChat', { chatId, userIds: [interlocutorId, userId] })
      return () => {
        socket.disconnect()
      }
    }, [])
  )

  useEffect(() => {
    socket.on('message', message => {
      console.log(message)
      dispatch(updateMessages(chatId, message))
    })
  }, [])

  const sendMessage = () => {
    if (message) {
      socket.emit(
        'sendMessage',
        {
          chatId,
          text: message,
          owner: userId,
          interlocutorId
        },
        () => setMessage('')
      )
    }
  }

  return (
    <>
      <AppContainer safe={false}>
        <FlatList
          data={messages}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item }) => {
            return (
              <Message
                text={item.text}
                to={item.owner === userId ? true : false}
              />
            )
          }}
        />
      </AppContainer>
      <View style={{ ...styles.form, paddingBottom: insets.bottom }}>
        <AppIconButton
          name={'ios-musical-notes'}
          size={40}
          color={THEME.MAIN_COLOR}
        />
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
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 50,
    marginRight: 20
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
