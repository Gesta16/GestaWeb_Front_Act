import { Component, HostListener } from '@angular/core';
import { Usuario } from '../../../Models/Usuario.model';
import { TipoDocumento } from '../../../Models/Tipo-documento.model';
import { TipoDocumentoService } from '../../../Services/tipo-documento.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { UsuarioService } from '../../../Services/usuario.service';
import { MenuService } from '../../../Services/menu.service';
import { AlertService } from '../../../Services/alert.service';

@Component({
  selector: 'app-list-gestantes',
  templateUrl: './list-gestantes.component.html',
  styleUrl: './list-gestantes.component.css'
})
export class ListGestantesComponent {

  selectedUserId: number | null = null;
  title = 'Gestión de Usuarios';
  isSmallScreen: boolean = false;
  usuarios: Usuario[] = [];
  tiposDocumento: TipoDocumento[] = [];
  paginatedUsuarios: Usuario[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalPages: number = 1;

  isExpanded = true;
  isVisible = true;

  showDropdown = false;
  selectedProcess: number | null = null;

  constructor(
    private usuarioService: UsuarioService,
    private tipoDocumentoService: TipoDocumentoService,
    private router: Router,
    private _matDialog: MatDialog,
    private menuService: MenuService,
    private alertService: AlertService,
  ) { }


  ngOnInit() {
    this.checkScreenSize();
    this.loadUsuarios();
    this.loadTiposDocumento();
    this.menuService.isExpanded$.subscribe(isExpanded => {
      this.isExpanded = isExpanded;
    });
    this.menuService.menuVisible$.subscribe(isVisible => {
      this.isVisible = isVisible;
    });
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

  // abrirModalVer(usuario: Usuario): void {
  //   const dialogRef = this._matDialog.open(VerUsuarioComponent, {
  //     enterAnimationDuration: '0ms',
  //     exitAnimationDuration: '0ms',
  //     data: { usuario: usuario } // Pasar los datos del usuario seleccionado al modal
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     if (result) {
  //       this.loadUsuarios(); // Opcional, puedes volver a cargar los usuarios si necesitas
  //     }
  //   });
  // }

  contarProcesos(usuarioId: number) {
    this.usuarioService.contarProcesosGestativos(usuarioId).subscribe(response => {
      const usuario = this.usuarios.find(u => u.id_usuario === usuarioId); // Busca el usuario por id
      if (usuario) {
        usuario.procesosCount = response.numero_de_procesos_gestativos; // Almacena el conteo en el objeto usuario
        console.log(`Número de procesos gestativos para ${usuarioId}: ${response.numero_de_procesos_gestativos}`);
      }
    }, error => {
      console.error('Error al contar los procesos gestativos:', error);
    });
  }

  crearProceso(usuarioId: number) {
    this.usuarioService.crearProcesoGestativo(usuarioId).subscribe(response => {
      console.log(response.message);
      this.loadUsuarios();
    }, error => {
      console.error('Error al crear el proceso gestativo:', error);
    });
  }

  toggleDropdown(usuario: Usuario) {
    this.usuarios.forEach(u=>{
      if (u.id_usuario === usuario.id_usuario){
        u.showDropdown = !u.showDropdown;
      } else{
        u.showDropdown = false;
      }
    })
  }

  generarRango(cantidad: number): number[] {
    return Array.from({ length: cantidad }, (_, i) => i + 1);
  }

  // Redirigir a la ruta de detalles del proceso
  verProceso(usuarioId: number, procesoId: number) {
    if (usuarioId !== null && procesoId !== null) {
      // Redirigir a la página donde se muestran los detalles del proceso
      this.router.navigate(['/ruta-gestante', usuarioId, procesoId]);
      this.showDropdown = false; // Cerrar el dropdown después de la selección
    }
  }

  // verUsuario(id: number): void {
  //   this.selectedUserId = id;
  //   console.log('ID del usuario seleccionado:', this.selectedUserId);

  //   this.router.navigate(['/ruta-gestante', this.selectedUserId]);
  // }

  private loadUsuarios(): void {
    this.usuarioService.getUsuarios().subscribe(
      (response: any) => {
        this.usuarios = response.usuarios;
        console.log(response);
        // Contar los procesos gestativos para cada usuario
        this.usuarios.forEach(usuario => {
          this.contarProcesos(usuario.id_usuario);
        });
        

        this.updatePagination();
      },
      (error: any) => {
        console.error('Error al obtener Usuarios:', error);
      }
    );
  }

  private loadTiposDocumento(): void {
    this.tipoDocumentoService.getTipoDocumentos().subscribe(
      response => {
        this.tiposDocumento = response.documento;
      },
      error => {
        console.error('Error al obtener Tipos de Documento:', error);
      }
    );
  }

  getTipoDocumentoNombre(cod_documento: number): string {
    const tipo = this.tiposDocumento.find(td => td.cod_documento === cod_documento);
    return tipo ? tipo.nom_documento : 'Desconocido';
  }

  private updatePagination(): void {
    this.totalPages = Math.ceil(this.usuarios.length / this.itemsPerPage);
    this.paginatedUsuarios = this.usuarios.slice((this.currentPage - 1) * this.itemsPerPage, this.currentPage * this.itemsPerPage);
  }

  changePage(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.updatePagination();
  }

  get totalPagesArray(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

}
