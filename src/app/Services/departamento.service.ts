import { Injectable } from '@angular/core';
import { environment } from '../../environment/env';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Departamento } from '../Models/Departamento.model';

@Injectable({
  providedIn: 'root'
})
export class DepartamentoService {

  private apiUrl = environment.apiUrl +'departamento'; 

  constructor(private http: HttpClient) { }

  
  getDepartamentos(): Observable<{ estado: string; departamento: Departamento[] }> {
    return this.http.get<{ estado: string; departamento: Departamento[] }>(this.apiUrl);
  }
}
