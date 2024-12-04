import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../../Services/menu.service';
import { AuthService } from '../../../Services/auth.service';
import { ControlPrenatalService } from '../../../Services/control-prenatal.service'; 
import { UsuarioService } from '../../../Services/usuario.service';  // Importamos UsuarioService para manejar la autorización
import { Consulta, DashboardService } from '../../../Services/dashboard.service';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';

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

  consultas: Consulta[] = [];
  loading: boolean = true;
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin],
    locale: 'es',
    events: [],
    headerToolbar: {
      left: 'title', // Puedes dejar solo los botones de "prev" y "next"
      center: '',
      right: 'prev,next' // No agregues el botón "today"
    }
  };

  constructor(
    private menuService: MenuService, 
    private authService: AuthService,
    private dashboardService: DashboardService,
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
    const storedEdadGestacional = localStorage.getItem('edadGestacional_' + currentUser.userable.id_usuario);
    const storedTrimestre = localStorage.getItem('trimestre_' + currentUser.userable.id_usuario);
    const storedColorBarra = localStorage.getItem('colorBarra_' + currentUser.userable.id_usuario);

    // Si existe en localStorage, usamos el valor de la edad gestacional almacenado
    if (storedEdadGestacional) {
      this.edadGestacional = parseInt(storedEdadGestacional, 10);
      this.trimestre = storedTrimestre ? storedTrimestre : ''; // Obtener el trimestre desde localStorage
      this.colorBarra = storedColorBarra ? storedColorBarra : ''; // Obtener el color de la barra desde localStorage
      this.calcularSemanasRestantes();  // Calculamos las semanas restantes
      this.calcularTrimestre();  // Calculamos el trimestre
    } else {
      // Si no está en localStorage, obtenemos la edad gestacional de la base de datos
      const usuarioId = this.authService.currentUserValue.userable.id_usuario;
      this.controlPrenatalService.getControlById(usuarioId, 1).subscribe(response => {
        // Asegúrate de que la respuesta contiene la propiedad "Control" y "edad_gestacional"
        const edadGestacionalDB = response.Control ? parseInt(response.Control.edad_gestacional, 10) : 0;
        
        if (!isNaN(edadGestacionalDB)) {
          this.edadGestacional = edadGestacionalDB;
          // Almacenar en localStorage con el id de usuario único
          localStorage.setItem('edadGestacional_' + usuarioId, this.edadGestacional.toString());
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
        localStorage.setItem('edadGestacional_' + currentUser.userable.id_usuario, this.edadGestacional.toString());
        this.calcularTrimestre();  // Recalculamos el trimestre y el color de la barra
        this.calcularSemanasRestantes();  // Recalculamos las semanas restantes
      }
    }, 7 * 24 * 60 * 60 * 1000);  // Cada 7 días para efectos de prueba

    this.loading = true;
    this.cargarConsultas();
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
    const currentUser = this.authService.currentUserValue;
    localStorage.setItem('trimestre_' + currentUser.userable.id_usuario, this.trimestre);
    localStorage.setItem('colorBarra_' + currentUser.userable.id_usuario, this.colorBarra);

    // Depuración
    console.log("Edad gestacional: ", this.edadGestacional);
    console.log("Trimestre calculado: ", this.trimestre);
    console.log("Color de barra calculado: ", this.colorBarra);
  }

  // Método para calcular las semanas restantes
  calcularSemanasRestantes(): void {
    this.semanasRestantes = 42 - this.edadGestacional;
    // Depuración
    console.log("Semanas restantes: ", this.semanasRestantes);
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

  cargarConsultas() {
    this.dashboardService.getCalendarioUsuario().subscribe(
      (response) => {
        if (response.estado === 'Ok') {
          this.consultas = response.data;
          this.calendarOptions.events = this.mapearConsultasAEventos(this.consultas); // Mapear las consultas a eventos
        } else {
          this.calendarOptions.events = [];
        }
        
        this.loading = false;
      },
      (error) => {
        console.error('Error al cargar las consultas:', error);
        this.loading = false;
      }
    );
  }

  private mapearConsultasAEventos(consultas: Consulta[]): any[] {
    const colorConsultas: { [key: string]: { background: string, text: string } } = {
      "Control Prenatal": { background: "#A8E6CF", text: "#000000" },
      "Primera Consulta": { background: "#DCEDC1", text: "#000000" },
      "Laboratorios primer trimestre": { background: "#FFD3B6", text: "#000000" },
      "Laboratorios segundo trimestre": { background: "#FFAAA5", text: "#000000" },
      "Laboratorios tercer semestre": { background: "#D0E8FF", text: "#000000" },
      "Consulta Mensual": { background: "#E8DFFF", text: "#000000" },
      "Control Complementario": { background: "#A8E6CF", text: "#000000" },
      "Finalizacion Gestación": { background: "#FFD3B6", text: "#000000" }
    };

    return consultas.map(consulta => {
      const { background, text } = colorConsultas[consulta.nombre_consulta] || { background: "#D0E8FF", text: "#000000" };
      return {
        title: consulta.nombre_consulta,
        start: consulta.fecha,
        backgroundColor: background,
        textColor: text,
        eventContent: () => {
          return {
            html: `
              <div class="scrollable-container" style="background-color: ${background}; color: ${text};">
                <span class="scrollable-text">${consulta.nombre_consulta}</span>
              </div>
            `
          };
        }
      };
    });
  }
}
