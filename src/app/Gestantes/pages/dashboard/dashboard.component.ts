import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../../Services/menu.service';
import { AuthService } from '../../../Services/auth.service';
import { ControlPrenatalService } from '../../../Services/control-prenatal.service'; 
import { UsuarioService } from '../../../Services/usuario.service';  // Importamos UsuarioService para manejar la autorización

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  isExpanded = true;
  isVisible = true;
  isModalVisible = false;  // Controla la visibilidad del modal
  edadGestacional: number = 0;
  semanasRestantes: number = 0;  // Nueva variable para las semanas restantes
  trimestre: string = '';  
  colorBarra: string = '';  // Para almacenar el color de la barra

  constructor(
    private menuService: MenuService, 
    private authService: AuthService,
    private controlPrenatalService: ControlPrenatalService, 
    private usuarioService: UsuarioService  // Inyectamos UsuarioService
  ) { }

  ngOnInit() {
    // Gestionamos el estado del menú
    this.menuService.isExpanded$.subscribe(isExpanded => {
      this.isExpanded = isExpanded;
    });

    // Verificamos si los términos han sido aceptados
    const currentUser = this.authService.currentUserValue;
    if (currentUser && currentUser.userable.autorizacion === 0) {
      this.isModalVisible = true;  // Mostrar el modal si el campo 'autorizacion' es 0
    }

    // Intentamos recuperar el estado desde localStorage
    const storedEdadGestacional = localStorage.getItem('edadGestacional');
    const storedTrimestre = localStorage.getItem('trimestre');
    const storedColorBarra = localStorage.getItem('colorBarra');

    // Si existe en localStorage, usamos el valor de la edad gestacional almacenado
    if (storedEdadGestacional) {
      this.edadGestacional = parseInt(storedEdadGestacional, 10);
      this.trimestre = storedTrimestre ? storedTrimestre : ''; // Obtener el trimestre desde localStorage
      this.colorBarra = storedColorBarra ? storedColorBarra : ''; // Obtener el color de la barra desde localStorage
      this.calcularSemanasRestantes();  // Calculamos las semanas restantes
    } else {
      // Si no está en localStorage, obtenemos la edad gestacional de la base de datos
      const usuarioId = this.authService.currentUserValue.userable.id_usuario;
      this.controlPrenatalService.getControlById(usuarioId, 1).subscribe(response => {
        const edadGestacionalDB = parseInt(response.Control.edad_gestacional, 10);
        if (!isNaN(edadGestacionalDB)) {
          this.edadGestacional = edadGestacionalDB;
          localStorage.setItem('edadGestacional', this.edadGestacional.toString());
        } else {
          this.edadGestacional = 0;
        }
        this.calcularTrimestre();  // Calculamos el trimestre y el color de la barra
        this.calcularSemanasRestantes();  // Calculamos las semanas restantes
      });
    }

    // Simulamos el avance de la edad gestacional para efectos de prueba
    setInterval(() => {
      if (this.edadGestacional < 42) {
        this.edadGestacional += 1;
        localStorage.setItem('edadGestacional', this.edadGestacional.toString());
        this.calcularTrimestre();  // Recalculamos el trimestre y el color de la barra
        this.calcularSemanasRestantes();  // Recalculamos las semanas restantes
      }
    }, 7 * 24 * 60 * 60 * 1000);  // Cada 10 segundos para efectos de prueba 1000
  }

  // Método para calcular el trimestre y el color de la barra
  calcularTrimestre(): void {
    if (this.edadGestacional >= 1 && this.edadGestacional <= 13) {
      this.trimestre = 'Primer trimestre';
      this.colorBarra = 'bg-green-200';
    } else if (this.edadGestacional >= 14 && this.edadGestacional <= 27) {
      this.trimestre = 'Segundo trimestre';
      this.colorBarra = 'bg-yellow-200';
    } else if (this.edadGestacional >= 28 && this.edadGestacional <= 42) {
      this.trimestre = 'Tercer trimestre';
      this.colorBarra = 'bg-red-200';
    } else {
      this.trimestre = 'Desconocido';
      this.colorBarra = 'bg-gray-200';
    }

    // Guardamos los valores actualizados en localStorage
    localStorage.setItem('trimestre', this.trimestre);
    localStorage.setItem('colorBarra', this.colorBarra);
  }

  // Método para calcular las semanas restantes
  calcularSemanasRestantes(): void {
    this.semanasRestantes = 42 - this.edadGestacional;
  }

  // Método para manejar el cierre del modal
  handleModalClose(isAccepted: boolean): void {
    if (isAccepted) {
      console.log('Usuario aceptó los términos');
      
      // Obtener el currentUser
      const currentUser = this.authService.currentUserValue;

      if (currentUser && currentUser.userable && currentUser.userable.id_usuario) {
        const usuarioId = currentUser.userable.id_usuario;
        
        console.log('ID del usuario:', usuarioId);
        console.log('currentUser.userable:', currentUser.userable);

        // Actualizar la autorización
        currentUser.userable.autorizacion = 1;

        // Llamar al servicio para hacer la actualización en la base de datos
        this.usuarioService.updateUsuario(usuarioId, currentUser.userable).subscribe({
          next: (response) => {
            console.log('Autorización actualizada correctamente', response);
            this.isModalVisible = false;  // Ocultar el modal si la actualización fue exitosa
          },
          error: (err) => {
            console.error('Error al actualizar autorización', err);
          }
        });
      } else {
        console.error('No se encontró el ID del usuario');
      }
    } else {
      console.log('Usuario no aceptó los términos');
    }
  }
}
