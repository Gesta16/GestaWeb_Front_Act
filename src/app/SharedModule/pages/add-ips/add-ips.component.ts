import { Component, Inject } from '@angular/core';
import { Ips } from '../../../Models/Ips.model';
import { Departamento } from '../../../Models/Departamento.model';
import { Regimen } from '../../../Models/Regimen.model';
import { Municipio } from '../../../Models/Municipio.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IpsService } from '../../../Services/ips.service';
import { DepartamentoService } from '../../../Services/departamento.service';
import { MunicipioService } from '../../../Services/municipio.service';
import { RegimenService } from '../../../Services/regimen.service';
import { AlertService } from '../../../Services/alert.service';

@Component({
  selector: 'app-add-ips',
  templateUrl: './add-ips.component.html',
  styleUrl: './add-ips.component.css'
})
export class AddIpsComponent {

  ips: Ips = new Ips();

  constructor(
    public _matDialogRef: MatDialogRef<AddIpsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ipsService: IpsService,
    private departamentoService: DepartamentoService,
    private regimenService: RegimenService,
    private municipioService: MunicipioService,
    private alertService:AlertService,
  ) {}

  listDepartamentos: Departamento[] = [];
  listRegimenes: Regimen[] = [];
  listMunicipios: Municipio[] = [];

  ngOnInit(): void {
    this.getDepartamentos();
    this.getRegimenes();
  }

  onDepartamentoChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const departamentoId = +target.value;
    this.getMunicipios(departamentoId); 
  }

  getDepartamentos(): void {
    this.departamentoService.getDepartamentos().subscribe(
      (data: { estado: string; departamento: Departamento[] }) => {
        if (data.estado === "Ok" && Array.isArray(data.departamento)) {
          this.listDepartamentos = data.departamento;
        } else {
          console.error('Estructura de datos inesperada:', data);
        }
      },
      (error: any) => {
        console.error('Error al obtener los datos de Departamentos:', error);
      }
    );
  }

  getMunicipios(departamentoId?: number): void {
    this.municipioService.getMunicipios(departamentoId).subscribe(
      (data: { estado: string; Municipios: Municipio[] }) => {
        if (data.estado === "Ok" && Array.isArray(data.Municipios)) {
          this.listMunicipios = data.Municipios;
        } else {
          console.error('Estructura de datos inesperada:', data);
        }
      },
      (error: any) => {
        console.error('Error al obtener los datos de Municipios:', error);
      }
    );
  }

  getRegimenes(): void {
    this.regimenService.getRegimenes().subscribe(
      (data: { estado: string; regimen: Regimen[] }) => {
        if (data.estado === "Ok" && Array.isArray(data.regimen)) {
          this.listRegimenes = data.regimen;
        } else {
          console.error('Estructura de datos inesperada:', data);
        }
      },
      (error: any) => {
        console.error('Error al obtener los datos de IPS:', error);
      }
    );
  }

  onSubmit(): void {
    this.ipsService.createIps(this.ips).subscribe(
      response => {
        this.alertService.successAlert('Exito', response.message).then(()=>{
          this._matDialogRef.close(true);
        });
      },
      error => {
        this.alertService.errorAlert('Error', error.error.message);
        console.error('Error al crear IPS:', error);
      }
    );
  }

  cerrar(): void {
    this._matDialogRef.close();
  }
}
