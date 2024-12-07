import { Injectable } from '@angular/core';
import { environment } from '../../environment/env';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ImportExcelService {

  private apiUrl = environment.apiUrl + 'importar-excel'; 

  constructor(private http: HttpClient, private authService: AuthService) { }

  /* Crea y devuelve un objeto HttpHeaders con el token de acceso y el tipo de contenido */
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

  importExcel(excel: File, operador: string){
    const impExcel = new FormData;
    impExcel.append('excel', excel);
    impExcel.append('operador', operador);
    return this.http.post(this.apiUrl, impExcel);
  }
}
