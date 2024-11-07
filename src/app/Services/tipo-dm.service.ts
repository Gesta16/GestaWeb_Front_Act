import { Injectable } from '@angular/core';
import { environment } from '../../environment/env';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { TipoDm } from '../Models/Tipo-dm.model';

@Injectable({
  providedIn: 'root'
})
export class TipoDmService {

  private apiUrl = environment.apiUrl +'tipo-dm'; 

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


  getTipos(): Observable<{ estado: string; tipos: TipoDm[] }> {
    return this.http.get<{ estado: string; tipos: TipoDm[] }>(this.apiUrl, {headers:this.createHeaders()});
  }
}
