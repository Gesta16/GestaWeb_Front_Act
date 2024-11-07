import { Injectable } from '@angular/core';
import { environment } from '../../environment/env';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { Antibiograma } from '../Models/Antibiograma.model';

@Injectable({
  providedIn: 'root'
})
export class AntibiogramaService {

  private apiUrl = environment.apiUrl + 'antibiograma';

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

  getAntibiogramas(): Observable<{ estado: string; antibiograma: Antibiograma[] }> {
    return this.http.get<{ estado: string; antibiograma: Antibiograma[] }>(this.apiUrl, {headers: this.createHeaders()});
  }
}
