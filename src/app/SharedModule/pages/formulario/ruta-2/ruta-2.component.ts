import { Component } from '@angular/core';
import { ControlPrenatal } from '../../../../Models/Control-prenatal.model';
import { PrimeraConsulta } from '../../../../Models/Primera-consulta.model';
import { Vacunacion } from '../../../../Models/Vacunacion.model';
import { ActivatedRoute, Router } from '@angular/router';
import { VacunacionService } from '../../../../Services/vacunacion.service';
import { BiologicoService } from '../../../../Services/biologico.service';
import { PrimeraConsultaService } from '../../../../Services/primera-consulta.service';
import { TipoDmService } from '../../../../Services/tipo-dm.service';
import { MetodoFracasoService } from '../../../../Services/metodo-fracaso.service';
import { RiesgoService } from '../../../../Services/riesgo.service';
import { ControlPrenatalService } from '../../../../Services/control-prenatal.service';
import { MetodoFracaso } from '../../../../Models/Metodo-fracaso.model';
import { Biologico } from '../../../../Models/Biologico.model';
import { Riesgo } from '../../../../Models/Riesgo.model';
import { TipoDm } from '../../../../Models/Tipo-dm.model';
import { AlertService } from '../../../../Services/alert.service';

@Component({
  selector: 'app-ruta-2',
  templateUrl: './ruta-2.component.html',
  styleUrl: './ruta-2.component.css'
})
export class Ruta2Component {

  openTab = 1;
  metodosFracaso: MetodoFracaso[] = [];
  riesgos: Riesgo[] = [];
  biologicos: Biologico[] = [];
  tiposDm: TipoDm[] = [];
  id_control: number | null = null;
  id_primeraConsulta: number | null = null;
  id_vacunacion: number | null = null;
  isReadOnly = false;
  isReadOnlyPrimeraConsulta = false;
  isReadOnlyVacunacion = false;
  isExpanded = true;
  isVisible = true;
  isEditing = false;

  selectedMetodoFracaso: number | null = null;

  controlPrenatal: ControlPrenatal = new ControlPrenatal();

  primeraConsulta: PrimeraConsulta = new PrimeraConsulta();

  vacunacion: Vacunacion = new Vacunacion();

  id: number | null = null;
  num_proceso: number | null = null;

