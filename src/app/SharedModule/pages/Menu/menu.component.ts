import { Component, HostListener } from '@angular/core';
import { MenuService } from '../../../Services/menu.service';
import { AuthService } from '../../../Services/auth.service';
import { Subscription } from 'rxjs';
import { Routes } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {

  menuItems: Routes = [];
  userRole: string | null = null;
  isAuthenticated: boolean = false;
  isVisible = true;
  isExpanded = true;
  isMobile: boolean = false;
  private authSubscription: Subscription | undefined;

  constructor(
    private menuService: MenuService, // Inyección del servicio
    private authService: AuthService //  Inyección del servicio para traer el rol del usuario
  ) { }

  ngOnInit(): void {
    this.isAuthenticated = this.authService.isAuthenticated();
    this.authService.currentUser.subscribe(user => {
      if (user) {
        this.userRole = this.authService.getRole();
        if (this.userRole) {
          this.isAuthenticated = this.authService.isAuthenticated();
          this.menuItems = this.menuService.getMenuItemsForRole(this.userRole);
          console.log('Elementos del menú cargados:', this.menuItems);
        }
      } else {
        console.log('Usuario no autenticado');
      }
    });
    // Suscribirse a cambios en el usuario para actualizar el menú dinámicamente
    this.authSubscription = this.authService.currentUser.subscribe(user => {
      this.userRole = user ? user.rol.nombre_rol : null;

    });

  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.isMobile = this.checkIfMobile();
  }

  toggleVisibility() {
    this.isVisible = !this.isVisible;
    this.menuService.setMenuVisible(this.isVisible);
  }

  toggleSidebar() {
    this.isExpanded = !this.isExpanded;
    this.menuService.toggleExpansion();
  }


  logout(): void {
    this.authService.logout();
  }

  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  checkIfMobile(): boolean {
    if (typeof window !== 'undefined') {
      return window.innerWidth <= 768;
    }
    return false; // Valor por defecto si no se puede acceder a window
  }

}
