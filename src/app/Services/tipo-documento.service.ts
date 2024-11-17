import { Injectable } from '@angular/core';
import { environment } from '../../environment/env';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TipoDocumento } from '../Models/Tipo-documento.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TipoDocumentoService {
  private apiUrl = environment.apiUrl +'documento'; // URL de tu API Laravel para Tipo de Documento

  constructor(private http: HttpClient, private authService:AuthService) { }

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

  // Obtiene todos los tipos de documentos
  getTipoDocumentos(): Observable<{ estado: string; documento: TipoDocumento[] }> {
    return this.http.get<{ estado: string; documento: TipoDocumento[] }>(this.apiUrl, {headers:this.createHeaders()});
  }
}
