import { Component } from '@angular/core';
import { MenuService } from '../../../Services/menu.service';
import { LaboratorioisemestreService } from '../../../Services/laboratorioisemestre.service';
import { AuthService } from '../../../Services/auth.service';
import { LaboratorioITrimestre } from '../../../Models/Laboratorio-1-trimestre.model';

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
