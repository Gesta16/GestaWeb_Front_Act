import { Injectable } from '@angular/core';
import { environment } from '../../environment/env';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { MetodoFracaso } from '../Models/Metodo-fracaso.model';

@Injectable({
  providedIn: 'root'
})
export class MetodoFracasoService {

  apiUrl = environment.apiUrl + 'metodo-fracaso';

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

  getMetodos(): Observable<{ estado: string; metodo: MetodoFracaso[] }> {
    return this.http.get<{ estado: string; metodo: MetodoFracaso[] }>(this.apiUrl, {headers:this.createHeaders()});
  }
}
