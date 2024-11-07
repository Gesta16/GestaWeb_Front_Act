import { Injectable } from '@angular/core';
import { environment } from '../../environment/env';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { LaboratorioITrimestre } from '../Models/Laboratorio-1-trimestre.model';

@Injectable({
  providedIn: 'root'
})
export class LaboratorioisemestreService {

  private apiUrl = environment.apiUrl + 'laboratorio-primer-semestre';
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

  getLaboratorioPrimerSemestre(): Observable<{ estado: string; data: LaboratorioITrimestre[] }> {
    return this.http.get<{ estado: string; data: LaboratorioITrimestre[] }>(this.apiUrl, {headers: this.createHeaders()});
  }

  createLaboratorioPrimerSemestre(laboratorio:LaboratorioITrimestre):Observable<any>{
    return this.http.post(this.apiUrl, laboratorio, { headers: this.createHeaders() });
  }

  getLaboratorioISemestrebyId(id: number,num_proceso:number): Observable<{ estado: string; data: LaboratorioITrimestre }> {
    return this.http.get<{ estado: string; data: LaboratorioITrimestre }>(`${this.apiUrl}/${id}/${num_proceso}`, {headers:this.createHeaders()});
  }

  updateLaboratorioISemestre(id:number, laboratorio:LaboratorioITrimestre):Observable<any>{
    return this.http.post(`${this.apiUrl}/${id}`, laboratorio, { headers: this.createHeaders() });
  }
 

  
  
}
