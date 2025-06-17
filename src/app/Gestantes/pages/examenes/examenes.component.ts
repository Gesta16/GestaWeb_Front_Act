import { Component } from '@angular/core';
import { MenuService } from '../../../Services/menu.service';
import { LaboratorioisemestreService } from '../../../Services/laboratorioisemestre.service';
import { LaboratorioiisemestreService } from '../../../Services/laboratorioiisemestre.service';
import { LaboratorioiiisemestreService } from '../../../Services/laboratorioiiisemestre.service';
import { AuthService } from '../../../Services/auth.service';
import { LaboratorioITrimestre } from '../../../Models/Laboratorio-1-trimestre.model';
import { LaboratorioIITrimestre } from '../../../Models/Laboratorio-2-trimestre.model';
import { LaboratorioIIITrimestre } from '../../../Models/Laboratorio-3-trimestre.model';


@Component({
  selector: 'app-examenes',
  templateUrl: './examenes.component.html',
  styleUrl: './examenes.component.css'
})
export class ExamenesComponent {

  isExpanded = true;
  isVisible = true;
  idUsuario: number;
  laboratorioITrimestre: LaboratorioITrimestre;
  laboratorioIITrimestre: LaboratorioIITrimestre;
  laboratorioIIITrimestre: LaboratorioIIITrimestre;


  examenes1 = [
    { nombre: 'Hemoclasificacion', key: 'fec_hemoclasificacion', completado: false },
    { nombre: 'Hemograma', key: 'real_hemograma', completado: false },
    { nombre: 'Glicemia', key: 'real_glicemia', completado: false },
    { nombre: 'Antigeno de Superficie Hepatitis B', key: 'real_antigenos', completado: false },
    { nombre: 'Prueba rápida de VIH', key: 'real_prueb_rapi_vih', completado: false },
    { nombre: 'Prueba Treponémica Rápida Para Sífilis', key: 'reali_prueb_trepo_rapid_sifilis', completado: false },
    { nombre: 'Urocultivo', key: 'realizo_urocultivo', completado: false },
    { nombre: 'Citomegalovirus IgG', key: 'real_igg_citomegalovirus', completado: false },
    { nombre: 'Citomegalovirus IgM', key: 'real_igm_citomegalovirus', completado: false },
    { nombre: 'Antibiograma', key: 'realizo_antibiograma', completado: false },
    { nombre: 'IG-G Rubeola', key: 'real_ig_rubeola', completado: false },
    { nombre: 'IG-G Toxoplasma', key: 'real_ig_toxoplasma', completado: false },
    { nombre: 'IG-M Toxoplasma', key: 'real_igm_toxoplasma', completado: false },
    { nombre: 'IG-M Rubéola', key: 'real_igm_rubeola', completado: false },
    { nombre: 'Hemoparasito - Gota Gruesa', key: 'real_hemoparasito', completado: false },
    { nombre: 'Prueba De Elisa Antigenos Totales/Crudo En (Zonas Endémicas Chagas)', key: 'real_prueb_eliza_anti_total', completado: false },
    { nombre: 'Elisa Antigeno Recombinante', key: 'real_prueb_eliza_anti_recomb', completado: false },
    { nombre: 'Coombs Indirecto Cuantitativo', key: 'real_prueb_coombis_indi_cuanti', completado: false },
    { nombre: 'Ecografia Obstetrica de translucencia nucal semana 11-14', key: 'real_eco_obste_tamizaje', completado: false },
    { nombre: 'Doppler de arteria uterina < semana 15', key: 'real_doppler_art_uterina_sem_15', completado: false },
  ];

  examenes2 = [
    { nombre: 'Urocultivo', key: 'real_urocultivo_2', completado: false },
    { nombre: 'Prueba rápida de VIH', key: 'reali_prueb_rapi_vih', completado: false },
    { nombre: 'Prueba Treponémica Rápida Para Sífilis', key: 'real_prueb_trep_rap_sifilis', completado: false },
    { nombre: 'Prueba De Tolerancia Oral A La Glucosa Basal', key: 'real_prueb_oral', completado: false },
    { nombre: 'Prueba de tolerancia a la glucosa con carga de 75g', key: 'real_prueb_oral_1', completado: false },
    // { nombre: 'Prueba De Tolerancia Oral A La Glucosa 2 Horas', key: 'real_prueb_oral_2', completado: false },
    { nombre: 'Citología cérvico uterina', key: 'reali_citologia', completado: false },
    { nombre: 'IG-M Toxoplasma', key: 'real_igm_toxoplasma_2', completado: false },
    { nombre: 'Prueba De Avidez Ig G', key: 'reali_prueb_avidez_ig_g', completado: false },
    { nombre: 'Toxoplasmosis IG-A ', key: 'reali_prueb_toxoplasmosis_ig_a', completado: false },
    { nombre: 'Hemoparasito - Gota Gruesa', key: 'reali_prueb_hemoparasito', completado: false },
    { nombre: 'Coombs Indirecto Cualitativo', key: 'reali_prueb_coombis_indi_cuanti', completado: false },
    { nombre: 'Ecografia Obstetrica Detalle Anatómico Semana 20-24', key: 'reali_eco_obste_detalle_anato', completado: false },
  ];

