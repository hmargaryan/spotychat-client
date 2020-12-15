import React, { useEffect } from 'react'
import { StyleSheet, FlatList, Alert } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { Chat } from '../components/Chat'
import { AppContainer } from '../components/UI/wrappers/AppContainer'
import { AppInput } from '../components/UI/inputs/AppInput'
import { AppLoader } from '../components/UI/loaders/AppLoader'
import { fetchChats, updateMessages } from '../store/actions/chat.action'
import { socket } from '../utils/socket'

export const ChatsScreen = ({ navigation }) => {
  const dispatch = useDispatch()
  const userId = useSelector(state => state.user.id)
  const chats = useSelector(state => state.chat.chats)
  const loading = useSelector(state => state.chat.loading)

  useEffect(() => {
    dispatch(fetchChats())
  }, [])

  useEffect(() => {
    if (userId) {
      socket.emit('joinToApp', { userId })
      return () => {
        socket.disconnect()
        socket.off()
      }
    }
  }, [userId])

  useEffect(() => {
    socket.on('userMessage', ({ text, owner, chatId }) => {
      dispatch(fetchChats())
    })
  }, [chats])

  const goToChat = (chatId, interlocutorId, name, avatar) => {
    navigation.navigate('Chat', { chatId, interlocutorId, name, avatar })
  }

  return (
    <AppContainer>
      {loading ? (
        <AppLoader />
      ) : (
        <>
          <AppInput style={styles.input} placeholder={'Search'} />
          <FlatList
            data={chats}
            keyExtractor={item => item._id}
            renderItem={({ item }) => {
              const { avatar, name, _id } = defineInterlocutor(userId, item)
              const lastMessage = item.messages[item.messages.length - 1].text
              return (
                <Chat
                  avatar={avatar}
                  name={name}
                  message={lastMessage}
                  onPress={() => goToChat(item._id, _id, name, avatar)}
                />
              )
            }}
          />
        </>
      )}
    </AppContainer>
  )
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    marginBottom: 30
  }
})

const defineInterlocutor = (id, chat) => {
  return chat.users.find(user => user._id !== id)
}
