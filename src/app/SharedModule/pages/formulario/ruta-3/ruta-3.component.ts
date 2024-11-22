import { Component } from '@angular/core';
import { Hemoclasificacion } from '../../../../Models/Hemoclasificacion.model';
import { Antibiograma } from '../../../../Models/Antibiograma.model';
import { PruebaVDRL } from '../../../../Models/Prueba-VDRL.model';
import { PruebaRPR } from '../../../../Models/Prueba-RPR.model';
import { LaboratorioITrimestre } from '../../../../Models/Laboratorio-1-trimestre.model';
import { LaboratorioIITrimestre } from '../../../../Models/Laboratorio-2-trimestre.model';
import { LaboratorioIIITrimestre } from '../../../../Models/Laboratorio-3-trimestre.model';
import { Its } from '../../../../Models/Its.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ItsService } from '../../../../Services/its.service';
import { PruebaVdrlService } from '../../../../Services/prueba-vdrl.service';
import { PruebaRprService } from '../../../../Services/prueba-rpr.service';
import { LaboratorioiiisemestreService } from '../../../../Services/laboratorioiiisemestre.service';
import { LaboratorioiisemestreService } from '../../../../Services/laboratorioiisemestre.service';
import { LaboratorioisemestreService } from '../../../../Services/laboratorioisemestre.service';
import { HemoclasificacionService } from '../../../../Services/hemoclasificacion.service';
import { AntibiogramaService } from '../../../../Services/antibiograma.service';
import { AlertService } from '../../../../Services/alert.service';
import { MenuService } from '../../../../Services/menu.service';

@Component({
  selector: 'app-ruta-3',
  templateUrl: './ruta-3.component.html',
  styleUrl: './ruta-3.component.css'
})
export class Ruta3Component {

  openTab = 1;
  id: number | null = null;
  num_proceso: number | null = null;

  hemoclasificaciones: Hemoclasificacion[] = [];
  antibiogramas: Antibiograma[] = [];

  Vdrl: PruebaVDRL[] = [];
  Rpr: PruebaRPR[] = [];
  isReadOnlyLaboratorioI = false;
  isReadOnlyLaboratorioII = false;
  isReadOnlyLaboratorioIII = false;
  isReadOnlyIts = false;


  id_laboratorioI: number | null = null;
  id_laboratorioII: number | null = null;
  id_laboratorioIII: number | null = null;
  id_its: number | null = null;

  isEditing = false; isExpanded = true;
  isVisible = true;

  laboratorioITrimestre: LaboratorioITrimestre = new LaboratorioITrimestre();
  laboratorioIITrimestre: LaboratorioIITrimestre = new LaboratorioIITrimestre();
  laboratorioIIITrimestre: LaboratorioIIITrimestre = new LaboratorioIIITrimestre();
  its: Its = new Its();

  constructor(private itsService: ItsService,
    private vdrlService: PruebaVdrlService,
    private rprService: PruebaRprService,
    private laboratorioIIISemestreservice: LaboratorioiiisemestreService,
    private laboratorioIISemestreservice: LaboratorioiisemestreService,
    private laboratorioISemestreservice: LaboratorioisemestreService,
    private route: ActivatedRoute,
    private hemoclasificacionService: HemoclasificacionService,
    private antibiogramaService: AntibiogramaService,
    private router: Router,
    private alertService: AlertService,
    private menuService: MenuService
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
      this.getPrimerLaboratorio();
      this.getSegundoLaboratorio();
      this.getTercerLaboratorio();
      this.getIts();
    } else {
      console.log('No se proporcionó un ID válido.');
    }

