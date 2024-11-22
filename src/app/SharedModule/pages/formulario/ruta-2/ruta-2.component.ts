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
import { MenuService } from '../../../../Services/menu.service';

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

  mostrarCampos:{ [key:string]: boolean} ={
    fec_anticonceptivo: false,
    recibio_atencion_preconcep: false,
    asis_consul_control_precon: false,
    usu_solicito: false,
    asis_asesoria_ive: false,
    tuvo_embarazos_antes: false,
    
    dm: false,
    asis_conse_lactancia: false,
    asis_conse_pre_vih: false,
    recib_prim_dosis_covid19: false,
    recib_segu_dosis_covid19: false,
    recib_refu_covid19: false,
    recib_dosis_influenza: false,
    recib_dosis_tox_tetanico: false,
    recib_dosis_dpt_a_celular: false
  }

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
    private menuService: MenuService
  ) { }


  ngOnInit(): void {

    this.menuService.isExpanded$.subscribe(isExpanded => {
      this.isExpanded = isExpanded;
    });

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

  // habilitar o dehabilitar los campos
  onControlPrenatalChange(campo:string){
    const valorSeleccionado = Number(this.controlPrenatal[campo]);
    const valorSeleccionado1 = Number(this.primeraConsulta[campo]);
    const valorSeleccionado2 = Number(this.vacunacion[campo]);
    switch (campo){
      // Control prenatal
      case 'fec_anticonceptivo':
        this.mostrarCampos['fec_anticonceptivo'] = valorSeleccionado === 1;
        if (!this.mostrarCampos['fec_anticonceptivo']){
          this.controlPrenatal.cod_fracaso = null;
        }
        break;

      case 'recibio_atencion_preconcep':
        this.mostrarCampos['recibio_atencion_preconcep'] = valorSeleccionado === 1;
        if (!this.mostrarCampos['recibio_atencion_preconcep']){
          this.controlPrenatal.fec_consulta = null;
        }
        break;
      
      case 'asis_consul_control_precon':
        this.mostrarCampos['asis_consul_control_precon'] = valorSeleccionado === 1;
        if(!this.mostrarCampos['asis_consul_control_precon']){
          this.controlPrenatal.fec_control = null;
        }
        break;
      
      case 'usu_solicito':
        this.mostrarCampos['usu_solicito'] = valorSeleccionado === 1;
        if (!this.mostrarCampos['usu_solicito']){
          this.controlPrenatal.asis_asesoria_ive = null;
        }
        break;

      case 'asis_asesoria_ive':
        this.mostrarCampos['asis_asesoria_ive'] = valorSeleccionado ===1;
        if (!this.mostrarCampos['asis_asesoria_ive']){
          this.controlPrenatal.fac_asesoria = null;
        }
        break;
      
      case 'tuvo_embarazos_antes':
        this.mostrarCampos['tuvo_embarazos_antes'] = valorSeleccionado === 1;
        if (!this.mostrarCampos['tuvo_embarazos_antes']){
          this.controlPrenatal.fec_terminacion = null;
        }
        break;
      
      // Primera consulta
      case 'dm':
        this.mostrarCampos['dm'] = valorSeleccionado1 === 1;
        if (!this.mostrarCampos['dm']){
          this.primeraConsulta.cod_dm = null;
        }
        break;

      case 'asis_conse_lactancia':
        this.mostrarCampos['asis_conse_lactancia'] = valorSeleccionado1 === 1;
        if (!this.mostrarCampos['asis_conse_lactancia']){
          this.primeraConsulta.fec_lactancia  = null;
        }
        break;
      
      case 'asis_conse_pre_vih':
        this.mostrarCampos['asis_conse_pre_vih'] = valorSeleccionado1 === 1;
        if(!this.mostrarCampos['asis_conse_pre_vih']){
          this.primeraConsulta.fec_consejeria = null;
        }
        break;

      // Vacunación
      case 'recib_prim_dosis_covid19':
        this.mostrarCampos['recib_prim_dosis_covid19'] = valorSeleccionado2 === 1;
        if (!this.mostrarCampos['recib_prim_dosis_covid19']){
          this.vacunacion.fec_unocovid = null;
        }
        break;
      
      case 'recib_segu_dosis_covid19':
        this.mostrarCampos['recib_segu_dosis_covid19'] = valorSeleccionado2 === 1;
        if (!this.mostrarCampos['recib_segu_dosis_covid19']){
          this.vacunacion.fec_doscovid = null;
        }
        break;
      
      case 'recib_refu_covid19':
        this.mostrarCampos['recib_refu_covid19'] = valorSeleccionado2 === 1;
        if (!this.mostrarCampos['recib_refu_covid19']){
          this.vacunacion.fec_refuerzo = null;
        }
        break;

      case 'recib_dosis_influenza':
        this.mostrarCampos['recib_dosis_influenza'] = valorSeleccionado2 === 1;
        if(!this.mostrarCampos['recib_dosis_influenza']){
          this.vacunacion.fec_influenza =  null;
        }
        break;
      
      case 'recib_dosis_tox_tetanico':
        this.mostrarCampos['recib_dosis_tox_tetanico'] = valorSeleccionado2 === 1;
        if(!this.mostrarCampos['recib_dosis_tox_tetanico']){
          this.vacunacion.fec_tetanico = null;
        }
        break;
      
      case 'recib_dosis_dpt_a_celular':
        this.mostrarCampos['recib_dosis_dpt_a_celular'] = valorSeleccionado2 === 1;
        if(!this.mostrarCampos['recib_dosis_dpt_a_celular']){
          this.vacunacion.fec_dpt = null;
        }
        break;
    }
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
          this.alertService.successAlert('Exito', response.mensaje);
        },
        error: (error) => {
          this.alertService.errorAlert('Error', error.error.mensaje);
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
          this.alertService.successAlert('Exito', response.mensaje);
        },
        error: (error) => {
          this.alertService.errorAlert('Error', error.error.mensaje);
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
          this.alertService.successAlert('Exito', response.mensage).then(() => {
            this.id_primeraConsulta = response.consulta.cod_consulta ?? null;
            this.isEditing = false;
            console.log(this.id_primeraConsulta);
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
