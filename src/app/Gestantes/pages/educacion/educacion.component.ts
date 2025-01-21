import { Component } from '@angular/core';
import { MenuService } from '../../../Services/menu.service';


interface Resource {
  title: string;
  link: string;
  icon: string;
  category: string;
}

@Component({
  selector: 'app-educacion',
  templateUrl: './educacion.component.html',
  styleUrl: './educacion.component.css'
})


export class EducacionComponent {
  isExpanded = true;
  isVisible = true;
  searchTerm: string = '';
  selectedCategory: string = 'Todos';


  categories: string[] = [
    'Todos',
    'Maternidad',
    'Cuidado Infantil',
    'Salud Oral',
    'Preparación',
    'Cursos'
  ];

  filteredResources: Resource[] = [];

  resources: Resource[] = [
    {
      title: 'Todo lo que debes saber sobre la lactancia materna',
      link: 'https://drive.google.com/file/d/19cKQ9tDmMmpfRNzdNiTorZ2a60ERJ5Nm/view',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                     stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                    class="lucide lucide-droplets">
                    <path
                        d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z" />
                    <path
                        d="M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97" />
                </svg>`,
      category: 'Maternidad'
    },
    {
      title: 'Programas de promoción y prevención para todas las edades',
      link: 'https://drive.google.com/file/d/1H7LqjVaFP6qla92DOkZIsF1_QmH4p_sg/view',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
              class="text-white">
              <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
              <path d="m9 12 2 2 4-4" />
            </svg>`,
      category: 'Preparación'
    },
    {
      title: 'Consultas y vacunas según tu edad',
      link: 'https://drive.google.com/file/d/1Ir7j5Rz4J13GMyvZICjZrAsI1oO8ADEp/view',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
              class="text-white">
              <path d="m18 2 4 4" />
              <path d="m17 7 3-3" />
              <path d="M19 9 8.7 19.3c-1 1-2.5 1-3.4 0l-.6-.6c-1-1-1-2.5 0-3.4L15 5" />
              <path d="m9 11 4 4" />
              <path d="m5 19-3 3" />
              <path d="m14 4 6 6" />
            </svg>`,
      category: 'Cuidado Infantil'
    },
    {
      title: 'Cuidados de salud oral en madres gestantes',
      link: 'https://edufoscal.com/comunidad/pacientessaludoralF.html',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
              class="text-white">
              <circle cx="12" cy="12" r="10" />
              <path d="M18 13a6 6 0 0 1-6 5 6 6 0 0 1-6-5h12Z" />
              <line x1="9" x2="9.01" y1="9" y2="9" />
              <line x1="15" x2="15.01" y1="9" y2="9" />
            </svg>`,
      category: 'Salud Oral'
    },
    {
      title: 'Cuidados de salud oral en bebes lactantes',
      link: 'https://edufoscal.com/comunidad/pacientessaludoralF.html',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
              class="text-white">
              <path d="M9 12h.01" />
              <path d="M15 12h.01" />
              <path d="M10 16c.5.3 1.2.5 2 .5s1.5-.2 2-.5" />
              <path d="M19 6.3a9 9 0 0 1 1.8 3.9 2 2 0 0 1 0 3.6 9 9 0 0 1-17.6 0 2 2 0 0 1 0-3.6A9 9 0 0 1 12 3c2 0 3.5 1.1 3.5 2.5s-.9 2.5-2 2.5c-.8 0-1.5-.4-1.5-1" />
            </svg>`,
      category: 'Salud Oral'
    },
    {
      title: 'Preparación para el parto',
      link: 'https://edufoscal.com/comunidad/preparación%20para%20el%20parto.html',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
              class="text-white">
              <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
              <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
              <path d="m9 14 2 2 4-4" />
            </svg>`,
      category: 'Preparación'
    },
    {
      title: 'Atención del parto',
      link: 'https://edufoscal.com/comunidad/atenciondelparto.html',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
              class="text-white">
              <path d="M12 6v4" />
              <path d="M14 14h-4" />
              <path d="M14 18h-4" />
              <path d="M14 8h-4" />
              <path d="M18 12h2a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-9a2 2 0 0 1 2-2h2" />
              <path d="M18 22V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v18" />
            </svg>`,
      category: 'Maternidad'
    },
    {
      title: 'Puerperio',
      link: 'https://edufoscal.com/comunidad/puerperio.html',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
              class="text-white">
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
              <path d="M12 5 9.04 7.96a2.17 2.17 0 0 0 0 3.08c.82.82 2.13.85 3 .07l2.07-1.9a2.82 2.82 0 0 1 3.79 0l2.96 2.66" />
              <path d="m18 15-2-2" />
              <path d="m15 18-2-2" />
            </svg>`,
      category: 'Maternidad'
    },
    {
      title: 'Curso de preparación para la maternidad y paternidad segura',
      link: 'https://edufoscal.com/comunidad/cursos.html',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
              class="text-white">
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <polyline points="16 11 18 13 22 9" />
            </svg>`,
      category: 'Cursos'
    },
    {
      title: 'Curso virtual ¿Cómo cuidar a tu bebé de 0 a 6 meses?',
      link: 'https://edufoscal.com/comunidad/cursos.html',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
              class="text-white">
              <path d="M2 20h20" />
              <path d="m9 10 2 2 4-4" />
              <rect x="3" y="4" width="18" height="12" rx="2" />
            </svg>`,
      category: 'Cursos'
    }
  ];

  constructor(private menuService: MenuService,) { }


  ngOnInit(): void {
    this.menuService.isExpanded$.subscribe(isExpanded => {
      this.isExpanded = isExpanded;
    });
    this.menuService.menuVisible$.subscribe(isVisible => {
      this.isVisible = isVisible;
    });

    this.filteredResources = [...this.resources];
  }

  filterByCategory(category: string) {
    this.selectedCategory = category;

    // If "Todos" is selected, show all resources
    if (category === 'Todos') {
      this.filteredResources = [...this.resources];
      return;
    }

    // Filter resources by selected category
    this.filteredResources = this.resources.filter(resource =>
      resource.category === category
    );
  }

  searchResources() {
    const searchLower = this.searchTerm.toLowerCase().trim();
    
    // First filter by category
    let results = this.selectedCategory === 'Todos' 
      ? [...this.resources]
      : this.resources.filter(resource => resource.category === this.selectedCategory);
    
    // Then filter by search term if one exists
    if (searchLower) {
      results = results.filter(resource =>
        resource.title.toLowerCase().includes(searchLower)
      );
    }

    this.filteredResources = results;
  }

  updateFilters() {
    this.searchResources();
  }


}
