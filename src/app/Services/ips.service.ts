import { Injectable } from '@angular/core';
import { environment } from '../../environment/env';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ips } from '../Models/Ips.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class IpsService {

  private apiUrl = environment.apiUrl + 'ips'; 

  constructor(private http: HttpClient, private authService: AuthService) { }

  /* Crea y devuelve un objeto HttpHeaders con el token de acceso y el tipo de contenido */
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
  
  getIps(): Observable<{ estado: string; ips: Ips[] }> {
    return this.http.get<{ estado: string; ips: Ips[] }>(this.apiUrl, { headers: this.createHeaders() });
  }

  createIps(ips: Ips): Observable<Ips> {
    return this.http.post<Ips>(this.apiUrl, ips, { headers: this.createHeaders() });
  }

  updateIps(ips: Ips): Observable<Ips> {
    return this.http.post<Ips>(`${this.apiUrl}/${ips.cod_ips}`, ips, { headers: this.createHeaders() });
  }
}
