import { Injectable } from '@angular/core';
import { environment } from '../../environment/env';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service'; 
import { Observable } from 'rxjs';
import { Nota } from '../Models/nota.model';  

@Injectable({
  providedIn: 'root'
})
export class NotasService {

  private apiUrl: string = environment.apiUrl + 'user-notes'; 

  constructor(
    private http: HttpClient,
    private authService: AuthService  
  ) { }

  private createHeaders(): HttpHeaders {
    const token = this.authService.getToken();  
    if (!token) {
      throw new Error('No se encontró el token de autenticación.');
    }

    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  createNota(nota: Nota): Observable<Nota> {
    return this.http.post<Nota>(this.apiUrl, nota, { headers: this.createHeaders() });
  }

  getNotasPorUsuario(): Observable<Nota[]> {
    return this.http.get<Nota[]>(this.apiUrl, { headers: this.createHeaders() });
  }

  eliminarNota(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, { headers: this.createHeaders() });
  }

  actualizarNota(id: number, nota: Nota): Observable<Nota> {
    return this.http.put<Nota>(`${this.apiUrl}/${id}`, nota, { headers: this.createHeaders() });
  }
}
