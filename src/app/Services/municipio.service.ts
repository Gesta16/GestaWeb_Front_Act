import { Injectable } from '@angular/core';
import { environment } from '../../environment/env';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Municipio } from '../Models/Municipio.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class MunicipioService {

  private apiUrl = environment.apiUrl +'municipio'; 

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

  
  getMunicipios(cod_departamento?: number): Observable<{ estado: string; Municipios: Municipio[] }> {
    if (cod_departamento) {
      return this.http.get<{ estado: string; Municipios: Municipio[] }>(`${this.apiUrl}/${cod_departamento}`,{headers:this.createHeaders()});
    } else {
      return this.http.get<{ estado: string; Municipios: Municipio[] }>(this.apiUrl, {headers:this.createHeaders()});
    }
  }
}
