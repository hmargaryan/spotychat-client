import { makeRedirectUri } from 'expo-auth-session'

export default {
  API_ENDPOINT: 'http://spotychat-server.std-927.ist.mospolytech.ru',
  DISCOVERY: {
    authorizationEndpoint: 'https://accounts.spotify.com/authorize',
    tokenEndpoint: 'https://accounts.spotify.com/api/token'
  },
  AUTH_REQUEST_CONFIG: {
    clientId: 'f60fd30aa7ec4bc79aef6db51eafbbb3',
    scopes: [
      'playlist-read-collaborative',
      'playlist-read-private',
      'user-read-email',
      'user-read-private',
      'user-library-read',
      'user-read-playback-state'
    ],
    usePKCE: false,
    redirectUri: makeRedirectUri({ native: 'exp://127.0.0.1:19000' })
  }
}
