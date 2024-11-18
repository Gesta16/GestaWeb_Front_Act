import { Injectable } from '@angular/core';
import { environment } from '../../environment/env';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { Usuario } from '../Models/Usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  apiUrl = environment.apiUrl + 'usuario';

  constructor(private http: HttpClient, private authService: AuthService) { }

  private createHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    if(!token){
      throw new Error('No se encontró el token de autenticación.');
    }
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    })
  }

  getUsuarios(): Observable<{ estado: string; usuario: Usuario[] }> {
    return this.http.get<{ estado: string; usuario: Usuario[] }>(this.apiUrl, {headers: this.createHeaders()});
  }

  createUsuario(usuario:Usuario):Observable<any>{
    return this.http.post(this.apiUrl,usuario,{headers:this.createHeaders()})
  }

  crearProcesoGestativo(usuarioId:number):Observable<any>{
    return this.http.post(`${this.apiUrl}/nuevo-proceso/${usuarioId}`,{},{headers:this.createHeaders()})
  }

  contarProcesosGestativos(usuarioId:number):Observable<any>{
    return this.http.get(`${this.apiUrl}/contar-procesos/${usuarioId}`,{headers:this.createHeaders()})
  }

  getUsuarioById(id: number): Observable<{ estado: string; usuario: Usuario }> {
    return this.http.get<{ estado: string; usuario: Usuario }>(`${this.apiUrl}/${id}`, {headers:this.createHeaders()});
  }

  updateUsuario(id:number, usuario:Usuario):Observable<any>{
    return this.http.post(`${this.apiUrl}/${id}`, usuario, { headers:this.createHeaders() })
  }
}
