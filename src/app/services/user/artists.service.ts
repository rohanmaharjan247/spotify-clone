import { environment } from './../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ArtistsService {
  constructor(private httpClient: HttpClient) {}

  getFollowedArtists() {
    const params = new HttpParams().set('type', 'artist');
    return this.httpClient.get(`${environment.apiUrl}/me/following`, {
      params,
    });
  }

  getArtist(artistId: string) {
    return this.httpClient.get(`${environment.apiUrl}/artists/${artistId}`);
  }

  getArtistsAlbum(artistId: string, limit?: number) {
    const params = new HttpParams().set('limit', limit ?? 4);
    return this.httpClient.get(
      `${environment.apiUrl}/artists/${artistId}/albums`,
      { params }
    );
  }

  getArtistsTopTracks(artistId: string) {
    const params = new HttpParams().set('market', 'NP');
    return this.httpClient.get(
      `${environment.apiUrl}/artists/${artistId}/top-tracks`,
      { params }
    );
  }

  getRelatedArtists(artistId: string, limit?: number) {
    return this.httpClient.get(
      `${environment.apiUrl}/artists/${artistId}/related-artists`
    );
  }

  checkIfFollowingArtists(artistIds: string, type?: string){
    const params = new HttpParams().set('ids', artistIds).set('type', type ?? 'artist');

    return this.httpClient.get(`${environment.apiUrl}/me/following/contains`, { params });
  }
}
