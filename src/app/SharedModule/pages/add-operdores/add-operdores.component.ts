import { Component } from '@angular/core';
import { Operador } from '../../../Models/Operador.model';
import { Ips } from '../../../Models/Ips.model';
import { TipoDocumento } from '../../../Models/Tipo-documento.model';
import { Admin } from '../../../Models/Admin.model';
import { Departamento } from '../../../Models/Departamento.model';
import { Municipio } from '../../../Models/Municipio.model';
import { MatDialogRef } from '@angular/material/dialog';
import { IpsService } from '../../../Services/ips.service';
import { TipoDocumentoService } from '../../../Services/tipo-documento.service';
import { AdminService } from '../../../Services/admin.service';
import { DepartamentoService } from '../../../Services/departamento.service';
import { MunicipioService } from '../../../Services/municipio.service';
import { OperadorService } from '../../../Services/operador.service';

@Component({
  selector: 'app-add-operdores',
  templateUrl: './add-operdores.component.html',
  styleUrl: './add-operdores.component.css'
})
export class AddOperadoresComponent {

  operador: Operador = new Operador();

  listIps: Ips[] = [];
  listTipoDocumentos: TipoDocumento[] = [];
  listAdmin: Admin[] = [];
  listDepartamentos: Departamento[] = [];
  listMunicipios: Municipio[] = [];

  constructor(
    public dialogRef: MatDialogRef<AddOperadoresComponent>,
    private operadorService: OperadorService,
    private ipsService: IpsService,
    private tipoDocumentoService: TipoDocumentoService,
    private adminService: AdminService,
    private departamentoService: DepartamentoService,
    private municipioService: MunicipioService,
  ) { }

  ngOnInit(): void {
    this.getIps();
    this.getTipoDocumentos();
    this.getAdmins();
    this.getDepartamentos();
    this.getMunicipios();
  }

  onSubmit(): void {
    this.operadorService.createOperador(this.operador).subscribe(
      response => {
        // Cierra el diálogo y pasa un valor de confirmación
        this.dialogRef.close(true);
      },
      error => {
        console.error('Error al crear Operador:', error);
      }
    );
  }

  onDepartamentoChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const departamentoId = +target.value;
    this.getMunicipios(departamentoId);
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

  getAdmins(): void {
    this.adminService.getAdmins().subscribe(
      (data: { estado: string; admin: Admin[] }) => {
        if (data.estado === "Ok" && Array.isArray(data.admin)) {
          this.listAdmin = data.admin;
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

  cerrar(): void {
    this.dialogRef.close();
  }
}
