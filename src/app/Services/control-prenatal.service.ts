import { Injectable } from '@angular/core';
import { environment } from '../../environment/env';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { ControlPrenatal } from '../Models/Control-prenatal.model';

@Injectable({
  providedIn: 'root'
})
export class ControlPrenatalService {

  apiUrl = environment.apiUrl + 'control-prenatal';

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

  getControles(): Observable<{ estado: string; controles: ControlPrenatal[] }> {
    return this.http.get<{ estado: string; controles: ControlPrenatal[] }>(this.apiUrl, {headers:this.createHeaders()});
  }

  createControl(control:ControlPrenatal):Observable<any>{
    return this.http.post(this.apiUrl, control, { headers: this.createHeaders() });
  }

  getControlById(id: number,num_proceso:number): Observable<{ estado: string; Control: ControlPrenatal }> {
    return this.http.get<{ estado: string; Control: ControlPrenatal }>(`${this.apiUrl}/${id}/${num_proceso}`,{headers:this.createHeaders()});
  }

  updateControlPrenatal(id:number, control:ControlPrenatal):Observable<any>{
    return this.http.post(`${this.apiUrl}/${id}`, control, { headers:this.createHeaders() });
  }

}
