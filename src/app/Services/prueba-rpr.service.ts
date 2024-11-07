import { Injectable } from '@angular/core';
import { environment } from '../../environment/env';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { PruebaRPR } from '../Models/Prueba-RPR.model';

@Injectable({
  providedIn: 'root'
})
export class PruebaRprService {

  private apiUrl = environment.apiUrl +'prueba-no-treponemica-RPR'; // URL de tu API Laravel para Tipo de Documento

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

  getPruebaRPR(): Observable<{ estado: string; 'Prueba no Treponemica RPR': PruebaRPR[] }> {
    return this.http.get<{ estado: string; 'Prueba no Treponemica RPR': PruebaRPR[] }>(this.apiUrl,{headers: this.createHeaders()});
  }
}
