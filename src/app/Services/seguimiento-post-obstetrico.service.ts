import { Injectable } from '@angular/core';
import { environment } from '../../environment/env';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { SeguimientoPostObstetrico } from '../Models/Seguimiento-post-obstetrico.model';

@Injectable({
  providedIn: 'root'
})
export class SeguimientoPostObstetricoService {

  private apiUrl = environment.apiUrl +'seguimiento-post-obstetrico'; 

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

  getSeguimientos(): Observable<{ estado: string; data: SeguimientoPostObstetrico[] }> {
    return this.http.get<{ estado: string; data: SeguimientoPostObstetrico[] }>(this.apiUrl, {headers:this.createHeaders()});
  }

  crearSeguimiento(seguimiento: SeguimientoPostObstetrico): Observable<any> {
    return this.http.post(this.apiUrl, seguimiento, {headers: this.createHeaders()});
  }

  getSeguimientobyId(id: number,num_proceso:number): Observable<{ estado: string; seguimiento: SeguimientoPostObstetrico }> {
    return this.http.get<{ estado: string; seguimiento: SeguimientoPostObstetrico }>(`${this.apiUrl}/${id}/${num_proceso}`, {headers:this.createHeaders()});
  }

  updateSeguimientoPostObstetrico(id: number, seguimiento: SeguimientoPostObstetrico): Observable<any>{
    return this.http.post(`${this.apiUrl}/${id}`, seguimiento, { headers: this.createHeaders() });
  }

  

}
