import { Injectable } from '@angular/core';
import { environment } from '../../environment/env';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { SeguimientoComplementario } from '../Models/Seguimiento-complementario.model';

@Injectable({
  providedIn: 'root'
})
export class SeguimientoComplementarioService {

  private apiUrl = environment.apiUrl + 'seguimientos-complementarios';
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

  getSeguimientosComplementario(): Observable<{ estado: string; data: SeguimientoComplementario[] }> {
    return this.http.get<{ estado: string; data: SeguimientoComplementario[] }>(this.apiUrl, {headers:this.createHeaders()});
  }

  crearSeguimientoComplementario(seguimiento: SeguimientoComplementario):Observable<any>{
    return this.http.post(this.apiUrl, seguimiento, {headers: this.createHeaders()});
  }

  getSeguimientoComplementariobyId(id: number,num_proceso:number): Observable<{ estado: string; seguimiento: SeguimientoComplementario }> {
    return this.http.get<{ estado: string; seguimiento: SeguimientoComplementario }>(`${this.apiUrl}/${id}/${num_proceso}`, {headers:this.createHeaders()});
  }

  updateSeguimientoComplementario(id:number, data: SeguimientoComplementario): Observable<any> {
    return this.http.post(`${this.apiUrl}/${id}`, data, { headers: this.createHeaders() });
  }
}
