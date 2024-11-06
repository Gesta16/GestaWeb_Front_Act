import { Injectable } from '@angular/core';
import { environment } from '../../environment/env';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { Operador } from '../Models/Operador.model';

@Injectable({
  providedIn: 'root'
})
export class OperadorService {

  private apiUrl = environment.apiUrl +'operador'; 

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


  getOperadores(): Observable<any> {
    return this.http.get(this.apiUrl, {headers: this.createHeaders()});
  }

  createOperador(operador:Operador):Observable<any>{
    return this.http.post(this.apiUrl, operador, { headers: this.createHeaders() });
  }

}