  constructor(private route: ActivatedRoute,
    private vacunacionService: VacunacionService,
    private biologicoService: BiologicoService,
    private primeraConsultaService: PrimeraConsultaService,
    private tipoDmService: TipoDmService,
    private metodoFracasoService: MetodoFracasoService,
    private riesgoService: RiesgoService,
    private router: Router,
    private controlPrenatalService: ControlPrenatalService,
    private alertService: AlertService,
  ) { }


  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {
      this.id = +params.get('id')!; // Obtiene el ID como número
      console.log('ID de la gestante:', this.id);
    });

    this.route.paramMap.subscribe(params => {
      this.num_proceso = +params.get('num_proceso')!; // Obtiene el ID como número
      console.log('num_proceso:', this.num_proceso);
    });

    if (this.id !== null && this.id > 0) {
      this.getControlPrenatal();
      this.getPrimeraConsulta();
      this.getVacunacion();
    } else {
      console.log('No se proporcionó un ID válido.');
    }

    this.cargarMetodosFracaso();
    this.cargarRiesgos();
    this.cargarTipoDm();
    this.cargarBiologicos();
  }

  cargarMetodosFracaso(): void {
    this.metodoFracasoService.getMetodos().subscribe(response => {
      this.metodosFracaso = response.metodo;
    }, error => {
      console.error('Error al cargar métodos de fracaso:', error);
    });
  }

  cargarRiesgos(): void {
    this.riesgoService.getRiesgos().subscribe(response => {
      this.riesgos = response.riesgo;
      console.log(response)
    }, error => {
      console.error('Error al cargar los riesgos:', error);
    });
  }

  cargarBiologicos(): void {
    this.biologicoService.getBiologicos().subscribe(response => {
      this.biologicos = response.biologico;
      console.log(response)
    }, error => {
      console.error('Error al cargar los biologicos:', error);
    });
  }

  cargarTipoDm(): void {
    this.tipoDmService.getTipos().subscribe(response => {
      this.tiposDm = response.tipos;
      console.log(response)
    }, error => {
      console.error('Error al cargar los tipos de diabetes:', error);
    });
  }

  toggleTabs(tabNumber: number) {
    // Definimos los grupos de tabs permitidos para el cambio
    const grupo1 = [1, 2];
    const grupo2 = [3, 4];
    const grupo3 = [5];


    if (this.isEditing) {

      if (grupo1.includes(this.openTab)) {
        if (!grupo1.includes(tabNumber)) {
          this.alertService.infoAlert('Advertencia', 'Por favor, guarda los cambios antes de cambiar de pestaña.');
          return;
        }
      }

      else if (grupo2.includes(this.openTab)) {
        if (!grupo2.includes(tabNumber)) {
          this.alertService.infoAlert('Advertencia', 'Por favor, guarda los cambios antes de cambiar de pestaña.');
          return;
        }
      }

      else if (grupo3.includes(this.openTab)) {
        if (!grupo3.includes(tabNumber)) {
          this.alertService.infoAlert('Advertencia', 'Por favor, guarda los cambios antes de cambiar de pestaña.');
          return;
        }
      }
    }

    this.openTab = tabNumber;
  }


  toggleEdit() {
    if (!this.isReadOnly) return;
    this.isReadOnly = false;
    this.isEditing = true;
  }

  toggleEditPrimeraConsulta() {
    if (!this.isReadOnlyPrimeraConsulta) return;
    this.isReadOnlyPrimeraConsulta = false;
    this.isEditing = true;
  }

  toggleEditVacunacion() {
    if (!this.isReadOnlyVacunacion) return;
    this.isReadOnlyVacunacion = false;
    this.isEditing = true;
  }

  guardarControlPrenatal(): void {

    if (this.id_control) {
      // Editar usuario existente
      this.controlPrenatalService.updateControlPrenatal(this.id_control, this.controlPrenatal).subscribe({
        next: (response) => {
          console.log('Control Prenatal actualizado:', response);
          this.alertService.successAlert('Exito', response.message);
        },
        error: (error) => {
          console.error('Error al actualizar el Control Prenatal:', error);
          this.alertService.errorAlert('Error', error.error.message);
        }
      });
    } else {

      if (this.id !== null) {
        this.controlPrenatal.id_usuario = this.id; // Asigna el ID al objeto controlPrenatal
      }
      this.controlPrenatal.num_proceso = this.num_proceso !== null ? this.num_proceso : 0;

      console.log(this.controlPrenatal);
      this.controlPrenatalService.createControl(this.controlPrenatal).subscribe({
        next: (response) => {
          console.log('Control prenatal creado:', response);
          this.alertService.successAlert('Exito', response.message);
        },
        error: (error) => {
          console.error('Error al crear el control prenatal:', error);
          this.alertService.errorAlert('Error', error.error.message);
        }
      });
    }
  }

  getControlPrenatal(): void {
    if (this.id !== null && this.id > 0) { // Verificar que el ID sea válido
      this.controlPrenatalService.getControlById(this.id, this.num_proceso ?? 0).subscribe(
        (response) => {
          this.controlPrenatal = response.Control;
          console.log(response);
          this.id_control = response.Control.cod_control ?? null;
          this.isReadOnly = true;

        },
        (error) => {
          console.error('Error al obtener el usuario:', error);

        }
      );
    } else {
      console.log('No se proporcionó ID, se asume que se va a ingresar nueva informacion.');
    }
  }

  guardarPrimeraConsulta(): void {

    if (this.id_primeraConsulta) {
      // Editar usuario existente
      this.primeraConsultaService.updatePrimeraConsulta(this.id_primeraConsulta, this.primeraConsulta).subscribe({
        next: (response) => {
          console.log('Primera Consulta actualizada:', response);
          this.alertService.successAlert('Exito', response.message).then(() => {
            this.isReadOnlyPrimeraConsulta = true;
            this.isEditing = false;
          });
        },
        error: (error) => {
          console.error('Error al actualizar la primera consulta:', error);
          this.alertService.errorAlert('Error', error.error.message);
        }
      });
    } else {

      if (this.id !== null) {
        this.primeraConsulta.id_usuario = this.id;
      }
      this.primeraConsulta.num_proceso = this.num_proceso !== null ? this.num_proceso : 0;
      console.log(this.primeraConsulta);
      this.primeraConsultaService.createConsulta(this.primeraConsulta).subscribe({
        next: (response) => {
          console.log('Primera Consulta creada:', response);
          this.alertService.successAlert('Exito', response.message).then(() => {
            this.id_primeraConsulta = response.consulta.cod_consulta ?? null;
            this.isEditing = false;
            console.log(response);
          });
        },
        error: (error) => {
          console.error('Error al crear la primera consulta:', error);
          this.alertService.errorAlert('Error', error.error.message);
        }
      });
    }
  }

  getPrimeraConsulta(): void {
    if (this.id !== null && this.id > 0) { // Verificar que el ID sea válido
      this.primeraConsultaService.getPrimeraConsulta(this.id, this.num_proceso ?? 0).subscribe(
        (response) => {
          this.primeraConsulta = response.consulta;
          console.log(response);
          this.isReadOnlyPrimeraConsulta = true;

          this.id_primeraConsulta = response.consulta.cod_consulta ?? null;
        },
        (error) => {
          console.error('Error al obtener la informacion:', error);

        }
      );
    } else {
      console.log('No se proporcionó ID, se asume que se va a crear una nueva consulta.');
    }
  }

  guardarVacunacion(): void {

    if (this.id_vacunacion) {

      this.vacunacionService.updateVacunacion(this.id_vacunacion, this.vacunacion).subscribe({
        next: (response) => {
          console.log('Vacunacion actualizada:', response);
          this.alertService.successAlert('Exito', response.message).then(() => {
            this.isReadOnlyVacunacion = true;
            this.isEditing = false;
          });
        },
        error: (error) => {
          console.error('Error al actualizar la vacunacion:', error);
          this.alertService.errorAlert('Error', error.error.message);
        }
      });
    } else {

      if (this.id !== null) {
        this.vacunacion.id_usuario = this.id;
      }

      console.log(this.vacunacion);
      this.vacunacionService.createVacunacion(this.vacunacion).subscribe({
        next: (response) => {
          console.log('Vacunacion creada:', response);
          this.alertService.successAlert('Exito', response.message).then(() => {
            this.isReadOnlyVacunacion = true;
            this.id_vacunacion = response.vacunacion.cod_vacunacion ?? null;
            this.isEditing = false;
          })
        },
        error: (error) => {
          console.error('Error al crear la Vacunacion:', error);
          this.alertService.errorAlert('Error', error.error.message);
        }
      });
    }
  }

  getVacunacion(): void {
    if (this.id !== null && this.id > 0) { // Verificar que el ID sea válido
      this.vacunacionService.getVacunacionById(this.id).subscribe(
        (response) => {
          this.vacunacion = response.vacunacion;
          console.log(response);
          this.id_vacunacion = response.vacunacion.cod_vacunacion ?? null;
          this.isReadOnlyVacunacion = true;

        },
        (error) => {
          console.error('Error al obtener la vacunacion:', error);

        }
      );
    } else {
      console.log('No se proporcionó ID, se asume que se va a ingresar nueva informacion de vacunacion.');
    }
  }

  volver() {
    this.router.navigate(['/ruta-gestante', this.id]); // Navegar a la ruta con el ID
  }

}
