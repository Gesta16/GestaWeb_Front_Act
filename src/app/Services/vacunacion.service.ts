import { Injectable } from '@angular/core';
import { environment } from '../../environment/env';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { Vacunacion } from '../Models/Vacunacion.model';

@Injectable({
  providedIn: 'root'
})
export class VacunacionService {

  apiUrl = environment.apiUrl + 'vacunacion';
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

  getVacunaciones(): Observable<{ estado: string; vacunaciones: Vacunacion[] }> {
    return this.http.get<{ estado: string; vacunaciones: Vacunacion[] }>(this.apiUrl, {headers: this.createHeaders()});
  }

  createVacunacion(vacunacion:Vacunacion):Observable<any>{
    return this.http.post(this.apiUrl, vacunacion, { headers:this.createHeaders() });
  }

  
  getVacunacionById(id: number): Observable<{ estado: string; vacunacion: Vacunacion }> {
    return this.http.get<{ estado: string; vacunacion: Vacunacion }>(`${this.apiUrl}/${id}`, {headers:this.createHeaders()});
  }

  updateVacunacion(id:number, vacunacion:Vacunacion):Observable<any>{
    return this.http.put(`${this.apiUrl}/${id}`, vacunacion, { headers: this.createHeaders() })
  }

}
