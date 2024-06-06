import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TvMazeService {
  private apiUrl = 'http://api.tvmaze.com/search/shows?q='

  constructor(private http: HttpClient) {}

  searchShows(query: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}${query}`)
  }
}
