import React, { useEffect, useCallback } from 'react'
import { StyleSheet, FlatList, ScrollView, RefreshControl } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { Chat } from '../components/Chat'
import { AppContainer } from '../components/UI/wrappers/AppContainer'
import { AppInput } from '../components/UI/inputs/AppInput'
import { fetchUser, fetchChats } from '../store/actions'
import { THEME } from '../theme'

export const ChatsScreen = ({ navigation }) => {
  const dispatch = useDispatch()
  const userId = useSelector(state => state.user.id)
  const chats = useSelector(state => state.user.chats)
  const loading = useSelector(state => state.user.loading)

  useEffect(() => {
    dispatch(fetchUser())
    dispatch(fetchChats())
  }, [dispatch])

  const onRefresh = useCallback(() => {
    dispatch(fetchChats())
  }, [dispatch])

  const goToChat = (chatId, interlocutorId, name, avatar) => {
    navigation.navigate('Chat', { chatId, interlocutorId, name, avatar })
  }

  return (
    <AppContainer>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={onRefresh}
            tintColor={THEME.MAIN_COLOR}
          />
        }
      >
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
      </ScrollView>
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
