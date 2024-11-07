import { Injectable } from '@angular/core';
import { environment } from '../../environment/env';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { Biologico } from '../Models/Biologico.model';

@Injectable({
  providedIn: 'root'
})
export class BiologicoService {

  apiUrl = environment.apiUrl + 'biologico';

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

  getBiologicos(): Observable<{ estado: string; biologico: Biologico[] }> {
    return this.http.get<{ estado: string; biologico: Biologico[] }>(this.apiUrl, {headers:this.createHeaders()});
  }
  
}
