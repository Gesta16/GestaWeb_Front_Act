import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SharedModuleRoutingModule } from '../SharedModule/shared-routing.module';
import { Routes } from '@angular/router';
import { GestantesRoutingModule } from '../Gestantes/gestantes-routing.module';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private roleRoutes = {
    superadmin: SharedModuleRoutingModule.getRoutes(),
    admin: SharedModuleRoutingModule.getRoutes(),
    operador: SharedModuleRoutingModule.getRoutes(),
    usuario: GestantesRoutingModule.getRoutes(),
  };

  constructor() { }

  getMenuItemsForRole(role: string): any[] {
    const routes = this.roleRoutes[role] || [];
    // Función para aplanar la estructura de rutas con rutas anidadas
    function flattenRoutes(routes: Routes): Routes {
      return routes.reduce((acc: Routes, route) => {
        if (route.path !== '' || route.component) { // Ignorar rutas contenedoras sin componente
          acc.push(route);
        }
        if (route.children) {
          acc = acc.concat(flattenRoutes(route.children));
        }
        return acc;
      }, []);
    }


    const flatRoutes = flattenRoutes(routes);
    //console.log('Rutas aplanadas:', flatRoutes);

    // Filtrar y mapear las rutas basadas en los roles y `showInMenu`
    return flatRoutes
      .filter(route => {
        const expectedRoles = route.data?.['expectedRoles'];
        const showInMenu = route.data?.['showInMenu'] !== false; // Considerar solo las que tienen `showInMenu` como true o undefined
        return showInMenu && (!expectedRoles || expectedRoles.includes(role));
      })
      .map(route => ({
        path: route.path,
        title: route.data?.['title'] || 'Sin título',
        icon: route.data?.['icon'] || 'fa-solid fa-question'
      }));
  }



  private isExpandedSubject = new BehaviorSubject<boolean>(true); // Estado inicial de expansión
  isExpanded$ = this.isExpandedSubject.asObservable();

  private menuVisibleSubject = new BehaviorSubject<boolean>(true); // Estado inicial de visibilidad
  menuVisible$ = this.menuVisibleSubject.asObservable();

  // Método para cambiar solo el estado de expansión
  toggleExpansion() {
    this.isExpandedSubject.next(!this.isExpandedSubject.value);
  }

  // Método para cambiar solo la visibilidad del menú
  setMenuVisible(visible: boolean) {
    this.menuVisibleSubject.next(visible);
  }

  // Método para ajustar ambos estados, si es necesario
  setMenuState(isExpanded: boolean, isVisible: boolean) {
    this.isExpandedSubject.next(isExpanded);
    this.menuVisibleSubject.next(isVisible);
  }
}
