import { Component, OnInit, HostListener } from '@angular/core';
import { NotasService } from '../../../Services/notas.service';
import { Nota } from '../../../Models/nota.model';
import { AuthService } from '../../../Services/auth.service';
import { MenuService } from '../../../Services/menu.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-notas',
  templateUrl: './notas.component.html',
  styleUrls: ['./notas.component.css'],
  providers: [DatePipe]
})
export class NotasComponent implements OnInit {
  nota: Nota = { descripcion: '', usuario_id: 0, id: 0 };
  mensaje: string = '';
  notas: Nota[] = [];
  notaEditada: Nota | null = null;  // Aquí almacenamos la nota seleccionada para editar

  isExpanded: boolean = true;
  isVisible: boolean = true;
  isSmallScreen: boolean = false;

  constructor(
    private notasService: NotasService,
    private authService: AuthService,
    private menuService: MenuService,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.menuService.isExpanded$.subscribe(isExpanded => {
      this.isExpanded = isExpanded;
    });

    this.menuService.menuVisible$.subscribe(isVisible => {
      this.isVisible = isVisible;
    });

    this.checkScreenSize();
    this.obtenerNotas();
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

  private obtenerNotas() {
    this.notasService.getNotasPorUsuario().subscribe(
      (response: Nota[]) => {
        this.notas = response;
        // Comentado para evitar impresión en consola
        // console.log('Notas del usuario:', this.notas);
      },
      (error) => {
        // Comentado para evitar impresión en consola
        // console.error('Error al obtener las notas:', error);
        this.mensaje = 'Error al cargar las notas.';
      }
    );
  }

  formatFecha(date: string): string {
    return this.datePipe.transform(date, 'dd/MM/yyyy') || '';
  }

  crearNota() {
    const currentUser = this.authService.getUser();
  
    if (currentUser && currentUser.rol && currentUser.rol.id === 4) {
      if (currentUser.userable && currentUser.userable.id_usuario) {
        this.nota.usuario_id = currentUser.userable.id_usuario;
      } else {
        this.nota.usuario_id = 0;
      }
  
      this.notasService.createNota(this.nota).subscribe(
        (response) => {
          // Comentado para evitar impresión en consola
          // console.log('Nota creada:', response);
          this.mensaje = 'Nota creada con éxito';
          this.nota.descripcion = '';
          this.obtenerNotas();
        },
        (error) => {
          // Comentado para evitar impresión en consola
          // console.error('Error al crear la nota:', error);
          this.mensaje = 'Error al crear la nota';
        }
      );
    } else {
      this.mensaje = 'No tienes permisos para crear notas o no estás autenticado correctamente.';
      // Comentado para evitar impresión en consola
      // console.error('Usuario no autenticado o no tiene el rol adecuado');
    }
  }

  eliminarNota(id: number) {
    this.notasService.eliminarNota(id).subscribe(
      (response) => {
        // Comentado para evitar impresión en consola
        // console.log('Nota eliminada:', response);
        this.mensaje = 'Nota eliminada con éxito.';
        this.obtenerNotas();
      },
      (error) => {
        // Comentado para evitar impresión en consola
        // console.error('Error al eliminar la nota:', error);
        this.mensaje = 'Error al eliminar la nota.';
      }
    );
  }

  // Método para seleccionar la nota que se va a editar
  editarNota(nota: Nota) {
    this.notaEditada = { ...nota };  // Copiamos los datos de la nota seleccionada a `notaEditada`
  }

  seleccionarNota(nota: Nota) {
    this.notaEditada = { ...nota };  // Copiar la nota seleccionada para evitar modificar la lista directamente
    this.nota = { ...nota };         // Mostrar los detalles de la nota seleccionada en el formulario
  }

  // Método para actualizar la nota
  actualizarNota() {
    if (this.notaEditada) {
      this.notasService.actualizarNota(this.notaEditada.id, this.nota).subscribe(
        (response) => {
          this.mensaje = 'Nota actualizada con éxito.';
          this.obtenerNotas();  // Recargar las notas después de la actualización
          this.limpiarFormulario();  // Limpiar el formulario después de actualizar
        },
        (error) => {
          // Comentado para evitar impresión en consola
          // console.error('Error al actualizar la nota:', error);
          this.mensaje = 'Error al actualizar la nota.';
        }
      );
    }
  }

  // Método para limpiar el formulario después de actualizar
  limpiarFormulario() {
    this.nota = { descripcion: '', usuario_id: 0 , id: 0};  // Limpiar el formulario
    this.notaEditada = null;  // Resetear la notaEditada
  }
}
