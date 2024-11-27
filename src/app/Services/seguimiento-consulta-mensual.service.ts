import { Injectable } from '@angular/core';
import { environment } from '../../environment/env';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { SeguimientoConsultaMensual } from '../Models/Seguimiento-consulta-mensual.model';

@Injectable({
  providedIn: 'root'
})
export class SeguimientoConsultaMensualService {

  private apiUrl = environment.apiUrl + 'seguimiento-consulta-mensual';

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

  getSeguimientosConsulta(): Observable<{ estado: string; data: SeguimientoConsultaMensual[] }> {
    return this.http.get<{  estado: string; data: SeguimientoConsultaMensual[] }>(this.apiUrl, {headers:this.createHeaders()});
  }

  crearSeguimientoConsulta(seguimiento:SeguimientoConsultaMensual):Observable<any>{
    return this.http.post(this.apiUrl, seguimiento,{headers:this.createHeaders()});
  }

  getSeguimientoConsultabyId(id: number,num_proceso:number): Observable<{ estado: string; seguimiento: SeguimientoConsultaMensual }> {
    return this.http.get<{ estado: string; seguimiento: SeguimientoConsultaMensual }>(`${this.apiUrl}/${id}/${num_proceso}`, {headers:this.createHeaders()});
  }

  updateSeguimientoConsulta(id:number, data: SeguimientoConsultaMensual):Observable<any>{
    return this.http.post(`${this.apiUrl}/${id}`, data, { headers:this.createHeaders() });
  }

  getSeguimientosMensuales(idUsuario: number): Observable<any> {
    const params = idUsuario ? { id_usuario: idUsuario } : {};
    return this.http.get<any>(`${environment.apiUrl}seguimientos-mensuales`, { headers:this.createHeaders(),params });
  }
  
}
