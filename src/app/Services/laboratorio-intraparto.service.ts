import { Injectable } from '@angular/core';
import { environment } from '../../environment/env';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { LaboratorioIntraparto } from '../Models/Laboratorio-intraparto.model';

@Injectable({
  providedIn: 'root'
})
export class LaboratorioIntrapartoService {

  private apiUrl = environment.apiUrl +'laboratorio-intraparto'; 

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

  getLaboratorios(): Observable<{ estado: string; data: LaboratorioIntraparto[] }> {
    return this.http.get<{ estado: string; data: LaboratorioIntraparto[] }>(this.apiUrl, {headers:this.createHeaders()});
  }

  crearLaboratorio(laboratorio: LaboratorioIntraparto): Observable<any>{
    return this.http.post(this.apiUrl, laboratorio, {headers: this.createHeaders()});
  }

  getLaboratoriobyId(id: number,num_proceso:number): Observable<{ estado: string; data: LaboratorioIntraparto }> {
    return this.http.get<{ estado: string; data: LaboratorioIntraparto }>(`${this.apiUrl}/${id}/${num_proceso}`, {headers:this.createHeaders()});
  }

  updateLaboratorioIntraparto(id: number, laboratorio: LaboratorioIntraparto): Observable<any>{
    return this.http.post(`${this.apiUrl}/${id}`, laboratorio, { headers: this.createHeaders() });
  }
}