  examenes3 = [
    { nombre: 'Urocultivo', key: 'real_urocultivo_3', completado: false },
    { nombre: 'Hemograma', key: 'reali_hemograma', completado: false },
    { nombre: 'VIH', key: 'reali_prueb_rapi_vih_3', completado: false },
    { nombre: 'Prueba Treponémica Rápida Para Sífilis', key: 'reali_prueb_trepo_rapi_sifilis', completado: false },
    { nombre: 'IG-M Toxoplasma', key: 'reali_prueb_igm_toxoplasma', completado: false },
    { nombre: 'Cultivo recto vaginal para estreptococo del grupo B', key: 'reali_prueb_culti_rect_vagi', completado: false },
    { nombre: 'Perfil Biofisico', key: 'reali_prueb_perfil_biofisico', completado: false },
  ];

  examenesRiesgoObstetrico = [
    {
      nombre: 'Coombs indirecto',
      keys: ['real_prueb_coombis_indi_cuanti', 'reali_prueb_coombis_indi_cuanti'],
      completado: false
    },
    {
      nombre: 'Toxoplasma IgA',
      keys: ['reali_prueb_toxoplasmosis_ig_a'],
      completado: false
    },
    {
      nombre: 'Prueba de Avidez IgG para toxoplasma',
      keys: ['reali_prueb_avidez_ig_g'],
      completado: false
    },
    {
      nombre: 'VDRL (prueba no treponémica para sífilis)',
      keys: ['real_prueb_trepo_rapid_sifilis', 'real_prueb_trep_rap_sifilis', 'reali_prueb_trepo_rapid_sifilis', 'reali_prueb_trepo_rapi_sifilis'],
      completado: false
    },
    {
      nombre: 'Citomegalovirus IgG',
      keys: ['real_igg_citomegalovirus'], 
      completado: false
    },
    {
      nombre: 'Citomegalovirus IgM',
      keys: ['real_igm_citomegalovirus'], 
      completado: false
    },
    {
      nombre: 'Doppler de arteria uterina < semana 15',
      keys: ['real_doppler_art_uterina_sem_15'], 
      realizado: false
    },
    {
      nombre: 'Urocultivo (Segundo Trimestre)',
      keys: ['real_urocultivo_2'], 
      realizado: false
    },
    {
      nombre: 'Urocultivo (Tercer Trimestre)',
      keys: ['real_urocultivo_3'], 
      realizado: false
    }
  ];









  constructor(
    private menuService: MenuService,
    private authService: AuthService,
    private laboratorioIService: LaboratorioisemestreService,
    private laboratorioIIService: LaboratorioiisemestreService,
    private laboratorioIIIService: LaboratorioiiisemestreService

  ) { }


  ngOnInit() {
    this.menuService.isExpanded$.subscribe(isExpanded => {
      this.isExpanded = isExpanded;
    });
    this.idUsuario = this.authService.currentUserValue.userable.id_usuario;
    this.getLaboratorioI();
    this.getLaboratorioII();
    this.getLaboratorioIII();
    this.marcarExamenesRiesgoObstetrico();
  }

  marcarExamenesRiesgoObstetrico() {
  this.examenesRiesgoObstetrico.forEach(examen => {
    examen.completado =
      examen.keys.some(key => !!this.laboratorioITrimestre?.[key]) ||
      examen.keys.some(key => !!this.laboratorioIITrimestre?.[key]) ||
      examen.keys.some(key => !!this.laboratorioIIITrimestre?.[key]);
  });
}

  getLaboratorioI() {
    this.laboratorioIService.getLaboratorioISemestrebyId(this.idUsuario, 1).subscribe(
      data => {
        this.laboratorioITrimestre = data.data;
        //console.log('Laboratorio I', this.laboratorioITrimestre);
        this.examenes1.forEach(examen => {
          //console.log(this.laboratorioITrimestre?.[examen.key])
          examen.completado = !!this.laboratorioITrimestre?.[examen.key]; // Convierte el valor a true/false
        });
        this.marcarExamenesRiesgoObstetrico(); // Marcar exámenes de riesgo obstétrico
      },
      err => {
        console.log(err);
      }
    );
  }

  getLaboratorioII() {
    this.laboratorioIIService.getLaboratorioIISemestrebyId(this.idUsuario, 1).subscribe(
      data => {
        this.laboratorioIITrimestre = data.data;
        //console.log('Laboratorio II', this.laboratorioIITrimestre);
        this.examenes2.forEach(examen => {
          //console.log(this.laboratorioIITrimestre?.[examen.key])
          examen.completado = !!this.laboratorioIITrimestre?.[examen.key]; // Convierte el valor a true/false
        });
        this.marcarExamenesRiesgoObstetrico(); // Marcar exámenes de riesgo obstétrico
      },
      err => {
        console.log(err);
      }
    );
  }

  getLaboratorioIII() {
    this.laboratorioIIIService.getLaboratorioIIISemestrebyId(this.idUsuario, 1).subscribe(
      data => {
        this.laboratorioIIITrimestre = data.data;
        //console.log('Laboratorio III', this.laboratorioIIITrimestre);
        this.examenes3.forEach(examen => {
          //console.log(this.laboratorioIIITrimestre?.[examen.key])
          examen.completado = !!this.laboratorioIIITrimestre?.[examen.key]; // Convierte el valor a true/false
        });
        this.marcarExamenesRiesgoObstetrico(); // Marcar exámenes de riesgo obstétrico
      },
      err => {
        console.log(err);
      }
    );
  }
}
