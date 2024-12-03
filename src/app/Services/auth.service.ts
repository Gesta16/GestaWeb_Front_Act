import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environment/env';
import { MenuService } from './menu.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = environment.apiUrl + 'auth/';
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private http: HttpClient, private menuService: MenuService) {
    const storedUser = JSON.parse(sessionStorage.getItem('currentUser') || 'null');
    this.currentUserSubject = new BehaviorSubject<any>(storedUser);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  // Verifica si los términos y condiciones han sido aceptados
  isTermsAccepted(): boolean {
    const currentUser = this.currentUserSubject.value;
    return currentUser && currentUser.userable.autorizacion !== 0;
  }

  login(credentials: { documento: string; password: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}login`, credentials).pipe(
      tap(response => {
        // Guarda el token y la información del usuario
        sessionStorage.setItem('token', response.access_token);
        sessionStorage.setItem('currentUser', JSON.stringify(response.user));
        this.currentUserSubject.next(response.user);

        // Verifica si el campo "autorizacion" dentro de "userable" es 0
        const autorizacion = response.user.userable.autorizacion;
        if (autorizacion === 0) {
          //alert('Debes aceptar los términos y condiciones para continuar');
        }

        this.menuService.setMenuState(true, true);
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
    //console.log('rol desde AuthService', currentUser.rol.nombre_rol);
    return currentUser ? currentUser.rol.nombre_rol : null;

  }

  getMarginTopForRole(): string {
    const role = this.getRole();
    const isMobile = this.checkIfMobile();
    switch (role) {
      case 'superadmin':
        return isMobile ? '40px' : '80px';
      case 'admin':
        return isMobile ? '40px' : '90px';
      case 'operador':
        return '70px';
      case 'usuario':
        return '100px';
      default:
        return '5px';
    }
  }

  // Método para determinar si es un dispositivo móvil
  checkIfMobile(): boolean {
    return window.innerWidth <= 768; // Tamaño de pantalla pequeña
  }

  getToken(): string | null {
    const token = sessionStorage.getItem('token');
    return token;
  }

  getUser() {
    const identityJSON = sessionStorage.getItem('currentUser');
    const currentUser = identityJSON ? JSON.parse(identityJSON) : null;
  
    //console.log('getUser - Current User:', currentUser);  // Agregamos el log para verificar el contenido
    return currentUser;
  }
  

}
