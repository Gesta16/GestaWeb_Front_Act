import { Injectable } from '@angular/core';
import { environment } from '../../environment/env';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { NumeroControl } from '../Models/Numero-control.model';

@Injectable({
  providedIn: 'root'
})
export class NumeroControlService {

  private apiUrl = environment.apiUrl + 'numero-controles';

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


  getNumerosControl(): Observable<{ estado: string; 'numero_controles': NumeroControl[] }> {
    return this.http.get<{ estado: string; 'numero_controles': NumeroControl[] }>(this.apiUrl, {headers:this.createHeaders()});
  } 
}
