import { Injectable } from '@angular/core';
import { environment } from '../../environment/env';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { FinalizacionGestacion } from '../Models/Finalizacion-gestacion.model';

@Injectable({
  providedIn: 'root'
})
export class FinalizacionGestacionService {

  private apiUrl = environment.apiUrl + 'finalizacion-gestacion';

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


  getFinalizacionGestacion(): Observable<{ estado: string; 'Finalizacion Gestacion': FinalizacionGestacion[] }> {
    return this.http.get<{ estado: string; 'Finalizacion Gestacion': FinalizacionGestacion[] }>(this.apiUrl,{headers:this.createHeaders()});
  }

  crearFinalizacionGestacion(finalizacion: FinalizacionGestacion): Observable<any> {
    return this.http.post(this.apiUrl, finalizacion, {headers:this.createHeaders()});
  }

  getFinalizacionGestacionbyId(id: number,num_proceso:number): Observable<{ estado: string; finalizacion: FinalizacionGestacion }> {
    return this.http.get<{ estado: string; finalizacion: FinalizacionGestacion }>(`${this.apiUrl}/${id}/${num_proceso}`, {headers:this.createHeaders()});
  }

  updateFinalizacionGestacion(id: number, finalizacion: FinalizacionGestacion): Observable<any>{
    return this.http.post(`${this.apiUrl}/${id}`, finalizacion, { headers: this.createHeaders() });
  }
}