    this.cargarHemoclasificacion();
    this.cargarAntibiograma();
    this.cargarRPR();
    this.cargarVDRL();
    this.menuService.isExpanded$.subscribe(isExpanded => {
      this.isExpanded = isExpanded;
    });
  }

  toggleTabs(tabNumber: number) {
    // Definimos los grupos de tabs permitidos para cada formulario
    const grupo1 = [1, 2, 3, 4];
    const grupo2 = [5, 6, 7];
    const grupo3 = [8, 9];
    const grupo4 = [10];


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

      else if (grupo4.includes(this.openTab)) {
        if (!grupo4.includes(tabNumber)) {
          this.alertService.infoAlert('Advertencia', 'Por favor, guarda los cambios antes de cambiar de pestaña.');
          return;
        }
      }
    }

    this.openTab = tabNumber;
  }


  toggleEditLaboratorioI() {
    if (!this.isReadOnlyLaboratorioI) return;
    this.isReadOnlyLaboratorioI = false;
    this.isEditing = true;
  }

  toggleEditLaboratorioII() {
    if (!this.isReadOnlyLaboratorioII) return;
    this.isReadOnlyLaboratorioII = false;
    this.isEditing = true;
  }

  toggleEditLaboratorioIII() {
    if (!this.isReadOnlyLaboratorioIII) return;
    this.isReadOnlyLaboratorioIII = false;
    this.isEditing = true;
  }

  toggleEditIts() {
    if (!this.isReadOnlyIts) return;
    this.isReadOnlyIts = false;
    this.isEditing = true;
  }

  cargarHemoclasificacion(): void {
    this.hemoclasificacionService.getHemoclasificaciones().subscribe(response => {
      this.hemoclasificaciones = response.Hemoclasificacion;
      console.log(response)
    }, error => {
      console.error('Error al cargar hemoclasificacion:', error);
    });
  }

  cargarVDRL(): void {
    this.vdrlService.getPruebaVDRL().subscribe(response => {
      this.Vdrl = response['Prueba No Treponemica VDRL'];
      console.log(response)
    }, error => {
      console.error('Error al cargar las pruebas VDRL:', error);
    });
  }

  cargarRPR(): void {
    this.rprService.getPruebaRPR().subscribe(response => {
      console.log('Respuesta del servicio:', response); // Verifica la respuesta
      if (response.estado === 'Ok') {
        this.Rpr = response['Prueba no Treponemica RPR']; // Usa el nombre correcto
        console.log('Datos de RPR:', this.Rpr); // Comprueba que se asigna correctamente
      } else {
        console.error('Estado no OK:', response.estado);
      }
    }, error => {
      console.error('Error al cargar las pruebas RPR:', error);
    });
  }



  cargarAntibiograma(): void {
    this.antibiogramaService.getAntibiogramas().subscribe(response => {
      this.antibiogramas = response.antibiograma;
      console.log(response)
    }, error => {
      console.error('Error al cargar antibiograma:', error);
    });
  }

  guardarPrimerLaboratorio(): void {

    if (this.id_laboratorioI) {
      // Editar usuario existente
      this.laboratorioISemestreservice.updateLaboratorioISemestre(this.id_laboratorioI, this.laboratorioITrimestre).subscribe({
        next: (response) => {
          console.log('Primer laboratorio trimestre actualizado:', response);
          this.alertService.successAlert('Exito', response.message).then(() => {
            this.isReadOnlyLaboratorioI = true;
            this.isEditing = false;
          });
        },
        error: (error) => {
          console.error('Error al actualizar el Primer laboratorio trimestre:', error);
          this.alertService.errorAlert('Error', error.error.message);
        }
      });
    } else {

      if (this.id !== null) {
        this.laboratorioITrimestre.id_usuario = this.id;
      }
      this.laboratorioITrimestre.num_proceso = this.num_proceso !== null ? this.num_proceso : 0;

      console.log(this.laboratorioITrimestre);
      this.laboratorioISemestreservice.createLaboratorioPrimerSemestre(this.laboratorioITrimestre).subscribe({
        next: (response) => {
          console.log('Laboratorio del primer semestre creado:', response);
          this.alertService.successAlert('Exito', response.message).then(() => {
            this.id_laboratorioI = response.data.cod_laboratorio ?? null;
            this.isReadOnlyLaboratorioI = true;
            this.isEditing = false;
          });
        },
        error: (error) => {
          console.error('Error al crear el Laboratorio del primer semestre :', error);
          this.alertService.errorAlert('Error', error.error.message);
        }
      });
    }
  }

  getPrimerLaboratorio(): void {
    if (this.id !== null && this.id > 0) { // Verificar que el ID sea válido
      this.laboratorioISemestreservice.getLaboratorioISemestrebyId(this.id, this.num_proceso ?? 0).subscribe(
        (response) => {
          this.laboratorioITrimestre = response.data;
          console.log(response);
          this.isReadOnlyLaboratorioI = true;
          this.id_laboratorioI = this.laboratorioITrimestre.cod_laboratorio;
        },
        (error) => {
          console.error('Error al obtener el laboratorio del primer trimestre:', error);
        }
      );
    } else {
      console.log('No se proporcionó ID, se asume que se va a crear un nuevo laboratorio del primer trimestre.');
    }
  }

  guardarSegundoLaboratorio(): void {

    if (this.id_laboratorioII) {
      // Editar usuario existente
      this.laboratorioIISemestreservice.updateLaboratorioIISemestre(this.id_laboratorioII, this.laboratorioIITrimestre).subscribe({
        next: (response) => {
          console.log('Segundo laboratorio trimestre actualizado:', response);
          this.alertService.successAlert('Exito', response.message).then(() => {
            this.isReadOnlyLaboratorioII = true;
            this.isEditing = false;
          });
        },
        error: (error) => {
          console.error('Error al actualizar el Segundo laboratorio trimestre:', error);
          this.alertService.errorAlert('Error', error.error.message);
        }
      });
    } else {

      if (this.id !== null) {
        this.laboratorioIITrimestre.id_usuario = this.id;
      }
      this.laboratorioIITrimestre.num_proceso = this.num_proceso !== null ? this.num_proceso : 0;


      console.log(this.laboratorioIITrimestre);
      this.laboratorioIISemestreservice.createLaboratorioSegundoSemestre(this.laboratorioIITrimestre).subscribe({
        next: (response) => {
          console.log('Laboratorio del segundo semestre creado:', response);
          this.alertService.successAlert('Exito',response.data).then(()=>{
            this.id_laboratorioII = response.data.cod_doslaboratorio ?? null;
            this.isReadOnlyLaboratorioII = true;
            this.isEditing = false;
          });
        },
        error: (error) => {
          console.error('Error al crear el Laboratorio del segundo semestre :', error);
          this.alertService.errorAlert('Error', error.error.message);
        }
      });
    }
  }

  getSegundoLaboratorio(): void {
    if (this.id !== null && this.id > 0) { // Verificar que el ID sea válido
      this.laboratorioIISemestreservice.getLaboratorioIISemestrebyId(this.id, this.num_proceso ?? 0).subscribe(
        (response) => {
          this.laboratorioIITrimestre = response.data;
          console.log(response);
          this.isReadOnlyLaboratorioII = true;
          this.id_laboratorioII = this.laboratorioIITrimestre.cod_doslaboratorio;
        },
        (error) => {
          console.error('Error al obtener el laboratorio del segundo trimestre:', error);
        }
      );
    } else {
      console.log('No se proporcionó ID, se asume que se va a crear un nuevo laboratorio del segundo trimestre.');
    }
  }

  guardarTercerLaboratorio(): void {
    if (this.id_laboratorioIII) {
      // Editar usuario existente
      this.laboratorioIIISemestreservice.updateLaboratorioIIISemestre(this.id_laboratorioIII, this.laboratorioIIITrimestre).subscribe({
        next: (response) => {
          console.log('Tercer laboratorio trimestre actualizado:', response);
          this.alertService.successAlert('Exito',response.message).then(()=>{
            this.isReadOnlyLaboratorioIII = true;
            this.isEditing = false;
          });
        },
        error: (error) => {
          console.error('Error al actualizar el Tercer laboratorio trimestre:', error);
          this.alertService.errorAlert('Error', error.error.message);
        }
      });
    } else {

      if (this.id !== null) {
        this.laboratorioIIITrimestre.id_usuario = this.id;
      }

      this.laboratorioIIITrimestre.num_proceso = this.num_proceso !== null ? this.num_proceso : 0;


      console.log(this.laboratorioIIITrimestre);
      this.laboratorioIIISemestreservice.createLaboratorioTercerSemestre(this.laboratorioIIITrimestre).subscribe({
        next: (response) => {
          console.log('Laboratorio del tercer semestre creado:', response);
          this.alertService.successAlert('Exito',response.message).then(()=>{
            this.id_laboratorioIII = response.data.cod_treslaboratorio ?? null;
            this.isReadOnlyLaboratorioIII = true;
            this.isEditing = false;
          });
        },
        error: (error) => {
          console.error('Error al crear el Laboratorio del tercer semestre :', error);
          this.alertService.errorAlert('Error', error.error.message);
        }
      });
    }
  }

  getTercerLaboratorio(): void {
    if (this.id !== null && this.id > 0) { // Verificar que el ID sea válido
      this.laboratorioIIISemestreservice.getLaboratorioIIISemestrebyId(this.id, this.num_proceso ?? 0).subscribe(
        (response) => {
          this.laboratorioIIITrimestre = response.data;
          console.log(response);
          this.isReadOnlyLaboratorioIII = true;
          this.id_laboratorioIII = this.laboratorioIIITrimestre.cod_treslaboratorio ?? null;


        },
        (error) => {
          console.error('Error al obtener el laboratorio del tercer trimestre:', error);
        }
      );
    } else {
      console.log('No se proporcionó ID, se asume que se va a crear un nuevo laboratorio del tercer trimestre.');
    }
  }


  guardarIts(): void {
    if (this.id_its) {
      // Editar usuario existente
      this.itsService.updateIts(this.id_its, this.its).subscribe({
        next: (response) => {
          console.log('Its actualizado:', response);
          this.alertService.successAlert('Exito', response.message).then(()=>{
            this.isReadOnlyIts = true;
            this.isEditing = false;
          });
        },
        error: (error) => {
          console.error('Error al actualizar el Its:', error);
          this.alertService.errorAlert('Error', error.error.message);
        }
      });
    } else {

      if (this.id !== null) {
        this.its.id_usuario = this.id;
      }

      this.its.num_proceso = this.num_proceso !== null ? this.num_proceso : 0;


      console.log(this.its);
      this.itsService.createIts(this.its).subscribe({
        next: (response) => {
          console.log('Its creada:', response);
          this.alertService.successAlert('Exito', response.message).then(()=>{
            this.id_its = response.data.cod_its ?? null;
            this.isReadOnlyIts = true;
            this.isEditing = false;
            console.log(response);
          });
        },
        error: (error) => {
          console.error('Error al crear la its :', error);
          this.alertService.errorAlert('Error', error.error.message);
        }
      });
    }
  }

  getIts(): void {
    if (this.id !== null && this.id > 0) { // Verificar que el ID sea válido
      this.itsService.getItsId(this.id, this.num_proceso ?? 0).subscribe(
        (response) => {
          this.its = response.data;
          console.log(response);
          this.id_its = this.its.cod_its ?? null;
          this.isReadOnlyIts = true;

        },
        (error) => {
          console.error('Error al obtener its:', error);
        }
      );
    } else {
      console.log('No se proporcionó ID, se asume que se va a crear un nuevo its.');
    }
  }

  volver() {
    this.router.navigate(['/ruta-gestante', this.id]); // Navegar a la ruta con el ID
  }
}
