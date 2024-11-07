import { Injectable } from '@angular/core';
import { environment } from '../../environment/env';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MortalidadPerinatal } from '../Models/Mortalidad-perinatal.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class MortalidadPerinatalService {

  private apiUrl = environment.apiUrl +'mortalidad-perinatal'; 

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

  getMortalidadPerinatal(): Observable<{ estado: string; 'Mortalidad Perinatal': MortalidadPerinatal[] }> {
    return this.http.get<{ estado: string; 'Mortalidad Perinatal': MortalidadPerinatal[] }>(this.apiUrl, {headers:this.createHeaders()});
  }
}
