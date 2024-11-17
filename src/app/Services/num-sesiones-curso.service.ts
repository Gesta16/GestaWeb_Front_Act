import { Injectable } from '@angular/core';
import { environment } from '../../environment/env';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { NumSesionesCurso } from '../Models/Num-secciones-curso.model';

@Injectable({
  providedIn: 'root'
})
export class NumSesionesCursoService {

  private apiUrl = environment.apiUrl + 'sesiones-cpm';
  constructor(private http: HttpClient, private authService: AuthService) { }

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

  getNumSesionesCurso(): Observable<{ estado: string; 'Sesiones_Curso': NumSesionesCurso[] }> {
    return this.http.get<{ estado: string; 'Sesiones_Curso': NumSesionesCurso[] }>(this.apiUrl, {headers:this.createHeaders()});
  }
}
