import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environment/env';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { EstudioHipotiroidismo } from '../Models/Estudio-hipotiroidismo.model';

@Injectable({
  providedIn: 'root'
})
export class EstudioHipotiroidismoService {

  private apiUrl = environment.apiUrl +'estudios-hipotiroidismo'; 

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

  getEstudiosHipotiroidismo(): Observable<{ estado: string; data: EstudioHipotiroidismo[] }> {
    return this.http.get<{ estado: string; data: EstudioHipotiroidismo[] }>(this.apiUrl, {headers:this.createHeaders()});
  }

  crearEstudioHipotiroidismo(estudio: EstudioHipotiroidismo): Observable<any>{
    return this.http.post(this.apiUrl, estudio, {headers: this.createHeaders()});
  }

  getEstudioHipotiroidismobyId(id: number,num_proceso:number): Observable<{ estado: string; data: EstudioHipotiroidismo }> {
    return this.http.get<{ estado: string; data: EstudioHipotiroidismo }>(`${this.apiUrl}/${id}/${num_proceso}`, {headers:this.createHeaders()});
  }

  updateEstudioHipotiroidismo(id: number, estudio: EstudioHipotiroidismo): Observable<any>{
    return this.http.post(`${this.apiUrl}/${id}`, estudio, { headers: this.createHeaders() });
  }
}
