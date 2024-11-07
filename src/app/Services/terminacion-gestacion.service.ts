import { Injectable } from '@angular/core';
import { environment } from '../../environment/env';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { TerminacionGestacion } from '../Models/Teminacion-gestacion.model';

@Injectable({
  providedIn: 'root'
})
export class TerminacionGestacionService {

  private apiUrl = environment.apiUrl + 'terminacion-gestacion';

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

  getTerminacionGestacion(): Observable<{ estado: string; 'Terminacion gestacion': TerminacionGestacion[] }> {
    return this.http.get<{ estado: string; 'Terminacion gestacion': TerminacionGestacion[] }>(this.apiUrl, {headers:this.createHeaders()});
  }
}
