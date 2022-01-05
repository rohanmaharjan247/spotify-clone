import { environment } from './../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AlbumsService {
  constructor(private httpClient: HttpClient) {}

  getSavedAlbums(limit?: number) {
    const params = new HttpParams().set('limit', limit ?? '10');
    return this.httpClient.get(`${environment.apiUrl}/me/albums`, { params });
  }
}
