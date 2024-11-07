import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Riesgo } from '../../../../Models/Riesgo.model';
import { NumeroControl } from '../../../../Models/Numero-control.model';
import { FormaMedicion } from '../../../../Models/Forma-medicion.model';
import { DiagnosticoNutricional } from '../../../../Models/Diagnostico-nutricional.model';
import { NumSesionesCurso } from '../../../../Models/Num-secciones-curso.model';
import { SeguimientoConsultaMensual } from '../../../../Models/Seguimiento-consulta-mensual.model';
import { SeguimientoComplementario } from '../../../../Models/Seguimiento-complementario.model';
import { Micronutriente } from '../../../../Models/Micronutriente.model';
import { NumeroControlService } from '../../../../Services/numero-control.service';
import { RiesgoService } from '../../../../Services/riesgo.service';
import { FormaMedicionService } from '../../../../Services/forma-medicion.service';
import { DiagnosticoNutricionalService } from '../../../../Services/diagnostico-nutricional.service';
import { NumSesionesCursoService } from '../../../../Services/num-sesiones-curso.service';
import { SeguimientoConsultaMensualService } from '../../../../Services/seguimiento-consulta-mensual.service';
import { SeguimientoComplementarioService } from '../../../../Services/seguimiento-complementario.service';
import { MicronutrientesService } from '../../../../Services/micronutrientes.service';

@Component({
  selector: 'app-ruta-4',
  templateUrl: './ruta-4.component.html',
  styleUrl: './ruta-4.component.css'
})
export class Ruta4Component {

  openTab = 1;
  numerosControl: NumeroControl[] = [];
  riesgo: Riesgo[] = [];
  formaMedicion: FormaMedicion[] = [];
  diagnostico: DiagnosticoNutricional[] = [];
  numSesiones: NumSesionesCurso[] = [];
  ReadonlySeguimientoConsulta = false;
  ReadonlySeguimientoComplementario = false;
  ReadonlyMicronutriente = false;

  seguimientoConsulta: SeguimientoConsultaMensual;
  seguimientoComplementario: SeguimientoComplementario;
  micronutriente: Micronutriente;
  id: number | null = null;
  num_proceso: number | null = null;

  id_SeguimientoConsulta: number | null = null;
  id_SeguimientoComplementario: number | null = null;
  id_Micronutriente: number | null = null;

