import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from '../../../Services/usuario.service';
import { MenuService } from '../../../Services/menu.service';
import { AuthService } from '../../../Services/auth.service';

@Component({
  selector: 'app-ruta-gestante',
  templateUrl: './ruta-gestante.component.html',
  styleUrl: './ruta-gestante.component.css'
})
export class RutaGestanteComponent {

  id: number | null = null;
  procesosCount: number = 0;
  selectedOption: number | null = null;

  procesoId: number | null = null;
  isExpanded = true;
  isVisible = true;
  user: any;
  isRole4:any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private usuarioService: UsuarioService,
    private menuService: MenuService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.user = this.authService.currentUserValue;

    // Verificar el rol del usuario
    if (this.user.rol_id === 4) {
      this.id = this.user.userable.id_usuario; // Obtener el ID del usuario autenticado
      this.isRole4 = this.user.rol_id === 4;
      //console.log('ID del usuario (rol 4):', this.id);
      this.contarProcesos(this.id);
      // Llamar al servicio para cargar los datos del usuario completo
      this.usuarioService.getUsuarioCompleto(this.id).subscribe(
        (response) => {
          //console.log('Usuario completo:', response.data);
        },
        (error) => {
          console.error('Error al cargar usuario completo:', error);
        }
      );
    } else {
      // Si no es rol 4, obtener el ID desde los parámetros de la ruta
      this.route.paramMap.subscribe((params) => {
        this.id = +params.get('id')!;
        this.procesoId = +params.get('procesoId')!;
        //console.log('ID de la gestante:', this.id);

        if (this.id !== null) {
          this.contarProcesos(this.id);
        }
      });
    }

    // Controlar el estado del menú
    this.menuService.isExpanded$.subscribe((isExpanded) => {
      this.isExpanded = isExpanded;
    });
  }


  irAControlPrenatal() {
    if (this.id !== null) {
      this.router.navigate(['/ruta-2', this.id, this.selectedOption]);
    }
  }


  contarProcesos(usuarioId: number) {
    this.usuarioService.contarProcesosGestativos(this.id).subscribe(response => {
      this.procesosCount = response.numero_de_procesos_gestativos;
      this.selectedOption = this.procesosCount;

      //console.log(`Número de procesos gestativos para ${usuarioId}: ${this.procesosCount}`);
    }, error => {
      console.error('Error al contar los procesos gestativos:', error);
    });
  }

  generarRango(cantidad: number): number[] {
    return Array.from({ length: cantidad }, (_, i) => i + 1);
  }


  irAnalisisPrevencion() {
    if (this.id !== null) {
      this.router.navigate(['/ruta-3', this.id, this.selectedOption]); // Navegar a la ruta con el ID
    };
  }

  irSaludIntegral(isNuevoRegistro: boolean = false): void {
    if (this.id !== null) {
      this.router.navigate(['/ruta-4', this.id, this.selectedOption, isNuevoRegistro ? 'nuevo' : 'ingresar']); // Navegar a la ruta con el indicador
    }
  }
  


  irPreparto() {
    if (this.id !== null) {
      this.router.navigate(['/ruta-5', this.id, this.selectedOption]); // Navegar a la ruta con el ID
    };
  }

  irPosparto() {
    if (this.id !== null) {
      this.router.navigate(['/ruta-6', this.id, this.selectedOption]); // Navegar a la ruta con el ID
    };
  }

  irUsuario() {
    if (this.id !== null) {
      this.router.navigate(['/add-gestante', this.id]); // Navegar a la ruta con el ID
    };
  }

  volver() {
    this.router.navigate(['/list-gestantes']);
  }
}
