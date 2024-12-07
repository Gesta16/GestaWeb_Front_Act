import { Injectable } from '@angular/core';
import { environment } from '../../environment/env';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardGestanteService {

  constructor(private http:HttpClient, private authService:AuthService) { }

  private apiUrl = environment.apiUrl;

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

  getEdadGestacion():Observable<any>{
    return this.http.get(this.apiUrl+'edadGestante',{headers:this.createHeaders()})
  }

  getConteoControles():Observable<any>{
    return this.http.get(this.apiUrl+'conteoControles', {headers:this.createHeaders()})
  }

  getSessionesCurso():Observable<any>{
    return this.http.get(this.apiUrl+'sessionesCurso',{headers:this.createHeaders()})
  }

  getFechaProbableParto():Observable<any>{
    return this.http.get(this.apiUrl+'fechaProbParto', {headers:this.createHeaders()})
  }

  getPesoyPresionGestante():Observable<any>{
    return this.http.get(this.apiUrl+'pesoYPresionGestante', {headers:this.createHeaders()})
  }

  getPresionGestante():Observable<any>{
    return this.http.get(this.apiUrl+'presionGestante', {headers:this.createHeaders()})
  }

  getVacuancionGestante():Observable<any>{
    return this.http.get(this.apiUrl+'vacunacionGestante', {headers:this.createHeaders()})
  }

  getVacunacionBebe():Observable<any>{
    return this.http.get(this.apiUrl+'vacunacionBebe', {headers:this.createHeaders()})
  }
}
