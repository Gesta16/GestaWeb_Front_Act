import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HemoclasificacionService } from '../../../../Services/hemoclasificacion.service';
import { Hemoclasificacion } from '../../../../Models/Hemoclasificacion.model';
import { DatosRecienNacido } from '../../../../Models/Datos-recien-nacido.model';
import { EstudioHipotiroidismo } from '../../../../Models/Estudio-hipotiroidismo.model';
import { RutaPYMS } from '../../../../Models/Ruta-pyms.model';
import { TamizacionNeonatal } from '../../../../Models/Tamizacion-neonatal.model';
import { DatosRecienNacidoService } from '../../../../Services/datos-recien-nacido.service';
import { EstudioHipotiroidismoService } from '../../../../Services/estudio-hipotiroidismo.service';
import { RutaPymsService } from '../../../../Services/ruta-pyms.service';
import { TamizacionNeonatalService } from '../../../../Services/tamizacion-neonatal.service';
import { AlertService } from '../../../../Services/alert.service';
import { MenuService } from '../../../../Services/menu.service';
@Component({
  selector: 'app-ruta-6',
  templateUrl: './ruta-6.component.html',
  styleUrl: './ruta-6.component.css'
})
export class Ruta6Component {

  openTab = 1;
  datosRecienNacido: DatosRecienNacido;
  estudioHipotiroidismo: EstudioHipotiroidismo;
  nuevaRuta: RutaPYMS;
  nuevaTamizacion: TamizacionNeonatal;
  hemoclasificacion: Hemoclasificacion[] = [];
  id: number | null = null;
  num_proceso: number | null = null;

  ReadonlyDatosRecienNacido = false;
  id_DatosRecienNacido: number | null = null;
  ReadonlyEstudioHipotiroidismo = false;
  id_EstudioHipotiroidismo: number | null = null;
  ReadonlyTamizacionNeonatal = false;
  id_TamizacionNeonatal: number | null = null;
  ReadonlyRutaPYMS = false;
  id_RutaPYMS: number | null = null;

  isEditing = false;

  isExpanded = true;
  isVisible = true;

  mostrarCampos: {[key:string]:boolean} = {
    reali_prueb_trepo_recien_nacido:false,
    reali_tami_auditivo: false,
    reali_tami_cardiopatia_congenita: false,
    reali_tami_visual: false,
    aplico_vacuna_bcg: false,
    aplico_vacuna_hepatitis: false,
    reali_entrega_carnet: false
  }

  constructor(
    private route: ActivatedRoute,
    private datosRecienNacidoService: DatosRecienNacidoService,
    private estudioHipotiroidismoService: EstudioHipotiroidismoService,
    private rutaPYMSService: RutaPymsService,
    private hemoclasificacionService: HemoclasificacionService,
    private tamizacionNeonatalService: TamizacionNeonatalService,
    private router: Router,
    private alertService:AlertService,
    private menuService:MenuService
  ) {
    this.datosRecienNacido = new DatosRecienNacido();
    this.estudioHipotiroidismo = new EstudioHipotiroidismo();
    this.nuevaRuta = new RutaPYMS();
    this.nuevaTamizacion = new TamizacionNeonatal();
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

      this.getDatosRecienNacido();
      this.getEstudioHipotiroidismo();
      this.getTamizacionNeonatal();
      this.getRutaPYMS();

    } else {
      console.log('No se proporcionó un ID válido.');
    }

