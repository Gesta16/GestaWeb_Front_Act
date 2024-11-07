import { Injectable } from '@angular/core';
import { environment } from '../../environment/env';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { LaboratorioIITrimestre } from '../Models/Laboratorio-2-trimestre.model';

@Injectable({
  providedIn: 'root'
})
export class LaboratorioiisemestreService {

  private apiUrl = environment.apiUrl + 'laboratorio-segundo-semestre';
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

  getLaboratorioSegundoSemestre(): Observable<{ estado: string; data: LaboratorioIITrimestre[] }> {
    return this.http.get<{ estado: string; data: LaboratorioIITrimestre[] }>(this.apiUrl, {headers:this.createHeaders()});
  }

  createLaboratorioSegundoSemestre(laboratorio:LaboratorioIITrimestre):Observable<any>{
    return this.http.post(this.apiUrl, laboratorio, { headers:this.createHeaders() })
  }

  getLaboratorioIISemestrebyId(id:number,  num_proceso:number ): Observable<any>{
    return this.http.get<{ estado: string; data: LaboratorioIITrimestre }>(`${this.apiUrl}/${id}/${num_proceso}`, {headers:this.createHeaders()});
  }

  updateLaboratorioIISemestre(id:number, laboratorio:LaboratorioIITrimestre):Observable<any>{
    return this.http.post(`${this.apiUrl}/${id}`, laboratorio, { headers: this.createHeaders() });
  }


}
