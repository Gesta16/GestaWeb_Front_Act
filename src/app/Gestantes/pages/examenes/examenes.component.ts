import { Component } from '@angular/core';
import { MenuService } from '../../../Services/menu.service';
import { LaboratorioisemestreService } from '../../../Services/laboratorioisemestre.service';
import { AuthService } from '../../../Services/auth.service';
import { LaboratorioITrimestre } from '../../../Models/Laboratorio-1-trimestre.model';


interface Examenes {
  nombre: string;
  completado: boolean;
}


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

  examenes1: Examenes[] = [
    { nombre: 'Hemoclasificacion',                      completado: true },
    { nombre: 'Hemograma',                              completado: true },
    { nombre: 'Glicemia',                               completado: false},
    { nombre: 'Antigeno de Superficie Hepatitis B',     completado: false},
    { nombre: 'VIH',                                    completado: true },
    { nombre: 'Prueba Treponémica Rápida Para Sífilis', completado: false},
    { nombre: 'Urocultivo',                             completado: false},
    { nombre: 'Antibiograma',                           completado: false},
    { nombre: 'IG-G Rubeola',                           completado: false},
    { nombre: 'IG-G Toxoplasma',                        completado: false},
    { nombre: 'IG-M Toxoplasma',                        completado: false},
    { nombre: 'Hemoparasito - Gota Gruesa',             completado: false},
    { nombre: 'Prueba De Elisa Antigenos Totales/Crudo En (Zonas Endémicas Chagas)', completado: false},
    { nombre: 'Elisa Antigeno Recombinante',                  completado: false},
    { nombre: 'Coombs Indirecto Cuantitativo',                completado: false},
    { nombre: 'Elisa Antigeno Recombinante',                  completado: false},
    { nombre: 'Ecografia Obstetrica Tamizaje de Aneuploidis', completado: false},
  ];

  examenes2: Examenes[] = [
    { nombre: 'VIH',                                    completado: true },
    { nombre: 'Prueba Treponémica Rápida Para Sífilis', completado: false},
    { nombre: 'Prueba De Tolerancia Oral A La Glucosa Basal', completado: false},
    { nombre: 'Prueba De Tolerancia Oral A La Glucosa 1 Hora', completado: false},
    { nombre: 'Prueba De Tolerancia Oral A La Glucosa 2 Horas', completado: false},
    { nombre: 'Reporte De Citologia', completado: false},
    { nombre: 'IG-M Toxoplasma',                        completado: false},
    { nombre: 'Prueba De Avidez Ig G',                        completado: false},
    { nombre: 'Toxoplasmosis IG-A ',                        completado: false},
    { nombre: 'Hemoparasito - Gota Gruesa',             completado: false},
    { nombre: 'Coombs Indirecto Cualitativo',                completado: false},
    { nombre: 'Ecografia Obstetrica Detalle Anatomic',                completado: false},
  ];

  examenes3: Examenes[] = [
    { nombre: 'Hemograma',                              completado: true },
    { nombre: 'VIH',                                    completado: true },
    { nombre: 'Prueba Treponémica Rápida Para Sífilis', completado: false},
    { nombre: 'IG-M Toxoplasma',                        completado: false},
    { nombre: 'Cultivo Rectal Y Vaginal',               completado: false},
    { nombre: 'Perfil Biofisico',                       completado: false},
  ];

  constructor(
    private menuService: MenuService,
    private authService: AuthService,
    private laboratorioIService: LaboratorioisemestreService

  ) { }


  ngOnInit() {
    this.menuService.isExpanded$.subscribe(isExpanded => {
      this.isExpanded = isExpanded;
    });
    this.idUsuario = this.authService.currentUserValue.userable.id_usuario;
    this.getLaboratorioI();
  }

  getLaboratorioI() {
    this.laboratorioIService.getLaboratorioISemestrebyId(this.idUsuario, 1).subscribe(
      data => {
        this.laboratorioITrimestre = data.data;
        console.log('Laboratorio I', this.laboratorioITrimestre);
      },
      err => {
        console.log(err);
      }
    );
  }
}
