export const SPOTIFYAPI ={
  SPOTIFY_API_URL: 'https://accounts.spotify.com/authorize',
  CLIENTID: '1904a6671c9e4773b4c3afc5c522a6d6',
  SCOPES: [
     //Listening History
     'user-read-recently-played',
     'user-top-read',
     'user-read-playback-position',
     //Spotify Connect
     'user-read-playback-state',
     'user-modify-playback-state',
     'user-read-currently-playing',
     //Playback - For SDK Playback //https://developer.spotify.com/documentation/web-playback-sdk/quick-start/
     'streaming',
     //Playlists
     'playlist-modify-public',
     'playlist-modify-private',
     'playlist-read-private',
     'playlist-read-collaborative',
     //Library
     'user-library-modify',
     'user-library-read',
     //Users - For SDK Playback //https://developer.spotify.com/documentation/web-playback-sdk/quick-start/
     'user-read-email',
     'user-read-private'
  ]
}

