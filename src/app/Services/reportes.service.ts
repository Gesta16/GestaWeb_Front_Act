import { Injectable } from '@angular/core';
import { environment } from '../../environment/env';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportesService {

  private apiUrl = environment.apiUrl;

  constructor(private http:HttpClient) { }

  filtrarReportes(filtros:any):Observable<any>{
    return this.http.post(`${this.apiUrl}filtrar-indicadores`,filtros,{responseType: 'blob',});
  }

  obtenerDatosFiltrados(idUsuario: number, categoriaId: string | null, subcategoriaId: string | null): Observable<{data: any}> {
    const params = {
      categoriaId: categoriaId || '',
      subcategoriaId: subcategoriaId || '',
    };
    return this.http.get<{data: any}>(`${this.apiUrl}ruta-gestacional/${idUsuario}`, { params });
  }

  descargarPdf(idUsuario: number, categoria: string | null, subcategoria: string | null): Observable<Blob> {
    const params = {
      categoria: categoria || '',
      subcategoria: subcategoria || '',
    };
    return this.http.get(`${this.apiUrl}ruta-gestacional/${idUsuario}/descargar-pdf`, {
      params,
      responseType: 'blob', // Indicar que la respuesta es un archivo binario
    });
  }
  
}
