import { Component } from '@angular/core';
import { MenuService } from '../../../Services/menu.service';
import { LaboratorioisemestreService } from '../../../Services/laboratorioisemestre.service';
import { LaboratorioiisemestreService } from '../../../Services/laboratorioiisemestre.service';
import { LaboratorioiiisemestreService } from '../../../Services/laboratorioiiisemestre.service';

@Component({
  selector: 'app-examenes',
  templateUrl: './examenes.component.html',
  styleUrl: './examenes.component.css'
})
export class ExamenesComponent {

  isExpanded = true;
  isVisible = true;

  examenesISemestre = [
    { nombre: 'Prueba VIH', campo: 'real_prueb_rapi_vih' },
    { nombre: 'Prueba Sífilis', campo: 'reali_prueb_trepo_rapid_sifilis' },
    { nombre: 'Urocultivo', campo: 'realizo_urocultivo' },
    { nombre: 'Antibiograma', campo: 'realizo_antibiograma' },
    { nombre: 'Prueba ELISA', campo: 'real_prueb_eliza_anti_total' },
    { nombre: 'Prueba ELISA Recombinante', campo: 'real_prueb_eliza_anti_recomb' },
    { nombre: 'Prueba Coombs', campo: 'real_prueb_coombis_indi_cuanti' },
    { nombre: 'Ecografía Obstétrica', campo: 'real_eco_obste_tamizaje' }
  ];

  examenesIISemestre = [
    { nombre: 'Prueba VIH', campo: 'reali_prueb_rapi_vih' },
    { nombre: 'Prueba Sífilis', campo: 'real_prueb_trep_rap_sifilis' },
    { nombre: 'Citología', campo: 'reali_citologia' },
    { nombre: 'Avidez IgG', campo: 'reali_prueb_avidez_ig_g' },
    { nombre: 'Toxoplasmosis IgA', campo: 'reali_prueb_toxoplasmosis_ig_a' },
    { nombre: 'Hemoparasito', campo: 'reali_prueb_hemoparasito' },
    { nombre: 'Prueba Coombs', campo: 'reali_prueb_coombis_indi_cuanti' },
    { nombre: 'Ecografía Obstétrica Detalle Anatómico', campo: 'reali_eco_obste_detalle_anato' }
  ];

  examenesIIISemestre = [
    { nombre: 'Prueba VIH', campo: 'reali_prueb_rapi_vih_3' },
    { nombre: 'Prueba Sífilis', campo: 'reali_prueb_trepo_rapi_sifilis' },
    { nombre: 'Prueba IG-M toxoplasma', campo: 'reali_prueb_igm_toxoplasma' },
    { nombre: 'Prueba de cultivo rectal y vaginal', campo: 'reali_prueb_culti_rect_vagi' },
    { nombre: 'Prueba de Perfil biofísico', campo: 'reali_prueb_perfil_biofisico' },
  ];

  trimestre1 = {
    realizados: [],
    noRealizados: []
  };
  
  trimestre2 = {
    realizados: [],
    noRealizados: []
  };
  
  trimestre3 = {
    realizados: [],
    noRealizados: []
  };

  constructor(
    private menuService: MenuService,
    private laboratorioisemestreService: LaboratorioisemestreService,
    private laboratorioiisemestreService:LaboratorioiisemestreService,
    private laboratorioiiisemestreService:LaboratorioiiisemestreService,
  ) { }

  ngOnInit() {
    this.menuService.isExpanded$.subscribe(isExpanded => {
      this.isExpanded = isExpanded;
    });

    // Obtener los exámenes de laboratorio 1
    this.laboratorioisemestreService.getLaboratorioPrimerSemestre().subscribe(response => {
      const data = response.data; 
      if (Array.isArray(data)) {
        this.trimestre1.realizados = this.obtenerExamenesRealizados(data, this.examenesISemestre);
        this.trimestre1.noRealizados = this.obtenerExamenesNoRealizados(data, this.examenesISemestre);
      } else {
        console.error("La propiedad 'data' no es un arreglo.");
      }
    });

    // Obtener los exámenes de laboratorio 2
    this.laboratorioiisemestreService.getLaboratorioSegundoSemestre().subscribe(response => {
      console.log('Respuesta del segundo semestre:', response);
      const data = response.data; 
      if (Array.isArray(data)) {
        this.trimestre2.realizados = this.obtenerExamenesRealizados(data, this.examenesIISemestre);
        this.trimestre2.noRealizados = this.obtenerExamenesNoRealizados(data, this.examenesIISemestre);
      } else {
        console.error("La propiedad 'data' no es un arreglo.");
      }
    });
    
    // Obtener los exámenes de laboratorio 3
    this.laboratorioiiisemestreService.getLaboratorioTercerSemestre().subscribe(response => {
      console.log('Respuesta del tercer semestre:', response);
      const data = response.data; 
      if (Array.isArray(data)) {
        this.trimestre3.realizados = this.obtenerExamenesRealizados(data, this.examenesIIISemestre);
        this.trimestre3.noRealizados = this.obtenerExamenesNoRealizados(data, this.examenesIIISemestre);
      } else {
        console.error("no trae datos 3 laboratorio.");
      }
    });
  }

  // Función para obtener los exámenes realizados
  obtenerExamenesRealizados(data: any[], examenes: any[]): any[] {
    return data.filter(examen =>
      examenes.some(examenConfig => examen[examenConfig.campo])
    );
  }

  // Función para obtener los exámenes no realizados
  obtenerExamenesNoRealizados(data: any[], examenes: any[]): any[] {
    return data.filter(examen =>
      examenes.some(examenConfig => !examen[examenConfig.campo])
    );
  }
}
