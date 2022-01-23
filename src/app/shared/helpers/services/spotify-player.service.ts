import { Injectable } from '@angular/core';

declare global{
  interface Window{
    onSpotifyWebPlaybackSDKReady: any;
    Spotify: any;
  }
}

@Injectable({
  providedIn: 'root'
})
export class SpotifyPlayerService {

  constructor() { }

  async initialize() {
    const player = await this.initializeWepPlayer();
    const token = `Bearer ${localStorage.getItem('authToken')}`;
    const volume = 1;
    const spotifyPlayer = new player.Player({
      name: 'Spotify Clone Player - Angular',
      getOAuthToken: (cb) => {
        cb(token);
      },
      volume,
    });

    return spotifyPlayer;
  }

  private initializeWepPlayer(): Promise<any> {
    window.onSpotifyWebPlaybackSDKReady = () => {};

    return new Promise((resolve) => {
      if (window.Spotify) {
        resolve(window.Spotify);
      } else {
        window.onSpotifyWebPlaybackSDKReady = () => {
          resolve(window.Spotify);
        };
      }
    });
  }
}
