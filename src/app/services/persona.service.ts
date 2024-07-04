import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Persona } from '../interfaces/persona';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  private apiUrl = 'http://localhost:5057/persona/';

  constructor(private http: HttpClient) { }

  getList(): Observable<Persona[]> {
    return this.http.get<Persona[]>(`${this.apiUrl}lista`);
  }

  add(modelo: Persona): Observable<Persona> {
    return this.http.post<Persona>(`${this.apiUrl}guardar`, modelo);
  }

  update(idPersona: number, modelo: Persona): Observable<Persona> {
    return this.http.put<Persona>(`${this.apiUrl}actualizar/${idPersona}`, modelo);
  }

  delete(idPersona: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}eliminar/${idPersona}`);
  }

}
