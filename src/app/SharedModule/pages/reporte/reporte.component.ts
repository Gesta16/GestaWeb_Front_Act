import { Component } from '@angular/core';
import { MenuService } from '../../../Services/menu.service';
import { ReportesService } from '../../../Services/reportes.service';

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
        { nombre: 'Curso Prenatal', valor: 'Curso_prenatal' },
        { nombre: 'Nutrición', valor: 'Nutricion' },
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


  constructor(
    private menuService: MenuService,
    private reporteService: ReportesService
  ) { }


  ngOnInit(): void {
    this.menuService.isExpanded$.subscribe(isExpanded => {
      this.isExpanded = isExpanded;
    });
    this.menuService.menuVisible$.subscribe(isVisible => {
      this.isVisible = isVisible;
    });
  }

  onCategoriaChange() {
    const categoriaSeleccionada = this.categorias.find(cat => cat.valor === this.filtros.categoria);
    this.subcategorias = categoriaSeleccionada ? categoriaSeleccionada.subcategorias : [];
  }

  // Método para enviar los filtros y obtener los reportes
  aplicarFiltros() {
    console.log('Aplicando filtros...', this.filtros); 
    this.reporteService.filtrarReportes(this.filtros).subscribe(
      (data) => {
        this.resultados = data; // Guardar los resultados obtenidos
        console.log('Resultados:', data);
      },
      (error) => {
        console.error('Error al obtener los indicadores:', error);
      }
    );
  }
}
