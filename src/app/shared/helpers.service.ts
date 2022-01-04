import { Title } from '@angular/platform-browser';
import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SPOTIFYAPI } from './constants/spotify-api';

@Injectable({
  providedIn: 'root',
})
export class HelpersService {
  constructor(private platform: Platform, private title: Title) {}

  createAuthorizeUrl() {
    const params = new URLSearchParams({
      client_id: SPOTIFYAPI.CLIENTID,
      redirect_uri: `${window.location.origin}/login`,
      scope: encodeURIComponent(SPOTIFYAPI.SCOPES.join(',')),
      response_type: 'token',
    });

    return `${SPOTIFYAPI.SPOTIFY_API_URL}?${params.toString()}`;
  }

  isAuthenticated(){
    return localStorage.getItem('authToken') !== null;
  }

  getPlatform(
    platform:
      | 'ipad'
      | 'iphone'
      | 'ios'
      | 'android'
      | 'phablet'
      | 'tablet'
      | 'cordova'
      | 'capacitor'
      | 'electron'
      | 'pwa'
      | 'mobile'
      | 'mobileweb'
      | 'desktop'
      | 'hybrid'
  ) {
    return this.platform.is(platform);
  }

  artistsName(artists: any) {
    let artistName = '';
    if (artists?.length > 1) {
      artists.forEach((element, index) => {
        if(index === 0){
          artistName += `${element.name} (Feat.`
        }
        else if(index === artists.length - 1){
          artistName += `${element.name})`;
        }
        else{
          artistName += `${element.name}, `;
        }
      });
      return artistName;
    }
    return artists[0].name;
  }

  setTitle(title: string){
    this.title.setTitle(`${title} - Spotify Clone`);
  }
}
