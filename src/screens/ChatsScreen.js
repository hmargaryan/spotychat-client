import React, { useEffect } from 'react'
import { StyleSheet, FlatList } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { Chat } from '../components/Chat'
import { AppContainer } from '../components/UI/wrappers/AppContainer'
import { fetchUser } from '../store/actions'

export const ChatsScreen = ({ navigation }) => {
  const dispatch = useDispatch()
  const userId = useSelector(state => state.user.id)
  const chats = useSelector(state => state.user.chats)
  const loading = useSelector(state => state.user.loading)

  useEffect(() => {
    dispatch(fetchUser())
  }, [dispatch])

  const goToChat = (chatId, interlocutorId, name, avatar) => {
    navigation.navigate('Chat', { chatId, interlocutorId, name, avatar })
  }

  return (
    <AppContainer>
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
