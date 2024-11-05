import { Injectable } from '@angular/core';
import { environment } from '../../environment/env';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Admin } from '../Models/Admin.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private apiUrl = environment.apiUrl +'admin'; 

  constructor(private http: HttpClient, private authService:AuthService) { }

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

  getAdmins(): Observable<{ estado: string; admin: Admin[] }> {
    return this.http.get<{ estado: string; admin: Admin[] }>(this.apiUrl, { headers: this.createHeaders() });
  }

  createAdmin(admin: any): Observable<any> {
    return this.http.post(this.apiUrl, admin,  { headers: this.createHeaders() });
  }
}
