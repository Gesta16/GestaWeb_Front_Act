import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from '../../../Services/usuario.service';
import { MenuService } from '../../../Services/menu.service';

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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private usuarioService: UsuarioService,
    private menuService: MenuService,
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = +params.get('id')!;
      this.procesoId = +params.get('procesoId')!;
      console.log('ID de la gestante:', this.id);
      if (this.id !== null) {
        this.contarProcesos(this.id);
      }
    });
    this.menuService.isExpanded$.subscribe(isExpanded => {
      this.isExpanded = isExpanded;
    });
  }

  irAControlPrenatal() {
    if (this.id !== null) {
      this.router.navigate(['/ruta-2', this.id, this.selectedOption]);
    }
  }

  // crearProceso() {
  //   if (this.id !== null) {
  //     this.usuarioService.crearProcesoGestativo(this.id).subscribe(
  //       response => {
  //         // Swal.fire({
  //         //   icon: 'success',
  //         //   title: 'Proceso Registrado',
  //         //   text: 'Se ha registrado un nuevo proceso gestativo.',
  //         //   confirmButtonText: 'Aceptar',
  //         //   allowOutsideClick: false 

  //         // }).then((result) => {
  //         //   if (result.isConfirmed) {
  //         //     location.reload(); 
  //         //   }
  //         // });
  //         console.log(response.message);
  //       },
  //       error => {
  //         console.error('Error al crear el proceso gestativo:', error);
  //         if (error.status == 400) {
  //           // Swal.fire({
  //           //   icon: 'error',
  //           //   title: 'Error',
  //           //   text: 'Hay un proceso en curso, no se ha registrado aun su finalización.',
  //           //   confirmButtonText: 'Aceptar'
  //           // });
  //         }
  //       }
  //     );
  //   }
  // }

  contarProcesos(usuarioId: number) {
    this.usuarioService.contarProcesosGestativos(usuarioId).subscribe(response => {
      this.procesosCount = response.numero_de_procesos_gestativos;
      this.selectedOption = this.procesosCount;

      console.log(`Número de procesos gestativos para ${usuarioId}: ${this.procesosCount}`);
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

  irSaludIntegral() {
    if (this.id !== null) {
      this.router.navigate(['/ruta-4', this.id, this.selectedOption]); // Navegar a la ruta con el ID
    };
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
