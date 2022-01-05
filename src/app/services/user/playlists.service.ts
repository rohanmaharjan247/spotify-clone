import { environment } from './../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PlaylistsService {
  constructor(private httpClient: HttpClient) {}

  getUserPlaylists(limit?: number) {
    const params = new HttpParams().set('limit', limit ?? 10);
    return this.httpClient.get(`${environment.apiUrl}/me/playlists`, {
      params,
    });
  }

  getUserPlaylist(playlistId: string) {
    return this.httpClient.get(`${environment.apiUrl}/playlists/${playlistId}`);
  }

  getPlaylistTracks(playlistId: string) {
    return this.httpClient.get(
      `${environment.apiUrl}/playlists/${playlistId}/tracks`
    );
  }
}
