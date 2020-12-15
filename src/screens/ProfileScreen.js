import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Image, FlatList } from 'react-native'
import { AppContainer } from '../components/UI/wrappers/AppContainer'
import { AppTextBlack } from '../components/UI/texts/AppTextBlack'
import { THEME } from '../theme'
import { AppTextButton } from '../components/UI/buttons/AppTextButton'
import { Song } from '../components/Song'
import { Playlist } from '../components/Playlist'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUser } from '../store/actions/user.action'
import { AppLoader } from '../components/UI/loaders/AppLoader'
import placeholder from '../../assets/avatar-placeholder.png'

export const ProfileScreen = () => {
  const { name, avatar, songs, playlists, loading } = useSelector(
    state => state.user
  )
  const [isSongs, setIsSongs] = useState(true)

  return (
    <AppContainer>
      {loading ? (
        <AppLoader />
      ) : (
        <>
          <Image style={styles.avatar} source={avatar ? { uri: avatar } : placeholder} />
          <AppTextBlack style={styles.name}>{name}</AppTextBlack>
          <View style={styles.tabs}>
            <AppTextButton
              color={isSongs ? THEME.MAIN_COLOR : THEME.SECOND_COLOR}
              onPress={() => setIsSongs(true)}
              style={styles.tab}
            >
              Songs
            </AppTextButton>
            <AppTextButton
              color={!isSongs ? THEME.MAIN_COLOR : THEME.SECOND_COLOR}
              onPress={() => setIsSongs(false)}
              style={styles.tab}
            >
              Playlists
            </AppTextButton>
          </View>
          {isSongs ? (
            <FlatList
              style={styles.list}
              data={songs}
              keyExtractor={item => item.toString()}
              renderItem={({ item }) => <Song>{item}</Song>}
            />
          ) : (
            <FlatList
              style={styles.list}
              data={playlists}
              keyExtractor={item => item.url}
              renderItem={({ item }) => <Playlist image={item.url} />}
            />
          )}
        </>
      )}
    </AppContainer>
  )
}

const styles = StyleSheet.create({
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 150,
    alignSelf: 'center'
  },
  name: {
    alignSelf: 'center',
    color: '#fff',
    fontSize: 24,
    marginVertical: 15
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderBottomColor: THEME.SECOND_COLOR,
    borderBottomWidth: 1,
    paddingBottom: 5
  },
  tab: {
    fontSize: 18
  }
})
