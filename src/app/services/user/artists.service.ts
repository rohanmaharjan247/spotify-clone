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
}
