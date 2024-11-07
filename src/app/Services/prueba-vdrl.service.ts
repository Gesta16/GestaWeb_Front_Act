import { Injectable } from '@angular/core';
import { environment } from '../../environment/env';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { PruebaVDRL } from '../Models/Prueba-VDRL.model';

@Injectable({
  providedIn: 'root'
})
export class PruebaVdrlService {

  private apiUrl = environment.apiUrl + 'prueba-no-treponemica-VDRL';
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

  getPruebaVDRL(): Observable<{ estado: string; 'Prueba No Treponemica VDRL': PruebaVDRL[] }> {
    return this.http.get<{ estado: string; 'Prueba No Treponemica VDRL': PruebaVDRL[] }>(this.apiUrl, {headers:this.createHeaders()});
  }
}
