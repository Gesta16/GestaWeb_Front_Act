import { Injectable } from '@angular/core';
import { environment } from '../../environment/env';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { Hemoclasificacion } from '../Models/Hemoclasificacion.model';

@Injectable({
  providedIn: 'root'
})
export class HemoclasificacionService {

  private apiUrl = environment.apiUrl + 'hemoclasificacion';

  constructor(private http: HttpClient, private authService:AuthService) { }

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

  getHemoclasificaciones(): Observable<{ estado: string; Hemoclasificacion: Hemoclasificacion[] }> {
    return this.http.get<{ estado: string; Hemoclasificacion: Hemoclasificacion[] }>(this.apiUrl, {headers: this.createHeaders()});
  }
}
