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
    return this.http.post(`${this.apiUrl}filtrar-indicadores`,filtros);
  }
}
