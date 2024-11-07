import { Injectable } from '@angular/core';
import { environment } from '../../environment/env';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { FormaMedicion } from '../Models/Forma-medicion.model';

@Injectable({
  providedIn: 'root'
})
export class FormaMedicionService {

  private apiUrl = environment.apiUrl + 'forma-medicion-edad-gestacional';

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

  getFormasMedicion(): Observable<{ estado: string; 'Forma_Medicion': FormaMedicion[] }> {
    return this.http.get<{ estado: string; 'Forma_Medicion': FormaMedicion[] }>(this.apiUrl, {headers:this.createHeaders()});
  }
}
