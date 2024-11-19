import { Component } from '@angular/core';
import { Usuario } from '../../../Models/Usuario.model';
import { Departamento } from '../../../Models/Departamento.model';
import { Municipio } from '../../../Models/Municipio.model';
import { Ips } from '../../../Models/Ips.model';
import { TipoDocumento } from '../../../Models/Tipo-documento.model';
import { PoblacionDiferencial } from '../../../Models/Poblacion-diferencial.model';
import { UsuarioService } from '../../../Services/usuario.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DepartamentoService } from '../../../Services/departamento.service';
import { MunicipioService } from '../../../Services/municipio.service';
import { IpsService } from '../../../Services/ips.service';
import { TipoDocumentoService } from '../../../Services/tipo-documento.service';
import { PoblacionDiferencialService } from '../../../Services/poblacion-diferencial.service';
import { AlertService } from '../../../Services/alert.service';

@Component({
  selector: 'app-add-gestante',
  templateUrl: './add-gestante.component.html',
  styleUrl: './add-gestante.component.css'
})
export class AddGestanteComponent {
  openTab = 1;
  usuario: Usuario = new Usuario();

  isReadOnly = false;
  isReadOnlyEdad = true;
  listDepartamentos: Departamento[] = [];
  listMunicipios: Municipio[] = [];
  listIps: Ips[] = [];
  listTipoDocumentos: TipoDocumento[] = [];
  listPoblacionDiferencial: PoblacionDiferencial[] = [];
  id: number | null = null;
  isExpanded = true;
  isVisible = true;


  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    private departamentoService: DepartamentoService,
    private municipioService: MunicipioService,
    private ipsService: IpsService,
    private tipoDocumentoService: TipoDocumentoService,
    private poblacionDiferencialService: PoblacionDiferencialService,
    private route: ActivatedRoute,
    private alertService: AlertService,
  ) { }


  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = +params.get('id')!; // Obtiene el ID como número
      console.log('ID de la gestante:', this.id);

      if (this.id > 0) {
        this.getUsuario();
      } else {
        console.log('No se proporcionó un ID válido.');
      }
    });
    this.getDepartamentos();
    this.getIps();
    this.getTipoDocumentos();
    this.getPoblacionDiferencial();
  }





  getUsuario(): void {
    if (this.id !== null && this.id > 0) { // Verificar que el ID sea válido
      this.usuarioService.getUsuarioById(this.id).subscribe(
        (response) => {
          this.usuario = response.usuario;
          this.isReadOnly = true;
          console.log(response);
          this.getMunicipios(this.usuario.cod_departamento);
        },
        (error) => {
          this.alertService.errorAlert('Error', error.error.message);
          console.error('Error al obtener el usuario:', error);
          
        });
    }
  }

  toggleEdit() {
    this.isReadOnly = false;
  }

  onDepartamentoChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const departamentoId = +target.value;
    this.usuario.cod_departamento = departamentoId; // Actualizar el departamento en el IPS
    this.getMunicipios(departamentoId); // Actualizar la lista de municipios
  }

  toggleTabs(tabNumber: number) {
    this.openTab = tabNumber;
  }

  guardarUsuario() {
    // Verificar si estamos editando un usuario existente (si tiene un 'id')
    if (this.id) {
      // Editar usuario existente
      this.usuarioService.updateUsuario(this.id, this.usuario).subscribe({
        next: (response) => {
          this.alertService.successAlert('Éxito', 'Operación realizada con éxito').then(() => {
            this.isReadOnly = true;
          });          
          console.log('Usuario actualizado:', response);
          
        },
        error: (error) => {
          console.error('Error al actualizar el usuario:', error);
          this.alertService.errorAlert('Error',error.error.message);
        }
      });
    } else {
      // Crear nuevo usuario
      this.usuarioService.createUsuario(this.usuario).subscribe({
        next: (response) => {
          this.alertService.successAlert('Exito', response.message).then(()=>{
            this.router.navigate(['/list-gestantes']);
          });
          console.log('Usuario creado:', response);
        },
        error: (error) => {
          console.error('Error al crear el usuario:', error);
          this.alertService.errorAlert('Error', error.error.message);
        }
      });
    }
  }


  calcularEdad(): void {
    if (this.usuario.fec_nacimiento) {
      const hoy = new Date();
      const fechaNacimiento = new Date(this.usuario.fec_nacimiento);
      let edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
      const mes = hoy.getMonth() - fechaNacimiento.getMonth();
      if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNacimiento.getDate())) {
        edad--;
      }
      this.usuario.edad_usuario = edad.toString();
    } else {
      this.usuario.edad_usuario = '';
    }
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
    if (departamentoId) {
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

  getPoblacionDiferencial(): void {
    this.poblacionDiferencialService.getPoblacionDiferencial().subscribe(
      (data: { estado: string; poblacion: PoblacionDiferencial[] }) => {
        if (data.estado === "Ok" && Array.isArray(data.poblacion)) {
          this.listPoblacionDiferencial = data.poblacion;
        } else {
          console.error('Estructura de datos inesperada:', data);
        }
      },
      (error: any) => {
        console.error('Error al obtener los datos de Departamentos:', error);
      }
    );
  }

  volver() {
    if (this.id == null || this.id == 0) {
      this.router.navigate(['/list-gestantes']);
    } else {
      this.router.navigate(['/ruta-gestante', this.id]);
    }
  }
}
