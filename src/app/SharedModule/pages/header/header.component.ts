import { Component } from '@angular/core';
import { AuthService } from '../../../Services/auth.service';
import { Router } from '@angular/router';
import { MenuService } from '../../../Services/menu.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  constructor(private authService: AuthService,
    private router: Router,
    private menuService: MenuService) { }

  showDropdown = false;
  roleName: string | null = 'Usuario';
  isExpanded = true;

  ngOnInit(): void {
    // Obtener el usuario desde sessionStorage
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser') || 'null');

    // Verificar si el usuario está presente y luego asignar el nombre del rol
    if (currentUser && currentUser.rol && currentUser.rol.nombre_rol) {
      this.roleName = currentUser.rol.nombre_rol;
    } else {
      this.roleName = 'Usuario'; // Default si no se encuentra el rol
    }
  }

  // Permite abrir el menú del perfil y cerrar sesión
  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  toggleSidebar() {
    this.isExpanded = !this.isExpanded;
    this.menuService.toggleExpansion();
  }

  logout() {
    this.authService.logout();
    this.menuService.setMenuVisible(false); // Oculta el menú
    this.router.navigate(['/login'])
  }
}
