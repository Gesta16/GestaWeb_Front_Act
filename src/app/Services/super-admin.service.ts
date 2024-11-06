import { Injectable } from '@angular/core';
import { environment } from '../../environment/env';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { SuperAdmin } from '../Models/Super-admin.model';

@Injectable({
  providedIn: 'root'
})
export class SuperAdminService {

  apiUrl = environment.apiUrl + 'superadmin';

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

  getSuperAdmins(): Observable<any> {
    return this.http.get(this.apiUrl, {headers: this.createHeaders()});
  }

  createSuperAdmin(superAdmin:SuperAdmin):Observable<any>{
    return this.http.post(this.apiUrl, superAdmin, {headers: this.createHeaders()})
  }

  updateSuperadmin(superAdmin: SuperAdmin, id: number):Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/${id}`, superAdmin, { headers: this.createHeaders() });
  }


}
