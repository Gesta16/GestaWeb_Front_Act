import { Injectable } from '@angular/core';
import { environment } from '../../environment/env';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { MetodoAnticonceptivo } from '../Models/Metodo-anticonceptivo.model';

@Injectable({
  providedIn: 'root'
})
export class MetodoAnticonceptivoService {

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

  getMetodosAnticonceptivos(): Observable<{ estado: string; 'Metodo Anticonceptivo': MetodoAnticonceptivo[] }> {
    return this.http.get<{ estado: string; 'Metodo Anticonceptivo': MetodoAnticonceptivo[] }>(this.apiUrl, {headers:this.createHeaders()});
  }


}
