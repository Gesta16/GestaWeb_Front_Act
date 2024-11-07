import { Injectable } from '@angular/core';
import { environment } from '../../environment/env';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { DiagnosticoNutricional } from '../Models/Diagnostico-nutricional.model';

@Injectable({
  providedIn: 'root'
})
export class DiagnosticoNutricionalService {

  private apiUrl = environment.apiUrl + 'diagnostico-nutricional-mes';
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

  getDiagnosticosNutricionales(): Observable<{ estado: string; 'diagnostico': DiagnosticoNutricional[] }> {
    return this.http.get<{ estado: string; 'diagnostico': DiagnosticoNutricional[] }>(this.apiUrl, {headers: this.createHeaders()});
  }
}
