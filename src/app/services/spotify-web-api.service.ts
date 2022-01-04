import { environment } from './../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SpotifyWebApiService {
  constructor(private httpClient: HttpClient) {}

  getCurrentUserPlaylist() {
    return this.httpClient.get(`${environment.apiUrl}/me/playlists`);
  }

  getCurrentUserProfile() {
    return this.httpClient.get(`${environment.apiUrl}/me`);
  }

  getUsersTopArtists(limit?: number) {
    const params = new HttpParams().set('limit', String(limit ?? '10'));
    return this.httpClient.get(`${environment.apiUrl}/me/top/artists`, {
      params,
    });
  }

  getUserTopTracks(limit?: number) {
    const params = new HttpParams().set('limit', String(limit ?? '10'));
    return this.httpClient.get(`${environment.apiUrl}/me/top/tracks`, {
      params,
    });
  }

  getFeaturedPlaylist(limit?: number) {
    const params = new HttpParams().set('limit', limit ?? 10);
    return this.httpClient.get(
      `${environment.apiUrl}/browse/featured-playlists`,
      { params }
    );
  }

  getNewReleases(limit?: number) {
    const params = new HttpParams().set('limit', limit ?? 10);
    return this.httpClient.get(`${environment.apiUrl}/browse/new-releases`, {
      params,
    });
  }

  getAvailableGenre() {
    return this.httpClient.get(
      `${environment.apiUrl}/recommendations/available-genre-seeds`
    );
  }

  getRecommendation(
    seed_track: string,
    seed_artists: string,
    seed_genres: string,
    limit?: number
  ) {
    const params = new HttpParams()
      .set('seed_tracks', encodeURI(seed_track))
      .set('seed_artists', encodeURI(seed_artists))
      .set('seed_genres', encodeURI(seed_genres))
      .set('limit', limit ?? 10);
    return this.httpClient.get(`${environment.apiUrl}/recommendations`, {
      params,
    });
  }
}
