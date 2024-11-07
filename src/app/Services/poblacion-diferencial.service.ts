import { Injectable } from '@angular/core';
import { environment } from '../../environment/env';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { PoblacionDiferencial } from '../Models/Poblacion-diferencial.model';

@Injectable({
  providedIn: 'root'
})
export class PoblacionDiferencialService {

  apiUrl = environment.apiUrl + 'poblacion-diferencial';

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

  getPoblacionDiferencial(): Observable<{ estado: string; poblacion: PoblacionDiferencial[] }> {
    return this.http.get<{ estado: string; poblacion: PoblacionDiferencial[] }>(this.apiUrl, {headers: this.createHeaders()});
  }

}
