import { Injectable } from '@angular/core';
import { environment } from '../../environment/env';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Departamento } from '../Models/Departamento.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class DepartamentoService {

  private apiUrl = environment.apiUrl +'departamento'; 

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
  
  getDepartamentos(): Observable<{ estado: string; departamento: Departamento[] }> {
    return this.http.get<{ estado: string; departamento: Departamento[] }>(this.apiUrl,{headers:this.createHeaders()});
  }
}
