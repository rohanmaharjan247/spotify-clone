import { environment } from './../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  constructor(private httpClient: HttpClient) {}

  search(query: string, type?: string, limit?: number) {
    const params = new HttpParams()
      .set('q', query)
      .set('type', encodeURI(type ?? 'artist,track,album,playlist'))
      .set('limit', limit ?? 8);

    return this.httpClient.get(`${environment.apiUrl}/search`, { params });
  }
}
