import { Component } from '@angular/core';
import { PruebaVDRL } from '../../../../Models/Prueba-VDRL.model';
import { ActivatedRoute, Router } from '@angular/router';
import { PruebaVdrlService } from '../../../../Services/prueba-vdrl.service';
import { TerminacionGestacion } from '../../../../Models/Teminacion-gestacion.model';
import { MetodoAnticonceptivo } from '../../../../Models/Metodo-anticonceptivo.model';
import { MortalidadPerinatal } from '../../../../Models/Mortalidad-perinatal.model';
import { FinalizacionGestacion } from '../../../../Models/Finalizacion-gestacion.model';
import { LaboratorioIntraparto } from '../../../../Models/Laboratorio-intraparto.model';
import { SeguimientoPostObstetrico } from '../../../../Models/Seguimiento-post-obstetrico.model';
import { MortalidadPreparto } from '../../../../Models/Mortalidad-preparto.model';
import { TerminacionGestacionService } from '../../../../Services/terminacion-gestacion.service';
import { MetodoAnticonceptivoService } from '../../../../Services/metodo-anticonceptivo.service';
import { FinalizacionGestacionService } from '../../../../Services/finalizacion-gestacion.service';
import { LaboratorioIntrapartoService } from '../../../../Services/laboratorio-intraparto.service';
import { SeguimientoPostObstetricoService } from '../../../../Services/seguimiento-post-obstetrico.service';
import { MortalidadPerinatalService } from '../../../../Services/mortalidad-perinatal.service';
import { MortalidadPrepartoService } from '../../../../Services/mortalidad-preparto.service';
import { AlertService } from '../../../../Services/alert.service';
import { response } from 'express';
import { MenuService } from '../../../../Services/menu.service';

@Component({
  selector: 'app-ruta-5',
  templateUrl: './ruta-5.component.html',
  styleUrl: './ruta-5.component.css'
})
export class Ruta5Component {

  openTab = 1;
  terminaciones: TerminacionGestacion[] = [];
  metodos: MetodoAnticonceptivo[] = [];
  pruebaVDRL: PruebaVDRL[] = [];
  mortalidadPerinatal: MortalidadPerinatal[] = [];
  finalizacionGestacion: FinalizacionGestacion;
  laboratorioIntraparto: LaboratorioIntraparto;
  seguimiento: SeguimientoPostObstetrico;
  mortalidadPreparto: MortalidadPreparto;
  id: number | null = null;
  num_proceso: number | null = null;


  ReadonlyFinalizacionGestacion = false;
  id_FinalizacionGestacion: number | null = null;
  ReadonlyLaboratorioIntraparto = false;
  id_LaboratorioIntraparto: number | null = null;
  ReadonlySeguimiento = false;
  id_Seguimiento: number | null = null;
  ReadonlyMortalidadPreparto = false;
  id_MortalidadPreparto: number | null = null;

  isEditing = false;

  isExpanded = true;
  isVisible = true;

  mostrarCampos:{[key:string]:boolean}={
    reali_prueb_trepo_rapi_sifilis_intra: false,
    reali_prueb_no_trepo_vdrl_sifilis_intra: false,
    rec_sifilis: false,
    reali_prueb_rapi_vih: false
  }

  constructor(
    private route: ActivatedRoute,
    private terminacionGestacionService: TerminacionGestacionService,
    private metodoAnticonceptivoService: MetodoAnticonceptivoService,
    private pruebaVDRLService: PruebaVdrlService,
    private finalizacionGestacionServicio: FinalizacionGestacionService,
    private laboratorioIntrapartoServicio: LaboratorioIntrapartoService,
    private seguimientoPostObstetricoServicio: SeguimientoPostObstetricoService,
    private mortalidadPerinatalService: MortalidadPerinatalService,
    private mortalidadPrepartoService: MortalidadPrepartoService,
    private router: Router,
    private alertService:AlertService,
    private menuService:MenuService,
  ) {
    this.finalizacionGestacion = new FinalizacionGestacion();
    this.laboratorioIntraparto = new LaboratorioIntraparto();
    this.seguimiento = new SeguimientoPostObstetrico();
    this.mortalidadPreparto = new MortalidadPreparto();
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

      this.getFinalizacionGestacion();
      this.getLaboratoriosIntraparto();
      this.getSeguimiento();
      this.getMortalidadPreparto();

    } else {
      console.log('No se proporcionó un ID válido.');
    }