  isEditing = false;
  isExpanded = true;
  isVisible = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private numeroControlService: NumeroControlService,
    private riesgoService: RiesgoService,
    private formaMedicionService: FormaMedicionService,
    private diagnosticoNutricionalService: DiagnosticoNutricionalService,
    private numSesionesCursoService: NumSesionesCursoService,
    private seguimientoConsultaMensualService: SeguimientoConsultaMensualService,
    private seguimientoComplementarioService: SeguimientoComplementarioService,
    private micronutrientesService: MicronutrientesService,
  ) {
    this.seguimientoConsulta = new SeguimientoConsultaMensual();

    this.seguimientoComplementario = new SeguimientoComplementario();

    this.micronutriente = new Micronutriente();
  }

  ngOnInit() {

    this.route.paramMap.subscribe(params => {
      this.id = +params.get('id')!; // Obtiene el ID como número
      console.log('ID de la gestante:', this.id);
    });

    this.route.paramMap.subscribe(params => {
      this.num_proceso = +params.get('num_proceso')!; // Obtiene el ID como número
      console.log('num_proceso:', this.num_proceso);
    });

    if (this.id !== null && this.id > 0) {
      this.getSeguimientoConsulta();
      this.getSeguimientoComplementario();
      this.getMicronutientes();
    } else {
      console.log('No se proporcionó un ID válido.');
    }

    this.getNumerosControl();
    this.getRiesgos();
    this.getFormasMedicion();
    this.getDiagnosticosNutricionales();
    this.getNumSesionesCurso();
  }




  toggleTabs(tabNumber: number) {
    // Permitir cambio entre las pestañas 1 y 2 en modo edición
    if (this.isEditing) {
      if (tabNumber === 1 || tabNumber === 2) {
        this.openTab = tabNumber;
      } else {
        // Swal.fire({
        //   title: 'Advertencia',
        //   text: 'Por favor, guarda los cambios antes de cambiar de pestaña.',
        //   icon: 'warning',
        //   confirmButtonText: 'OK'
        // });
      }
      return;
    }
    this.openTab = tabNumber;
  }

  toggleEditSeguimientoConsulta() {
    if (!this.ReadonlySeguimientoConsulta) return;
    this.ReadonlySeguimientoConsulta = false;
    this.isEditing = true;
  }

  toggleEditSeguimientoComplementario() {
    if (!this.ReadonlySeguimientoComplementario) return;
    this.ReadonlySeguimientoComplementario = false;
    this.isEditing = true;
  }

  toggleEditMicronutriente() {
    if (!this.ReadonlyMicronutriente) return;
    this.ReadonlyMicronutriente = false;
    this.isEditing = true;
  }

  getNumerosControl() {
    this.numeroControlService.getNumerosControl().subscribe(response => {
      if (response.estado === 'Ok') {
        this.numerosControl = response['numero_controles'];
        console.log(response);
      }
    }, error => {
      console.error('Error al obtener números de control', error);
    });
  }

  getRiesgos() {
    this.riesgoService.getRiesgos().subscribe(response => {
      if (response.estado === 'Ok') {
        this.riesgo = response['riesgo'];
        // console.log(this.riesgo); 
      }
    }, error => {
      console.error('Error al obtener los riegos', error);
    });
  }

  getFormasMedicion() {
    this.formaMedicionService.getFormasMedicion().subscribe(response => {
      if (response.estado === 'Ok') {
        this.formaMedicion = response['Forma_Medicion'];
        // console.log(this.formaMedicion); 
      }
    }, error => {
      console.error('Error al obtener la forma de medición', error);
    });
  }

  getDiagnosticosNutricionales() {
    this.diagnosticoNutricionalService.getDiagnosticosNutricionales().subscribe(response => {
      if (response.estado === 'Ok') {
        this.diagnostico = response['diagnostico'];
        // console.log(this.diagnostico); 
      }
    }, error => {
      console.error('Error al obtener el diagnostico', error);
    });
  }

  getNumSesionesCurso() {
    this.numSesionesCursoService.getNumSesionesCurso().subscribe(response => {
      if (response.estado === 'Ok') {
        this.numSesiones = response['Sesiones_Curso'];
        // console.log(this.numSesiones); 
      }
    }, error => {
      console.error('Error al obtener el numero de sesiones', error);
    });
  }

  guardarSeguimientoConsulta() {

    if (this.id_SeguimientoConsulta) {
      // Editar usuario existente
      this.seguimientoConsultaMensualService.updateSeguimientoConsulta(this.id_SeguimientoConsulta, this.seguimientoConsulta).subscribe({
        next: (response) => {
          console.log('Seguimiento Consulta actualizado:', response);
          // Swal.fire({
          //   title: 'Éxito',
          //   text: 'Consulta de seguimiento mensual editada con éxito',
          //   icon: 'success',
          // }).then(() => {
          //   this.ReadonlySeguimientoConsulta = true;
          //   this.isEditing = false;
          // });
        },
        error: (error) => {
          console.error('Error al actualizar la consulta de seguimiento mensual:', error);
          // Swal.fire({
          //   title: 'Error',
          //   text: 'Ocurrió un error al actualizar la consulta de seguimiento mensual',
          //   icon: 'error',
          // });
        }
      });
    } else {

      if (this.id !== null) {
        this.seguimientoConsulta.id_usuario = this.id;
      }
      this.seguimientoConsulta.num_proceso = this.num_proceso !== null ? this.num_proceso : 0;


      this.seguimientoConsultaMensualService.crearSeguimientoConsulta(this.seguimientoConsulta).subscribe(response => {
        // Swal.fire({
        //   icon: 'success',
        //   title: 'Éxito',
        //   text: 'Seguimiento de consulta mensual guardado correctamente',
        //   timer: 2000,
        //   showConfirmButton: false
        // }).then(() => {
        //   this.id_SeguimientoConsulta = response.cod_seguimiento ?? null;
        //   this.ReadonlySeguimientoConsulta = true;
        //   this.isEditing = false;
        //   console.log(response);
        //   console.log(this.id_SeguimientoConsulta)
        // });

      }, error => {
        // Swal.fire({
        //   icon: 'error',
        //   title: 'Error',
        //   text: 'Error al guardar el seguimiento de consulta mensual',
        // });
      });
    }
  }

  getSeguimientoConsulta(): void {
    if (this.id !== null && this.id > 0) { // Verificar que el ID sea válido
      this.seguimientoConsultaMensualService.getSeguimientoConsultabyId(this.id, this.num_proceso ?? 0).subscribe(
        (response) => {
          this.seguimientoConsulta = response.seguimiento;
          console.log(response);
          this.ReadonlySeguimientoConsulta = true;
          this.id_SeguimientoConsulta = response.seguimiento.cod_seguimiento ?? null;
        },
        (error) => {
          console.error('Error al obtener el Seguimiento de consulta mensual:', error);
        }
      );
    } else {
      console.log('No se proporcionó ID, se asume que se va a crear un nuevo  Seguimiento de consulta mensual.');
    }
  }


  guardarSeguimientoComplementario() {
    if (this.id_SeguimientoComplementario) {
      // Editar seguimiento complementario existente
      this.seguimientoComplementarioService.updateSeguimientoComplementario(this.id_SeguimientoComplementario, this.seguimientoComplementario).subscribe({
        next: (response) => {
          console.log('Seguimiento complementario actualizado:', response);
          // Swal.fire({
          //   title: 'Éxito',
          //   text: 'Seguimiento complementario editado con éxito',
          //   icon: 'success',
          // }).then(() => {
          //   this.ReadonlySeguimientoComplementario = true;
          //   this.isEditing = false;
          // });
        },
        error: (error) => {
          console.error('Error al actualizar el seguimiento complementario:', error);
          // Swal.fire({
          //   title: 'Error',
          //   text: 'Ocurrió un error al actualizar el seguimiento complementario',
          //   icon: 'error',
          // });
        }
      });
    } else {
      // Crear nuevo seguimiento complementario
      if (this.id !== null) {
        this.seguimientoComplementario.id_usuario = this.id;
      }
      this.seguimientoComplementario.num_proceso = this.num_proceso !== null ? this.num_proceso : 0;


      this.seguimientoComplementarioService.crearSeguimientoComplementario(this.seguimientoComplementario).subscribe(response => {
        // Swal.fire({
        //   icon: 'success',
        //   title: 'Éxito',
        //   text: 'Seguimiento complementario guardado correctamente',
        //   timer: 2000,
        //   showConfirmButton: false
        // }).then(() => {
        //   this.id_SeguimientoComplementario = response.cod_segcomplementario ?? null;
        //   this.ReadonlySeguimientoComplementario = true;
        //   this.isEditing = false;
        //   console.log(response);
        //   console.log(this.id_SeguimientoComplementario);
        // });
      }, error => {
        // Swal.fire({
        //   icon: 'error',
        //   title: 'Error',
        //   text: 'Error al guardar el seguimiento complementario',
        // });
      });
    }
  }


  getSeguimientoComplementario(): void {
    if (this.id !== null && this.id > 0) {
      this.seguimientoComplementarioService.getSeguimientoComplementariobyId(this.id, this.num_proceso ?? 0).subscribe(
        (response) => {
          this.seguimientoComplementario = response.seguimiento;
          console.log(response);
          this.ReadonlySeguimientoComplementario = true;
          this.id_SeguimientoComplementario = response.seguimiento.cod_segcomplementario ?? null;
        },
        (error) => {
          console.error('Error al obtener el Seguimiento Complementario:', error);
        }
      );
    } else {
      console.log('No se proporcionó ID, se asume que se va a crear un nuevo Seguimiento Complementario.');
    }
  }

  guardarMicronutriente() {
    if (this.id_Micronutriente) {
      // Editar micronutriente existente
      this.micronutrientesService.updateMicronutriente(this.id_Micronutriente, this.micronutriente).subscribe({
        next: (response) => {
          console.log('Micronutriente actualizado:', response);
          // Swal.fire({
          //   title: 'Éxito',
          //   text: 'Micronutriente editado con éxito',
          //   icon: 'success',
          // }).then(() => {
          //   this.ReadonlyMicronutriente = true;
          //   this.isEditing = false;
          // });
        },
        error: (error) => {
          console.error('Error al actualizar el micronutriente:', error);
          // Swal.fire({
          //   title: 'Error',
          //   text: 'Ocurrió un error al actualizar el micronutriente',
          //   icon: 'error',
          // });
        }
      });
    } else {
      if (this.id !== null) {
        this.micronutriente.id_usuario = this.id;
      }

      this.micronutriente.num_proceso = this.num_proceso !== null ? this.num_proceso : 0;


      this.micronutrientesService.crearMicronutriente(this.micronutriente).subscribe(response => {
        // Swal.fire({
        //   icon: 'success',
        //   title: 'Éxito',
        //   text: 'Micronutriente guardado correctamente',
        //   timer: 2000,
        //   showConfirmButton: false
        // }).then(() => {
        //   this.id_Micronutriente = response.cod_micronutriente ?? null;
        //   this.ReadonlyMicronutriente = true;
        //   this.isEditing = false;
        //   console.log(response);
        //   console.log(this.id_Micronutriente);
        // });
      }, error => {
        // Swal.fire({
        //   icon: 'error',
        //   title: 'Error',
        //   text: 'Error al guardar el micronutriente',
        // });
      });
    }
  }


  getMicronutientes(): void {
    if (this.id !== null && this.id > 0) {
      this.micronutrientesService.getMicronutrientebyId(this.id, this.num_proceso ?? 0).subscribe(
        (response) => {
          this.micronutriente = response.micronutriente;
          console.log(response);
          this.ReadonlyMicronutriente = true;
          this.id_Micronutriente = response.micronutriente.cod_micronutriente ?? null;
        },
        (error) => {
          console.error('Error al obtener el Seguimiento Complementario:', error);
        }
      );
    } else {
      console.log('No se proporcionó ID, se asume que se va a crear un nuevo Seguimiento Complementario.');
    }
  }




  volver() {
    this.router.navigate(['/ruta-gestante', this.id]); // Navegar a la ruta con el ID
  }
}
