import { Injectable } from '@angular/core';
import { environment } from '../../environment/env';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { Micronutriente } from '../Models/Micronutriente.model';

@Injectable({
  providedIn: 'root'
})
export class MicronutrientesService {

  private apiUrl = environment.apiUrl + 'micronutrientes';
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

  getMicronutrientes(): Observable<{ estado: string; data: Micronutriente[] }> {
    return this.http.get<{ estado: string; data: Micronutriente[] }>(this.apiUrl, {headers:this.createHeaders()});
  }

  crearMicronutriente(micronutriente: Micronutriente): Observable<any>{
    return this.http.post(this.apiUrl, micronutriente, {headers: this.createHeaders()});
  }

  getMicronutrientebyId(id: number,num_proceso:number): Observable<{ estado: string; micronutriente: Micronutriente }> {
    return this.http.get<{ estado: string; micronutriente: Micronutriente }>(`${this.apiUrl}/${id}/${num_proceso}`, {headers:this.createHeaders()});
  }

  updateMicronutriente(id:number, data: Micronutriente): Observable<any>{
    return this.http.post(`${this.apiUrl}/${id}`, data, { headers:this.createHeaders() });
  }
}
