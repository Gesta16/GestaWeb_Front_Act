import { Injectable } from '@angular/core';
import { environment } from '../../environment/env';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportesService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  filtrarReportes(filtros: any): Observable<any> {
    return this.http.post(`${this.apiUrl}filtrar-indicadores`, filtros, { responseType: 'blob', });
  }

  obtenerDatosFiltrados(idUsuario: number, categoriaId: string | null, subcategoriaId: string | null): Observable<{ data: any }> {
    const params = {
      categoriaId: categoriaId || '',
      subcategoriaId: subcategoriaId || '',
    };
    return this.http.get<{ data: any }>(`${this.apiUrl}ruta-gestacional/${idUsuario}`, { params });
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

  generarReporteUnificado(idUsuario: number): Observable<Blob> {
    return this.http.get(`${this.apiUrl}generar-reporte-unificado/${idUsuario}`, {
      responseType: 'blob', // Indicar que la respuesta es un archivo binario
    });
  }

  getCategorias(): Observable<any> {
    return this.http.get(`${this.apiUrl}traerCategorias`);
  }

  getSubcategorias(tabla: string): Observable<any> {
    return this.http.get(`${this.apiUrl}traerSubCategorias`, {
      params: { tabla: tabla } // ¡Enviar el parámetro "tabla"!
    });
  }

  generarReporteDinamico(filtros: any): Observable<Blob> {
    // Corregir la estructura del payload
    const payload = {
      tablas: filtros.tablas,
      campos: filtros.campos,
      fecha_inicio: filtros.fecha_inicio,
      fecha_fin: filtros.fecha_fin,
      formato: filtros.formato
    };

    return this.http.post(`${this.apiUrl}generarReporte`, payload, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      responseType: 'blob'
    });
  }

}
