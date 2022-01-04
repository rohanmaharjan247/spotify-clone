export const SPOTIFYAPI = {
  CLIENTID: '<YOUR CLIENT ID HERE>',
  SCOPES: [
    //Images
    'ugc-image-upload',
    //Spotify Connect
    'user-read-playback-state',
    'user-modify-playback-state',
    'user-read-currently-playing',
    //Users,
    'user-read-private',
    'user-read-email',
    //Follow
    'user-follow-modify',
    'user-follow-read',
    //Library
    'user-library-modify',
    'user-library-read',
    //Playback
    'streaming',
    'app-remote-control',
    //Listening History
    'user-read-playback-position',
    'user-top-read',
    'user-read-recently-played',
    //Playlists
    'playlist-modify-private',
    'playlist-read-collaborative',
    'playlist-read-private',
    'playlist-modify-public',
  ],
  SPOTIFY_API_URL: 'https://accounts.spotify.com/authorize',
};
