import { Component } from '@angular/core';
import { MenuService } from '../../../Services/menu.service';
import { ReportesService } from '../../../Services/reportes.service';
import { PoblacionDiferencialService } from '../../../Services/poblacion-diferencial.service';
import { DepartamentoService } from '../../../Services/departamento.service';

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrl: './reporte.component.css'
})
export class ReporteComponent {

  isExpanded = true;
  isVisible = true;

  filtros = {
    categoria: '',
    subcategoria: '',
    fecha_inicio: '',
    fecha_fin: '',
    cod_departamento: null,
    cod_municipio: null,
    cod_poblacion: null,
  };

  resultados: any[] = [];

  categorias = [
    {
      nombre: 'Gestación Saludable',
      valor: 'gestacion_saludable',
      subcategorias: [
        { nombre: 'Micronutrientes', valor: 'Micronutrientes' },
        { nombre: 'Curso Prenatal', valor: 'Curso Prenatal' },
        { nombre: 'Nutrición', valor: 'Nutrición' },
        { nombre: 'Salud Bucal', valor: 'Salud_bucal' },
        { nombre: 'Psicología', valor: 'Psicologia' },
        { nombre: 'Ginecología', valor: 'Ginecologia' },
      ],
    },
    {
      nombre: 'Parto Humanizado',
      valor: 'parto_humanizado',
      subcategorias: [
        { nombre: 'Cesáreas', valor: 'cesareas' },
        { nombre: 'Monitorización', valor: 'monitorizacion' },
      ],
    },
    {
      nombre: 'Puerperio Seguro',
      valor: 'puerperio_seguro',
      subcategorias: [
        { nombre: 'Asesoría Anticonceptiva', valor: 'asesoria_anticonceptiva' },
        { nombre: 'Métodos Anticonceptivos', valor: 'metodos_anticonceptivos' },
      ],
    },
    {
      nombre: 'Neonatos Saludables',
      valor: 'neonatos_saludables',
      subcategorias: [
        { nombre: 'Alta oportuna', valor: 'alta_oportuna' },
      ],
    },
    {
      nombre: 'Planeación Familiar',
      valor: 'planeacion_familiar',
      subcategorias: [
        { nombre: 'Intención Reproductiva', valor: 'intencion_reproductiva' },
        { nombre: 'Consulta IVE', valor: 'consulta_ive' },
      ],
    },
    {
      nombre: 'Gestantes Sin Riesgo',
      valor: 'gestantes_sin_riesgo',
      subcategorias: [
        { nombre: 'Tratamiento de Sífilis', valor: 'tratamiento_sifilis' },
      ],
    },
    {
      nombre: 'Atención Neonatal',
      valor: 'atencion_neonatal',
      subcategorias: [
        { nombre: 'Tamizaje Hipotiroidismo', valor: 'tamizaje_hipotiroidismo' },
        { nombre: 'Vacunación', valor: 'vacunacion' },
        { nombre: 'Cardiopatías', valor: 'cardiopatias' },
      ],
    },
  ];

  subcategorias = [];
  poblaciones = [];
  departamentos = [];

  constructor(
    private menuService: MenuService,
    private reporteService: ReportesService,
    private poblacionDifeService: PoblacionDiferencialService,
    private departamentoService: DepartamentoService
  ) { }


  ngOnInit(): void {
    this.menuService.isExpanded$.subscribe(isExpanded => {
      this.isExpanded = isExpanded;
    });
    this.menuService.menuVisible$.subscribe(isVisible => {
      this.isVisible = isVisible;
    });
    this.getPoblacionDiferencial();
    this.getDepartamentos();
  }

  onCategoriaChange() {
    const categoriaSeleccionada = this.categorias.find(cat => cat.valor === this.filtros.categoria);
    this.subcategorias = categoriaSeleccionada ? categoriaSeleccionada.subcategorias : [];
  }

  // Método para enviar los filtros y obtener los reportes
  aplicarFiltros() {
    console.log('Aplicando filtros...', this.filtros);

    // Llamar al servicio para descargar el Excel
    this.reporteService.filtrarReportes(this.filtros).subscribe(
      (response) => {
        console.log('Descarga iniciada');
        const blob = new Blob([response], {
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'reporte.xlsx'; // Nombre del archivo
        a.click();
        window.URL.revokeObjectURL(url);
      },
      (error) => {
        console.error('Error al descargar el archivo:', error);
      }
    );
  }


  getPoblacionDiferencial(){
    this.poblacionDifeService.getPoblacionDiferencial().subscribe(
      (response)=>{
        console.log(response);
        this.poblaciones = response.poblacion;
      },
      (error)=>{
        console.log(error);
      }
    )
  }

  getDepartamentos(){
    this.departamentoService.getDepartamentos().subscribe(
      (response)=>{
        console.log(response);
        this.departamentos = response.departamento;
      },
      (error)=>{
        console.log(error);
      }
    )
  }
}