    this.getHemoclasificaciones();
    this.menuService.isExpanded$.subscribe(isExpanded => {
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


  toggleEditDatosRecienNacido() {
    if (!this.ReadonlyDatosRecienNacido) return;
    this.ReadonlyDatosRecienNacido = false;
    this.isEditing = true;
  }

  toggleEditEstudioHipotiroidismo() {
    if (!this.ReadonlyEstudioHipotiroidismo) return;
    this.ReadonlyEstudioHipotiroidismo = false;
    this.isEditing = true;
  }

  toggleEditTamizacionNeonatal() {
    if (!this.ReadonlyTamizacionNeonatal) return;
    this.ReadonlyTamizacionNeonatal = false;
    this.isEditing = true;
  }

  toggleEditRutaPYMS() {
    if (!this.ReadonlyRutaPYMS) return;
    this.ReadonlyRutaPYMS = false;
    this.isEditing = true;
  }

  // habilitar o dehabilitar los campos
  onPospartoChange(campo:string){
    const valorSeleccionado = Number(this.nuevaTamizacion[campo]);
    const valorSeleccionado1 = Number(this.nuevaRuta [campo]);
    switch (campo){
      case 'reali_prueb_trepo_recien_nacido':
        this.mostrarCampos['reali_prueb_trepo_recien_nacido'] = valorSeleccionado === 1;
        if (!this.mostrarCampos['reali_prueb_trepo_recien_nacido']){
          this.nuevaTamizacion.pruetreponemica = null,
          this.nuevaTamizacion.fec_pruetrepo = null;
        }
        break;

      case 'reali_tami_auditivo':
        this.mostrarCampos['reali_tami_auditivo'] = valorSeleccionado === 1;
        if (!this.mostrarCampos['reali_tami_auditivo']){
          this.nuevaTamizacion.tamiza_aud = null;
        }
        break;
      
      case 'reali_tami_cardiopatia_congenita':
        this.mostrarCampos['reali_tami_cardiopatia_congenita'] = valorSeleccionado === 1;
        if (!this.mostrarCampos['reali_tami_cardiopatia_congenita']){
          this.nuevaTamizacion.tamiza_cardi = null;
        }
        break;
      
      case 'reali_tami_visual':
        this.mostrarCampos['reali_tami_visual'] = valorSeleccionado === 1;
        if (!this.mostrarCampos['reali_tami_visual']){
          this.nuevaTamizacion.tamiza_visual = null;
        }
        break;
        
      // Ruta PYMS
      case 'aplico_vacuna_bcg':
        this.mostrarCampos['aplico_vacuna_bcg'] = valorSeleccionado1 === 1;
        if (!this.mostrarCampos['aplico_vacuna_bcg']){
          this.nuevaRuta.fec_bcg = null;
        }
        break;
      
      case 'aplico_vacuna_hepatitis':
        this.mostrarCampos['aplico_vacuna_hepatitis'] = valorSeleccionado1 === 1;
        if (!this.mostrarCampos['aplico_vacuna_hepatitis']){
          this.nuevaRuta.fec_hepatitis = null;
        }
        break;
      
      case 'reali_entrega_carnet':
        this.mostrarCampos['reali_entrega_carnet'] = valorSeleccionado1 === 1;
        if (!this.mostrarCampos['reali_entrega_carnet']){
          this.nuevaRuta.fec_entrega = null;
        }
        break;
    }
  }

  getHemoclasificaciones() {
    this.hemoclasificacionService.getHemoclasificaciones().subscribe(response => {
      if (response.estado === 'Ok') {
        this.hemoclasificacion = response['Hemoclasificacion'];
      }
    }, error => {
      console.error('Error al obtener la hemoclasificacion', error);
    });
  }

  guardarDatosRecienNacido() {
    if (this.id_DatosRecienNacido) {
      // Editar registro existente
      this.datosRecienNacidoService.updateDatosRecienNacido(this.id_DatosRecienNacido, this.datosRecienNacido).subscribe({
        next: (response) => {
          this.alertService.successAlert('Exito',response.message).then(()=>{
            this.ReadonlyDatosRecienNacido = true;
            this.isEditing = false;
          });
        },
        error: (error) => {
          console.error('Error al actualizar el registro de recién nacido:', error);
          this.alertService.errorAlert('Error',error.error.message);
        }
      });
    } else {
      if (this.id !== null) {
        this.datosRecienNacido.id_usuario = this.id;
      }
      this.datosRecienNacido.num_proceso = this.num_proceso !== null ? this.num_proceso : 0;


      // Crear nuevo registro de recién nacido
      this.datosRecienNacidoService.crearDatosRecienNacido(this.datosRecienNacido).subscribe({
        next: (response) => {
          console.log(response);
          this.alertService.successAlert('Exito',response.message).then(()=>{
            this.id_DatosRecienNacido = response.cod_recien ?? null;
            this.ReadonlyDatosRecienNacido = true;
            this.isEditing = false;
          });
        },
        error: (error) => {
          this.alertService.errorAlert('Error', error.error.message);
          console.error('Error al guardar el registro de recién nacido', error.error);
        }
      });
    }
  }

  getDatosRecienNacido(): void {
    if (this.id !== null && this.id > 0) {
      this.datosRecienNacidoService.getDatosRecienNacidobyId(this.id, this.num_proceso ?? 0).subscribe(
        (response) => {
          this.datosRecienNacido = response.data;
          console.log(response);
          this.ReadonlyDatosRecienNacido = true;
          this.id_DatosRecienNacido = response.data.cod_recien ?? null;
        },
        (error) => {
          console.error('Error al obtener los datos del recién nacido:', error);
        }
      );
    } else {
      console.log('No se proporcionó ID, se asume que se va a ingresar nuevos datos del recién nacido.');
    }
  }


  guardarEstudioHipotiroidismo() {
    if (this.id_EstudioHipotiroidismo) {
      // Editar registro existente
      this.estudioHipotiroidismoService.updateEstudioHipotiroidismo(this.id_EstudioHipotiroidismo, this.estudioHipotiroidismo).subscribe({
        next: (response) => {
          console.log('Estudio de hipotiroidismo actualizado:', response);
          this.alertService.successAlert('Exito',response.message).then(()=>{
            this.ReadonlyEstudioHipotiroidismo = true;
            this.isEditing = false;
          });
        },
        error: (error) => {
          console.error('Error al actualizar el registro de estudio de hipotiroidismo:', error);
          this.alertService.errorAlert('Error',error.error.message);
        }
      });
    } else {
      if (this.id !== null) {
        this.estudioHipotiroidismo.id_usuario = this.id;
      }
      this.estudioHipotiroidismo.num_proceso = this.num_proceso !== null ? this.num_proceso : 0;


      // Crear nuevo registro de estudio de hipotiroidismo
      this.estudioHipotiroidismoService.crearEstudioHipotiroidismo(this.estudioHipotiroidismo).subscribe({
        next: (response) => {
          this.alertService.successAlert('Exito',response.message).then(()=>{
            this.id_EstudioHipotiroidismo = response.cod_estudio ?? null;
            this.ReadonlyEstudioHipotiroidismo = true;
            this.isEditing = false;
          });
        },
        error: (error) => {
          this.alertService.errorAlert('Error',error.error.message);
          console.error('Error al guardar el registro de estudio de hipotiroidismo', error.error);
        }
      });
    }
  }

  getEstudioHipotiroidismo(): void {
    if (this.id !== null && this.id > 0) {
      this.estudioHipotiroidismoService.getEstudioHipotiroidismobyId(this.id, this.num_proceso ?? 0).subscribe(
        (response) => {
          this.estudioHipotiroidismo = response.data;
          console.log(response);
          this.ReadonlyEstudioHipotiroidismo = true;
          this.id_EstudioHipotiroidismo = response.data.cod_estudio ?? null;
        },
        (error) => {
          console.error('Error al obtener los datos del estudio de hipotiroidismo:', error);
        }
      );
    } else {
      console.log('No se proporcionó ID, se asume que se va a ingresar nuevos datos del estudio de hipotiroidismo.');
    }
  }



  guardarRutaPYMS() {
    if (this.id_RutaPYMS) {
      // Editar registro existente
      this.rutaPYMSService.updateRuta(this.id_RutaPYMS, this.nuevaRuta).subscribe({
        next: (response) => {
          this.alertService.successAlert('Exito', response.message).then(()=>{
            this.ReadonlyRutaPYMS = true;
            this.isEditing = false;
          });
        },
        error: (error) => {
          console.error('Error al actualizar el registro de ruta:', error);
          this.alertService.errorAlert('Error', error.error.message);
        }
      });
    } else {
      if (this.id !== null) {
        this.nuevaRuta.id_usuario = this.id;
      }
      this.nuevaRuta.num_proceso = this.num_proceso !== null ? this.num_proceso : 0;


      // Crear nuevo registro de ruta
      this.rutaPYMSService.crearRuta(this.nuevaRuta).subscribe({
        next: (response) => {
          this.alertService.successAlert('Exito',response.message).then(()=>{
            this.id_RutaPYMS = response.cod_ruta ?? null;
            this.ReadonlyRutaPYMS = true;
            this.isEditing = false;
          });
        },
        error: (error) => {
          this.alertService.errorAlert('Error',error.error.message);
          console.error('Error al guardar el registro de ruta', error.error);
        }
      });
    }
  }

  getRutaPYMS(): void {
    if (this.id !== null && this.id > 0) {
      this.rutaPYMSService.getRutaPymsId(this.id, this.num_proceso ?? 0).subscribe(
        (response) => {
          this.nuevaRuta = response.data;
          console.log(response);
          this.ReadonlyRutaPYMS = true;
          this.id_RutaPYMS = response.data.cod_ruta ?? null;
        },
        (error) => {
          console.error('Error al obtener los datos de la ruta PYMS:', error);
        }
      );
    } else {
      console.log('No se proporcionó ID, se asume que se va a ingresar nuevos datos de la ruta PYMS.');
    }
  }



  guardarTamizacionNeonatal() {
    if (this.id_TamizacionNeonatal) {
      // Editar registro existente
      this.tamizacionNeonatalService.updateTamizacion(this.id_TamizacionNeonatal, this.nuevaTamizacion).subscribe({
        next: (response) => {
          console.log('Tamización neonatal actualizada:', response);
          this.alertService.successAlert('Exito',response.message).then(()=>{
            this.ReadonlyTamizacionNeonatal = true;
            this.isEditing = false;
          });
        },
        error: (error) => {
          console.error('Error al actualizar el registro de tamización neonatal:', error);
          this.alertService.errorAlert('Error',error.error.message);
        }
      });
    } else {
      if (this.id !== null) {
        this.nuevaTamizacion.id_usuario = this.id;
      }

      this.nuevaTamizacion.num_proceso = this.num_proceso !== null ? this.num_proceso : 0;


      // Crear nuevo registro de tamización neonatal
      this.tamizacionNeonatalService.crearTamizacion(this.nuevaTamizacion).subscribe({
        next: (response) => {
          this.alertService.successAlert('Exito',response.message).then(()=>{
            this.id_TamizacionNeonatal = response.cod_tamizacion ?? null;
            this.ReadonlyTamizacionNeonatal = true;
            this.isEditing = false;
          });
        },
        error: (error) => {
          this.alertService.errorAlert('Error',error.error.message);
          console.error('Error al guardar el registro de tamización neonatal', error.error);
        }
      });
    }
  }

  getTamizacionNeonatal(): void {
    if (this.id !== null && this.id > 0) {
      this.tamizacionNeonatalService.getTamizacionbyId(this.id, this.num_proceso ?? 0).subscribe(
        (response) => {
          this.nuevaTamizacion = response.data;
          console.log(response);
          this.ReadonlyTamizacionNeonatal = true;
          this.id_TamizacionNeonatal = response.data.cod_tamizacion ?? null;
        },
        (error) => {
          console.error('Error al obtener los datos de la tamización neonatal:', error);
        }
      );
    } else {
      console.log('No se proporcionó ID, se asume que se va a ingresar nuevos datos de tamización neonatal.');
    }
  }



  volver() {
    this.router.navigate(['/ruta-gestante', this.id]);
  }

}
