import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Genero } from '../interfaces/genero';

@Injectable({
  providedIn: 'root'
})
export class GeneroService {
  private apiUrl = 'http://localhost:5057/genero/';

  constructor(private http: HttpClient) { }

  getList(): Observable<Genero[]> {
    return this.http.get<Genero[]>(`${this.apiUrl}lista`);
  }

  /*getGenero(id: number): Observable<Genero> {
    return this.http.get<Genero>(`${this.apiUrl}/${id}`);
  }

  addGenero(genero: Genero): Observable<Genero> {
    return this.http.post<Genero>(this.apiUrl, genero);
  }

  updateGenero(id: number, genero: Genero): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, genero);
  }

  deleteGenero(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }*/
  
}
