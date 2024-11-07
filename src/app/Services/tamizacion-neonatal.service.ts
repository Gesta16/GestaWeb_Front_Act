import { Injectable } from '@angular/core';
import { environment } from '../../environment/env';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { TamizacionNeonatal } from '../Models/Tamizacion-neonatal.model';

@Injectable({
  providedIn: 'root'
})
export class TamizacionNeonatalService {

  private apiUrl = environment.apiUrl +'tamizaciones-neonatales'; 

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

  getTamizaciones(): Observable<{ estado: string; data: TamizacionNeonatal[] }> {
    return this.http.get<{ estado: string; data: TamizacionNeonatal[] }>(this.apiUrl, {headers:this.createHeaders()});
  }

  crearTamizacion(tamizacion: TamizacionNeonatal): Observable<any> {
    return this.http.post(this.apiUrl, tamizacion, {headers:this.createHeaders()});
  }

  getTamizacionbyId(id: number,num_proceso: number): Observable<{ estado: string; data: TamizacionNeonatal }> {
    return this.http.get<{ estado: string; data: TamizacionNeonatal }>(`${this.apiUrl}/${id}/${num_proceso}`, {headers:this.createHeaders()});
  }

  updateTamizacion(id: number, tamizacion: TamizacionNeonatal): Observable<any> {
    return this.http.post(`${this.apiUrl}/${id}`, tamizacion, { headers: this.createHeaders() });
  }
}
