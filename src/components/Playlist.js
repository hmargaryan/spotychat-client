import React from 'react'
import { StyleSheet, Image } from 'react-native'
import { Dimensions } from 'react-native'

export const Playlist = ({ image }) => {
  return <Image style={styles.image} source={{ uri: image }} />
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: Dimensions.get('window').width - 40,
    resizeMode: 'contain',
    marginTop: 20
  }
})
