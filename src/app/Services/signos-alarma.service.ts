import { Injectable } from '@angular/core';
import { environment } from '../../environment/env';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { SignoAlarma } from '../Models/Signos-Alarma.model';


@Injectable({
  providedIn: 'root'
})
export class SignosAlarmaService {

  private apiUrl = environment.apiUrl;

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

  getSignosAlarma() {
    const headers = this.createHeaders();
    return this.http.get(`${this.apiUrl}signo-alarma`, { headers });
  }

  getSignosAlarmaById(id: number) {
    const headers = this.createHeaders();
    return this.http.get(`${this.apiUrl}signo-alarma/${id}`, { headers });
  }

  createSignoAlarma(signoAlarma: SignoAlarma) {
    const headers = this.createHeaders();
    return this.http.post(`${this.apiUrl}signo-alarma`, signoAlarma, { headers });
  }



}
