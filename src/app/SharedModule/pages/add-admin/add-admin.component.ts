import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Admin } from '../../../Models/Admin.model';
import { Ips } from '../../../Models/Ips.model';
import { TipoDocumento } from '../../../Models/Tipo-documento.model';
import { Departamento } from '../../../Models/Departamento.model';
import { Municipio } from '../../../Models/Municipio.model';
import { AdminService } from '../../../Services/admin.service';
import { IpsService } from '../../../Services/ips.service';
import { TipoDocumentoService } from '../../../Services/tipo-documento.service';
import { DepartamentoService } from '../../../Services/departamento.service';
import { MunicipioService } from '../../../Services/municipio.service';
import { AlertService } from '../../../Services/alert.service';

@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.component.html',
  styleUrl: './add-admin.component.css'
})
export class AddAdminComponent implements OnInit {

  admin: Admin = new Admin;

  listIps: Ips[] = [];
  listTipoDocumentos: TipoDocumento[] = [];
  listDepartamentos: Departamento[] = [];
  listMunicipios: Municipio[] = [];


  constructor(
    public _matDialogRef: MatDialogRef<AddAdminComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private adminService: AdminService,
    private ipsService: IpsService,
    private tipoDocumentoService: TipoDocumentoService,
    private departamentoService: DepartamentoService,
    private municipioService: MunicipioService,
    private alertService: AlertService,
  ) {}


  ngOnInit(): void {
    this.getIps();
    this.getTipoDocumentos();
    this.getDepartamentos();
  }

  onSubmit(): void {
    this.adminService.createAdmin(this.admin).subscribe(
      response => {
        this.alertService.successAlert('Exito', response.message);
        this._matDialogRef.close(true);
      },
      error => {
        this.alertService.errorAlert('Error',error.error.message);
        console.error('Error al crear Admin:', error);
      }
    );
  }


  onDepartamentoChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const departamentoId = +target.value;
    this.getMunicipios(departamentoId); // Llama al método para filtrar los municipios por departamento
  }

  getIps(): void {
    this.ipsService.getIps().subscribe(
      (data: { estado: string; ips: Ips[] }) => {
        if (data.estado === "Ok" && Array.isArray(data.ips)) {
          this.listIps = data.ips;
        } else {
          console.error('Estructura de datos inesperada:', data);
        }
      },
      (error: any) => {
        console.error('Error al obtener los datos de IPS:', error);
      }
    );
  }

  getTipoDocumentos(): void {
    this.tipoDocumentoService.getTipoDocumentos().subscribe(
      (data: { estado: string; documento: TipoDocumento[] }) => {
        if (data.estado === "Ok" && Array.isArray(data.documento)) {
          this.listTipoDocumentos = data.documento;
        } else {
          console.error('Estructura de datos inesperada:', data);
        }
      },
      (error: any) => {
        console.error('Error al obtener los datos de Tipo Documento:', error);
      }
    );
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

  closeModal(): void {
    this._matDialogRef.close();
  }
}
