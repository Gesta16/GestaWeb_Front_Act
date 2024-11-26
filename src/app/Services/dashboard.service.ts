import { Injectable } from '@angular/core';
import { environment } from '../../environment/env';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

export interface Consulta {
  fecha: string;
  nombre_consulta: string;
}
export interface CalendarioResponse {
  estado: string;
  mensaje: string;
  data: Consulta[];
}
@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private authService: AuthService) { }

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


  getConteo(): Observable<any> {
    return this.http.get(`${this.apiUrl}conteo`, { headers: this.createHeaders() });
  }

  getProporcionTamizajeSifilis(): Observable<any> {
    return this.http.get(this.apiUrl + 'tamizaje-sifilis', { headers: this.createHeaders() });
  }

  getCoverageData(role: string, cod_ips: number): Observable<any> {
    const params = { role: role, cod_ips: cod_ips };
    return this.http.get(`${this.apiUrl}seguimientos-comple`, { headers: this.createHeaders(), params })
  }

  getNeonatalMortalityRate(role: string, cod_ips: number): Observable<any> {
    const params = { role: role, cod_ips: cod_ips };
    return this.http.get(`${this.apiUrl}mortalidad-neonatalTemp`, { headers: this.createHeaders(), params })
  }

  getIveProportion(role: string, cod_ips: number): Observable<any> {
    const params = { role: role, cod_ips: cod_ips };
    return this.http.get(`${this.apiUrl}consultas-ive`, { headers: this.createHeaders(), params })
  }

  getCalendarioUsuario(): Observable<CalendarioResponse> {
    return this.http.get<CalendarioResponse>(`${this.apiUrl}calendario-usuario`, { headers:this.createHeaders() })
  }

}
