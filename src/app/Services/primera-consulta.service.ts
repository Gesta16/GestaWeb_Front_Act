import { Injectable } from '@angular/core';
import { environment } from '../../environment/env';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { PrimeraConsulta } from '../Models/Primera-consulta.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PrimeraConsultaService {

  apiUrl = environment.apiUrl + 'primera-consulta';

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

  getConsultas(): Observable<{ estado: string; consultas: PrimeraConsulta[] }> {
    return this.http.get<{ estado: string; consultas: PrimeraConsulta[] }>(this.apiUrl, {headers:this.createHeaders()});
  }

  createConsulta(consulta:PrimeraConsulta):Observable<any>{
    return this.http.post(this.apiUrl, consulta, { headers:this.createHeaders() });
  }

  getPrimeraConsulta(id: number,num_proceso: number): Observable<{ estado: string; consulta: PrimeraConsulta }> {
    return this.http.get<{ estado: string; consulta: PrimeraConsulta }>(`${this.apiUrl}/${id}/${num_proceso}`);
  }

  updatePrimeraConsulta(id:number, consulta:PrimeraConsulta):Observable<any>{
    return this.http.post(`${this.apiUrl}/${id}`, consulta, { headers:this.createHeaders() });
  }
}
