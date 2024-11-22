import { Injectable } from '@angular/core';
import { environment } from '../../environment/env';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private apiUrl = environment.apiUrl;

  constructor(private http:HttpClient, private authService:AuthService) { }

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


  getConteo(): Observable<any> {
    return this.http.get(`${this.apiUrl}conteo`, { headers: this.createHeaders() });
  }

  getProporcionTamizajeSifilis():Observable<any>{
    return this.http.get(this.apiUrl+'tamizaje-sifilis', {headers: this.createHeaders()});
  }
}
