import { Injectable } from '@angular/core';
import { environment } from '../../environment/env';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { Its } from '../Models/Its.model';

@Injectable({
  providedIn: 'root'
})
export class ItsService {

  apiUrl = environment.apiUrl + 'its';

  constructor(private http: HttpClient, private authService: AuthService ) { }


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

  getIts(): Observable<{ estado: string; data: Its[] }> {
    return this.http.get<{ estado: string; data: Its[] }>(this.apiUrl, {headers: this.createHeaders()});
  }

  createIts(its: Its):Observable<any>{
    return this.http.post(this.apiUrl, its, { headers: this.createHeaders() });
  }

  getItsId(id: number,num_proceso:number): Observable<{ estado: string; data: Its }> {
    return this.http.get<{ estado: string; data: Its }>(`${this.apiUrl}/${id}/${num_proceso}`,{headers: this.createHeaders()});
  }

  updateIts(id:number, its:Its):Observable<any>{
    return this.http.post(`${this.apiUrl}/${id}`, its, { headers: this.createHeaders() });
  }
}
