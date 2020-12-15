import { makeRedirectUri } from 'expo-auth-session'

export default {
  API_ENDPOINT: 'http://localhost:5000',
  DISCOVERY: {
    authorizationEndpoint: 'https://accounts.spotify.com/authorize',
    tokenEndpoint: 'https://accounts.spotify.com/api/token'
  },
  AUTH_REQUEST_CONFIG: {
    clientId: 'f60fd30aa7ec4bc79aef6db51eafbbb3',
    scopes: [
      'user-read-recently-played',
      'ugc-image-upload',
      'user-read-playback-position',
      'user-top-read',
      'playlist-modify-private',
      'playlist-read-collaborative',
      'playlist-read-private',
      'playlist-modify-public',
      'streaming',
      'app-remote-control',
      'user-read-email',
      'user-read-private',
      'user-follow-read',
      'user-follow-modify',
      'user-library-modify',
      'user-library-read',
      'user-read-currently-playing',
      'user-read-playback-state',
      'user-modify-playback-state'
    ],
    usePKCE: false,
    redirectUri: makeRedirectUri({ native: 'exp://127.0.0.1:19000' })
  }
}
