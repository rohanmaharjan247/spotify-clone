import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SPOTIFYAPI } from './constants/spotify-api';

@Injectable({
  providedIn: 'root',
})
export class HelpersService {
  constructor(private platform: Platform) {}

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
}
