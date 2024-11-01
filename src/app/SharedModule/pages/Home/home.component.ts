import { ChangeDetectorRef, Component, HostListener } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalAlimentacionComponent } from './Modales/modal-alimentacion/modal-alimentacion.component';
import { ModalCrecimientoComponent } from './Modales/modal-crecimiento/modal-crecimiento.component';
import { ModalEjercicioComponent } from './Modales/modal-ejercicio/modal-ejercicio.component';
import { ModalMensajeComponent } from './Modales/modal-mensaje/modal-mensaje.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  title = 'modal';
  isSmallScreen: boolean = false;

  constructor(
    private _matDialog: MatDialog,
    //private menuService: MenuService,
    private cdr: ChangeDetectorRef // Inyección de ChangeDetectorRef
  ) {    //this.toggleSidebar();
  }

  ngOnInit() {
    this.checkScreenSize();
    this.cdr.detectChanges(); // Asegúrate de que los cambios se detecten
  }

  private checkScreenSize() {
    if (typeof window !== 'undefined') {
      this.isSmallScreen = window.innerWidth < 1024;
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    if (typeof window !== 'undefined') {
      this.isSmallScreen = event.target.innerWidth < 1024;
    }
  }

  abrirModal(): void {
    this._matDialog.open(ModalMensajeComponent, {
      enterAnimationDuration: '0ms',
      exitAnimationDuration: '0ms'
    });
  }

  abrirModalAlimentacion(): void {
    this._matDialog.open(ModalAlimentacionComponent, {
      enterAnimationDuration: '0ms',
      exitAnimationDuration: '0ms'
    });
  }

  // toggleSidebar() {
  //   this.menuService.setMenuVisible(false);
  // }

  abrirModalEjercicio(): void {
    this._matDialog.open(ModalEjercicioComponent, {
      enterAnimationDuration: '0ms',
      exitAnimationDuration: '0ms'
    });
  }

  abrirModalCrecimientoBebe(): void {
    this._matDialog.open(ModalCrecimientoComponent, {
      enterAnimationDuration: '0ms',
      exitAnimationDuration: '0ms'
    });
  }

}
