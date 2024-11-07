import { Injectable } from '@angular/core';
import { environment } from '../../environment/env';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { DatosRecienNacido } from '../Models/Datos-recien-nacido.model';

@Injectable({
  providedIn: 'root'
})
export class DatosRecienNacidoService {

  private apiUrl = environment.apiUrl +'datos-recien-nacido'; 

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

  getDatosRecienNacido(): Observable<{ estado: string; data: DatosRecienNacido[] }> {
    return this.http.get<{ estado: string; data: DatosRecienNacido[] }>(this.apiUrl);
  }

  crearDatosRecienNacido(datosRecienNacido: DatosRecienNacido): Observable<any>{
    return this.http.post(this.apiUrl, datosRecienNacido, {headers:this.createHeaders()});
  }

  getDatosRecienNacidobyId(id: number,num_proceso: number): Observable<{ estado: string; data: DatosRecienNacido }> {
    return this.http.get<{ estado: string; data: DatosRecienNacido }>(`${this.apiUrl}/${id}/${num_proceso}`,{headers:this.createHeaders()});
  }

  updateDatosRecienNacido(id: number, datosRecienNacido: DatosRecienNacido): Observable<any>{
    return this.http.post(`${this.apiUrl}/${id}`, datosRecienNacido, { headers:this.createHeaders() });
  }
}
