import { Injectable } from '@angular/core';
import { environment } from '../../environment/env';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { LaboratorioIIITrimestre } from '../Models/Laboratorio-3-trimestre.model';

@Injectable({
  providedIn: 'root'
})
export class LaboratorioiiisemestreService {

  private apiUrl = environment.apiUrl + 'laboratorio-tercer-semestre';

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

  getLaboratorioTercerSemestre(): Observable<{ estado: string; data: LaboratorioIIITrimestre[] }> {
    return this.http.get<{ estado: string; data: LaboratorioIIITrimestre[] }>(this.apiUrl, {headers:this.createHeaders()});
  }

  createLaboratorioTercerSemestre(consulta:LaboratorioIIITrimestre):Observable<any>{
    return this.http.post(this.apiUrl, consulta, { headers:this.createHeaders() });
  }

  getLaboratorioIIISemestrebyId(id: number,num_proceso:number): Observable<{ estado: string; data: LaboratorioIIITrimestre }> {
    return this.http.get<{ estado: string; data: LaboratorioIIITrimestre }>(`${this.apiUrl}/${id}/${num_proceso}`,{headers:this.createHeaders()});
  }

  updateLaboratorioIIISemestre(id:number, laboratorio:LaboratorioIIITrimestre):Observable<any>{
    return this.http.post(`${this.apiUrl}/${id}`, laboratorio, { headers: this.createHeaders() })
  }
}
