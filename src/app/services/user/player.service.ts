import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  constructor(private httpClient: HttpClient) { }

  getPlayerState(){
    return this.httpClient.get(`${environment.apiUrl}/me/player`);
  }

  getCurrentlyPlayingTrack(){
    return this.httpClient.get(`${environment.apiUrl}/me/player/currently-playing`);
  }
}
