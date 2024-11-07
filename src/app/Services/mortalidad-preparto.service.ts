import { Injectable } from '@angular/core';
import { environment } from '../../environment/env';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { MortalidadPreparto } from '../Models/Mortalidad-preparto.model';

@Injectable({
  providedIn: 'root'
})
export class MortalidadPrepartoService {

  private apiUrl = environment.apiUrl +'mortalidad-preparto'; 

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

  getMortalidadPreparto(): Observable<{ estado: string; data: MortalidadPreparto[] }> {
    return this.http.get<{ estado: string; data: MortalidadPreparto[] }>(this.apiUrl, {headers:this.createHeaders()});
  }

  crearMortalidadPreparto(mortalidadPreparto: MortalidadPreparto): Observable<any>{
    return this.http.post(this.apiUrl, mortalidadPreparto, {headers: this.createHeaders()});
  }

  getMortalidadPrepartobyId(id: number,num_proceso:number): Observable<{ estado: string; mortalidad: MortalidadPreparto }> {
    return this.http.get<{ estado: string; mortalidad: MortalidadPreparto }>(`${this.apiUrl}/${id}/${num_proceso}`, {headers:this.createHeaders()});
  }

  updateMortalidadPreparto(id: number, mortalidad: MortalidadPreparto): Observable<any>{
    return this.http.post(`${this.apiUrl}/${id}`, mortalidad, { headers: this.createHeaders() });
  }
}
