import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environment/env';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = environment.apiUrl + 'auth/';
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private http: HttpClient) {
    const storedUser = JSON.parse(sessionStorage.getItem('currentUser') || 'null');
    this.currentUserSubject = new BehaviorSubject<any>(storedUser);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  login(credentials: { documento: string; password: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}login`, credentials).pipe(
      tap(response => {
        // Guarda el token y la información del usuario
        sessionStorage.setItem('token', response.access_token);
        sessionStorage.setItem('currentUser', JSON.stringify(response.user));
        this.currentUserSubject.next(response.user);
      })
    );
  }

  logout() {
    // Elimina los datos del usuario y del token
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    
  }

  isAuthenticated(): boolean {
    return !!sessionStorage.getItem('token');
  }

  // Obtener el rol actual del usuario
  getRole(): string | null {
    const currentUser = this.currentUserSubject.value;
    console.log('rol desde AuthService',currentUser.rol.nombre_rol);
    return currentUser ? currentUser.rol.nombre_rol : null;
  }

  getToken(): string | null {
    const token = sessionStorage.getItem('token');
    return token;
  }  

  getUser(){
    const identityJSON = sessionStorage.getItem('currentUser');
    return identityJSON ? JSON.parse(identityJSON) : null;
  }

}
