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

  logout() {
    this.authService.logout();
    this.menuService.setMenuVisible(false); // Oculta el menú
    this.router.navigate(['/login'])
  }
}
