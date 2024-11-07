import { Injectable } from '@angular/core';
import { environment } from '../../environment/env';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { RutaPYMS } from '../Models/Ruta-pyms.model';

@Injectable({
  providedIn: 'root'
})
export class RutaPymsService {

  private apiUrl = environment.apiUrl +'rutas-pyms'; 

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

  getRutas(): Observable<{ estado: string; data: RutaPYMS[] }> {
    return this.http.get<{ estado: string; data: RutaPYMS[] }>(this.apiUrl, {headers:this.createHeaders()});
  }

  crearRuta(ruta: RutaPYMS): Observable<any> {
    return this.http.post(this.apiUrl, ruta, {headers:this.createHeaders()});
  }

  getRutaPymsId(id: number,num_proceso:number): Observable<{ estado: string; data: RutaPYMS }> {
    return this.http.get<{ estado: string; data: RutaPYMS }>(`${this.apiUrl}/${id}/${num_proceso}`, {headers:this.createHeaders()});
  }

  updateRuta(id: number, ruta: RutaPYMS): Observable<any> {
    return this.http.post(`${this.apiUrl}/${id}`, ruta, { headers:this.createHeaders() });
  }
}