    this.getTerminaciones();
    this.getMetodosAnticonceptivos();
    this.getPruebaVDRL();
    this.getMortalidadPerinatal();
    this.menuService.isExpanded$.subscribe(isExpanded =>{
      this.isExpanded = isExpanded;
    });
  }

  toggleTabs(tabNumber: number) {
    if (this.isEditing) {
      this.alertService.infoAlert('Advertencia', 'Por favor, guarda los cambios antes de cambiar de pestaña.');
      return;
    }
    this.openTab = tabNumber;
  }

  toggleEditFinalizacionGestacion() {
    if (!this.ReadonlyFinalizacionGestacion) return;
    this.ReadonlyFinalizacionGestacion = false;
    this.isEditing = true;
  }

  toggleEditLaboratorioIntraparto() {
    if (!this.ReadonlyLaboratorioIntraparto) return;
    this.ReadonlyLaboratorioIntraparto = false;
    this.isEditing = true;
  }

  toggleEditSeguimiento() {
    if (!this.ReadonlySeguimiento) return;
    this.ReadonlySeguimiento = false;
    this.isEditing = true;
  }

  toggleEditMortalidadPreparto() {
    if (!this.ReadonlyMortalidadPreparto) return;
    this.ReadonlyMortalidadPreparto = false;
    this.isEditing = true;
  }

  onPrepartoChange(campo:string){
    const valorSeleccionado = Number(this.laboratorioIntraparto[campo]);
    switch (campo){
      case 'reali_prueb_trepo_rapi_sifilis_intra':
        this.mostrarCampos['reali_prueb_trepo_rapi_sifilis_intra'] = valorSeleccionado === 1;
        if (!this.mostrarCampos['reali_prueb_trepo_rapi_sifilis_intra']){
          this.laboratorioIntraparto.pru_sifilis = null,
          this.laboratorioIntraparto.fec_sifilis = null;
        }
        break;

      case 'reali_prueb_no_trepo_vdrl_sifilis_intra':
        this.mostrarCampos['reali_prueb_no_trepo_vdrl_sifilis_intra'] = valorSeleccionado === 1;
        if (!this.mostrarCampos['reali_prueb_no_trepo_vdrl_sifilis_intra']){
          this.laboratorioIntraparto.cod_vdrl = null,
          this.laboratorioIntraparto.fec_vdrl = null;
        }
        break;

      case 'rec_sifilis':
        this.mostrarCampos['rec_sifilis'] = valorSeleccionado === 1;
        if (!this.mostrarCampos['rec_sifilis']){
          this.laboratorioIntraparto.fec_tratamiento = null;
        }
        break;

      case 'reali_prueb_rapi_vih':
        this.mostrarCampos['reali_prueb_rapi_vih'] = valorSeleccionado === 1;
        if (!this.mostrarCampos['reali_prueb_rapi_vih']){
          this.laboratorioIntraparto.pru_vih = null,
          this.laboratorioIntraparto.fec_vih = null;
        }
        break;
    }
  }

  getTerminaciones() {
    this.terminacionGestacionService.getTerminacionGestacion().subscribe(
      response => {
      if (response.estado === 'Ok') {
        this.terminaciones = response['Terminacion gestacion'];
      }
    }, error => {
      console.error('Error al obtener terminaciones', error);
    });
  }

  getMetodosAnticonceptivos() {
    this.metodoAnticonceptivoService.getMetodosAnticonceptivos().subscribe(
      response => {
      if (response.estado === 'Ok') {
        this.metodos = response['Metodo Anticonceptivo'];
      }
    }, error => {
      console.error('Error al obtener los metodos', error);
    });
  }

  getPruebaVDRL() {
    this.pruebaVDRLService.getPruebaVDRL().subscribe(
      response => {
      if (response.estado === 'Ok') {
        this.pruebaVDRL = response['Prueba No Treponemica VDRL'];
      }
    }, error => {
      console.error('Error al obtener las pruebas VDRL', error);
    });
  }

  getMortalidadPerinatal() {
    this.mortalidadPerinatalService.getMortalidadPerinatal().subscribe(
      response => {
      if (response.estado === 'Ok') {
        this.mortalidadPerinatal = response['Mortalidad Perinatal'];
      }
    }, error => {
      console.error('Error al obtener la mortalidad perinatal', error);
    });
  }

  guardarFinalizacionGestacion() {

    if (this.id_FinalizacionGestacion) {

      this.finalizacionGestacionServicio.updateFinalizacionGestacion(this.id_FinalizacionGestacion, this.finalizacionGestacion).subscribe({
        next: (response) => {
          console.log('Finalización de gestación actualizada:', response);
          this.alertService.successAlert('Exito', response.mensaje).then(()=>{
            this.ReadonlyFinalizacionGestacion = true;
            this.isEditing = false;
          });
        },
        error: (error) => {
          console.error('Error al actualizar la finalización de gestación:', error);
          this.alertService.errorAlert('Error', error.error.message);
        }
      });
    } else {
      if (this.id !== null) {
        this.finalizacionGestacion.id_usuario = this.id;
      }

      this.finalizacionGestacion.num_proceso = this.num_proceso !== null ? this.num_proceso : 0;
      this.finalizacionGestacionServicio.crearFinalizacionGestacion(this.finalizacionGestacion).subscribe({
        next: (response) => {
          this.alertService.successAlert('Exito', response.mensaje).then(()=>{
            this.id_FinalizacionGestacion = response.cod_finalizacion ?? null;
            this.ReadonlyFinalizacionGestacion = true;
            this.isEditing = false;
            console.log(response);
            console.log(this.id_FinalizacionGestacion);
          })
        },
        error: (error) => {
          this.alertService.errorAlert('Error', error.error.message);
          console.error('Error al guardar la finalización de gestación', error.error);
        }
      });
    }
  }

  getFinalizacionGestacion(): void {
    if (this.id !== null && this.id > 0) {
      this.finalizacionGestacionServicio.getFinalizacionGestacionbyId(this.id, this.num_proceso ?? 0).subscribe(
        (response) => {
          this.finalizacionGestacion = response.finalizacion;
          console.log(response);
          this.ReadonlyFinalizacionGestacion = true;
          this.id_FinalizacionGestacion = response.finalizacion.cod_finalizacion ?? null;
        },
        (error) => {
          console.error('Error al obtener los datos de la finalización de la gestación:', error);
        }
      );
    } else {
      console.log('No se proporcionó ID, se asume que se va a ingresar nuevos datos de la finalización de la gestación.');
    }
  }


  guardarLaboratorioIntraparto() {
    if (this.id_LaboratorioIntraparto) {
      // Editar laboratorio intraparto existente
      this.laboratorioIntrapartoServicio.updateLaboratorioIntraparto(this.id_LaboratorioIntraparto, this.laboratorioIntraparto).subscribe({
        next: (response) => {
          console.log('Laboratorio intraparto actualizado:', response);
          this.alertService.successAlert('Exito', response.mensaje).then(()=>{
            this.ReadonlyLaboratorioIntraparto = true;
            this.isEditing = false;
          });
        },
        error: (error) => {
          console.error('Error al actualizar el laboratorio intraparto:', error);
          this.alertService.errorAlert('Error', error.error.message);
        }
      });
    } else {
      if (this.id !== null) {
        this.laboratorioIntraparto.id_usuario = this.id;
      }

      this.laboratorioIntraparto.num_proceso = this.num_proceso !== null ? this.num_proceso : 0;

      // Crear nuevo laboratorio intraparto
      this.laboratorioIntrapartoServicio.crearLaboratorio(this.laboratorioIntraparto).subscribe({
        next: (response) => {
          this.alertService.successAlert('Exito', response.mensaje).then(()=>{
            this.id_LaboratorioIntraparto = response.cod_intraparto ?? null;
            this.ReadonlyLaboratorioIntraparto = true;
            this.isEditing = false;
            console.log(response);
            console.log(this.id_LaboratorioIntraparto);
          });
        },
        error: (error) => {
          this.alertService.errorAlert('Error', error.error.message);
          console.error('Error al guardar el registro de laboratorio intraparto', error.error);
        }
      });
    }
  }



  getLaboratoriosIntraparto(): void {
    if (this.id !== null && this.id > 0) {
      this.laboratorioIntrapartoServicio.getLaboratoriobyId(this.id, this.num_proceso ?? 0).subscribe(
        (response) => {
          this.laboratorioIntraparto = response.data;
          console.log(response);
          this.ReadonlyLaboratorioIntraparto = true;
          this.id_LaboratorioIntraparto = response.data.cod_intraparto ?? null;
        },
        (error) => {
          console.error('Error al obtener los datos del laboratorio intraparto:', error);
        }
      );
    } else {
      console.log('No se proporcionó ID, se asume que se va a ingresar nuevos datos del laboratorio intraparto.');
    }
  }



  guardarSeguimiento() {
    if (this.id_Seguimiento) {
      // Editar seguimiento existente
      this.seguimientoPostObstetricoServicio.updateSeguimientoPostObstetrico(this.id_Seguimiento, this.seguimiento).subscribe({
        next: (response) => {
          console.log('Seguimiento actualizado:', response);
          this.alertService.successAlert('Exito', response.mensaje).then(()=>{
            this.ReadonlySeguimiento = true;
            this.isEditing = false;
          });
        },
        error: (error) => {
          console.error('Error al actualizar el seguimiento:', error);
          this.alertService.errorAlert('Error', error.error.message);
        }
      });
    } else {
      if (this.id !== null) {
        this.seguimiento.id_usuario = this.id;
      }
      this.seguimiento.num_proceso = this.num_proceso !== null ? this.num_proceso : 0;

      // Crear nuevo seguimiento
      this.seguimientoPostObstetricoServicio.crearSeguimiento(this.seguimiento).subscribe({
        next: (response) => {
         this.alertService.successAlert('Exito',response.mensaje).then(()=>{
          this.id_Seguimiento = response.cod_evento ?? null;
            this.ReadonlySeguimiento = true;
            this.isEditing = false;
            console.log(response);
            console.log(this.id_Seguimiento);
         });
        },
        error: (error) => {
          this.alertService.errorAlert('Error', error.error.message);
          console.error('Error al guardar el seguimiento', error.error);
        }
      });
    }
  }


  getSeguimiento(): void {
    if (this.id !== null && this.id > 0) {
      this.seguimientoPostObstetricoServicio.getSeguimientobyId(this.id, this.num_proceso ?? 0).subscribe(
        (response) => {
          this.seguimiento = response.seguimiento;
          console.log(response);
          this.ReadonlySeguimiento = true;
          this.id_Seguimiento = response.seguimiento.cod_evento ?? null;
        },
        (error) => {
          console.error('Error al obtener los datos del seguimiento:', error);
        }
      );
    } else {
      console.log('No se proporcionó ID, se asume que se va a ingresar nuevos datos del seguimiento.');
    }
  }


  guardarMortalidadPreparto() {
    if (this.id_MortalidadPreparto) {
      // Editar mortalidad preparto existente
      this.mortalidadPrepartoService.updateMortalidadPreparto(this.id_MortalidadPreparto, this.mortalidadPreparto).subscribe({
        next: (response) => {
          console.log('Mortalidad preparto actualizada:', response);
          this.alertService.successAlert('Exito', response.mensaje).then(()=>{
            this.ReadonlyMortalidadPreparto = true;
            this.isEditing = false;
          });
        },
        error: (error) => {
          console.error('Error al actualizar la mortalidad preparto:', error);
          this.alertService.errorAlert('Error', error.error.message);
        }
      });
    } else {
      if (this.id !== null) {
        this.mortalidadPreparto.id_usuario = this.id;
      }
      this.mortalidadPreparto.num_proceso = this.num_proceso !== null ? this.num_proceso : 0;
      // Crear nuevo registro de mortalidad preparto
      this.mortalidadPrepartoService.crearMortalidadPreparto(this.mortalidadPreparto).subscribe({
        next: (response) => {
          this.alertService.successAlert('Exito', response.mensaje).then(()=>{
            this.id_MortalidadPreparto = response.cod_mortalpreparto ?? null;
            this.ReadonlyMortalidadPreparto = true;
            this.isEditing = false;
            console.log(response);
            console.log(this.id_MortalidadPreparto);
          });
        },
        error: (error) => {
          this.alertService.errorAlert('Error', error.error.message);
          console.error('Error al guardar el registro de mortalidad preparto', error.error);
        }
      });
    }
  }


  getMortalidadPreparto(): void {
    if (this.id !== null && this.id > 0) {
      this.mortalidadPrepartoService.getMortalidadPrepartobyId(this.id, this.num_proceso ?? 0).subscribe(
        (response) => {
          this.mortalidadPreparto = response.mortalidad;
          console.log(response);
          this.ReadonlyMortalidadPreparto = true;
          this.id_MortalidadPreparto = response.mortalidad.cod_mortalpreparto ?? null;
        },
        (error) => {
          console.error('Error al obtener los datos de mortalidad preparto:', error);
        }
      );
    } else {
      console.log('No se proporcionó ID, se asume que se va a ingresar nuevos datos de mortalidad preparto.');
    }
  }



  volver() {
    this.router.navigate(['/ruta-gestante', this.id, this.num_proceso]);
  }
}
