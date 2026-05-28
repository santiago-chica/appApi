import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cat, CatListQuery, CatQuery, CatQueryText } from '../interfaces/cat-api';

const API_URL = 'https://cataas.com';

@Injectable({
  providedIn: 'root',
})
export class CatService {

  constructor(private http: HttpClient) {}

  getCat(query: CatQuery): Observable<Cat> {
    return this.http.get<Cat>(`${API_URL}/cat`, { params: query as any });
  }

  getCatWithText(text: string, query: CatQueryText): Observable<Cat> {
    return this.http.get<Cat>(`${API_URL}/cat/says/${text}`, { params: query as any });
  }

  getCatById(id: string, query: CatQuery): Observable<Cat> {
    return this.http.get<Cat>(`${API_URL}/cat/${id}`, { params: query as any });
  }

  getCatByIdWithText(id: string, text: string, query: CatQueryText): Observable<Cat> {
    return this.http.get<Cat>(`${API_URL}/cat/${id}/says/${text}`, { params: query as any });
  }

  getCatByTag(tag: string, query: CatQuery): Observable<Cat> {
    return this.http.get<Cat>(`${API_URL}/cat/${tag}`, { params: query as any });
  }

  getCatByTagWithText(tag: string, text: string, query: CatQueryText): Observable<Cat> {
    return this.http.get<Cat>(`${API_URL}/cat/${tag}/says/${text}`, { params: query as any });
  }

  getCats(query: CatListQuery): Observable<Cat[]> {
    return this.http.get<Cat[]>(`${API_URL}/api/cats`, { params: query as any });
  }

  getTags(): Observable<string[]> {
    return this.http.get<string[]>(`${API_URL}/api/tags`);
  }
}
