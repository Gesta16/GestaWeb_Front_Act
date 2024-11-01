import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../Services/auth.service';



@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const expectedRoles = route.data['expectedRoles'] as Array<string>;
    const currentUser = this.authService.currentUserValue;

    if (!currentUser) {
      // Usuario no autenticado, redirigir al login
      this.router.navigate(['/login']);
      return false;
    }

    const userRole = currentUser.rol.nombre_rol;
    
    if (expectedRoles.includes(userRole)) {
      // El rol del usuario está dentro de los roles permitidos
      return true;
    } else {
      // Rol no autorizado, redirigir o mostrar mensaje
      this.router.navigate(['/home']);
      return false;
    }
  }
}
