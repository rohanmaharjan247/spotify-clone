import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlaylistsService {

  constructor(private httpClient: HttpClient) { }

  getUserPlaylist(playlistId: string){
    return this.httpClient.get(`${environment.apiUrl}/playlists/${playlistId}`)
  }

  getPlaylistTracks(playlistId: string){
    return this.httpClient.get(`${environment.apiUrl}/playlists/${playlistId}/tracks`)
  }
}
