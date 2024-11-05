import { Injectable } from '@angular/core';
import { environment } from '../../environment/env';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TipoDocumento } from '../Models/Tipo-documento.model';

@Injectable({
  providedIn: 'root'
})
export class TipoDocumentoService {
  private apiUrl = environment.apiUrl +'documento'; // URL de tu API Laravel para Tipo de Documento

  constructor(private http: HttpClient) { }

  // Obtiene todos los tipos de documentos
  getTipoDocumentos(): Observable<{ estado: string; documento: TipoDocumento[] }> {
    return this.http.get<{ estado: string; documento: TipoDocumento[] }>(this.apiUrl);
  }
}
