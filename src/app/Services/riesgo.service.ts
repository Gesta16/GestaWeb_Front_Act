import { Injectable } from '@angular/core';
import { environment } from '../../environment/env';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { Riesgo } from '../Models/Riesgo.model';

@Injectable({
  providedIn: 'root'
})
export class RiesgoService {

  private apiUrl = environment.apiUrl +'riesgo'; 
  constructor(private http:HttpClient, private authService:AuthService) { }

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

  getRiesgos(): Observable<{ estado: string; riesgo: Riesgo[] }> {
    return this.http.get<{ estado: string; riesgo: Riesgo[] }>(this.apiUrl, {headers:this.createHeaders()});
  }
}
