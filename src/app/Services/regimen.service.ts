import { Injectable } from '@angular/core';
import { environment } from '../../environment/env';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { Regimen } from '../Models/Regimen.model';

@Injectable({
  providedIn: 'root'
})
export class RegimenService {
  private apiUrl = environment.apiUrl +'regimen'; 

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

  getRegimenes(): Observable<{ estado: string; regimen: Regimen[] }> {
    return this.http.get<{ estado: string; regimen: Regimen[] }>(this.apiUrl,{headers:this.createHeaders()});
  }
}
