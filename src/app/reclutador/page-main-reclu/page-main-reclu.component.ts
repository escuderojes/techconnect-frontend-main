import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { ReclutadorService } from '../../core/services/reclutador.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-page-main-reclu',
  standalone: true,
  imports: [
    RouterLink, 
    CommonModule, 
    FormsModule
  ],
  templateUrl: './page-main-reclu.component.html',
  styleUrl: './page-main-reclu.component.css'
})
export class PageMainRecluComponent implements OnInit{

  estudiantes: any[] = [];
  currentPage: number = 1;
  totalPages: number=1;
  errorMessage: string | null=null;
  errorMessage1: string | null=null;
  successMessage: string | null = null;
  reclutador: any = {};
  skills: any[] = [];
  habilidadesSeleccionadas: number[] = [];
  filteredEstudiantes: any[] = [];
  searchTerm: string = '';

  constructor(
    private authService:AuthService, 
    private reclutadorService:ReclutadorService, 
    private router:Router
  ){}

  ngOnInit(): void {
    this.cargarEstudiantes(this.currentPage);
    this.cargarDatosReclutador();
    this.cargarSkills();

    // Verificar si el correo del usuario está verificado
    if (!this.authService.getEmailVerified()) {
      this.errorMessage= 'Su correo electrónico no está verificado. Por favor, verifíquelo para acceder a todas las funciones.';
    }
  }

  loading:boolean=false;

  cargarSkills(): void {
    this.reclutadorService.getSkills().subscribe({
      next: (response) => {
        this.skills = response.habilidades; // Asigna las habilidades recibidas del servicio
      },
      error: (error) => {
        console.error('Error al cargar las habilidades', error);
      }
    });
  }

  cargarEstudiantes(page:number): void {
    this.loading=true;
    this.reclutadorService.obtenerEstudiantesPaginados(page).subscribe({
      next: (response) => {
        this.estudiantes = response.data;
        this.currentPage = response.current_page;
        this.totalPages = response.last_page;
        this.filteredEstudiantes = this.estudiantes;
        this.loading=false;
      },
      error: (error) => {
        this.errorMessage = error.message || 'Error al cargar los datos de los estudiantes';
        this.loading=false;
      }
    });
  }

  cambiarPagina(page:number): void{
    if(page > 0 && page<= this.totalPages){
      this.cargarEstudiantes(page);
    }
  }

  cargarDatosReclutador():void{
    this.reclutadorService.reclutadorLogueado().subscribe({
      next: (response) => {
        this.reclutador= response.reclutador;
      },
      error: (error)=>{
        console.error('Error al cargar los datos del reclutador', error)
        this.errorMessage1= 'Complete su perfil en Ver Perfil->Actualizar Datos';
      }
    });
  }

  getImageUrl(imageName: string): string {
    // Verifica si el nombre de la imagen está vacío o es la imagen predeterminada.
    if (!imageName || imageName === 'default.png') {
      return 'https://www.researchgate.net/profile/Maria-Monreal/publication/315108532/figure/fig1/AS:472492935520261@1489662502634/Figura-2-Avatar-que-aparece-por-defecto-en-Facebook.png';
    }
    // Construye la URL completa para acceder a la imagen en el servidor Laravel.
    return `http://localhost:8000/images/${imageName}`; // Cambia `localhost:8000` a la URL de tu servidor en producción.
  }

  onLogout(event: MouseEvent): void {
    event.preventDefault();
    this.authService.logout().subscribe({
      next: () => {
        // Limpia el token del localStorage
        this.authService.removeToken();
        this.authService.removeRole();
        this.authService.removeEmailVerified();
        
        // Redirige al usuario a la página de inicio de sesión
        this.router.navigate(['/home']);
      },
      error: (err) => {
        console.error('Logout failed:', err);
      }
    });
  }

  buscarEstudiantesPorHabilidades(): void {
    this.reclutadorService.filtrarEstudiantesPorHabilidades(this.habilidadesSeleccionadas).subscribe({
      next: (response) => {
        this.estudiantes = response.data;
        this.currentPage = response.current_page;
        this.totalPages = response.last_page;
        this.filterEstudiantes();
      }
    });
  }

  // Método para manejar cambios en los checkboxes de habilidades
  onSkillChange(skillId: number): void {
    const index = this.habilidadesSeleccionadas.indexOf(skillId);
    if (index > -1) {
      this.habilidadesSeleccionadas.splice(index, 1); // Quitar habilidad seleccionada si ya está seleccionada
    } else {
      this.habilidadesSeleccionadas.push(skillId); // Agregar habilidad seleccionada
    }
    this.filterEstudiantes();
  }
  onSearchChange(): void {
    this.filterEstudiantes(); // Filtrar estudiantes cuando cambia el término de búsqueda
  }

  filterEstudiantes(): void {
    const searchTerm = this.searchTerm.toLowerCase();
    let filtered = this.estudiantes;

    if (this.habilidadesSeleccionadas.length > 0) {
      filtered = filtered.filter(estudiante =>
        estudiante.habilidades.some((habilidad: any) =>
          this.habilidadesSeleccionadas.includes(habilidad.id)
        )
      );
    }

    if (searchTerm) {
      filtered = filtered.filter(estudiante =>
        estudiante.nombres.toLowerCase().includes(searchTerm) ||
        estudiante.carrera.toLowerCase().includes(searchTerm) ||
        estudiante.habilidades.some((habilidad: any) =>
          habilidad.nombreHabilidad.toLowerCase().includes(searchTerm)
        )
      );
    }

    this.filteredEstudiantes = filtered;
  }  

  resendVerificationEmail(){
    this.authService.resendVerification().subscribe({
      next: (response) => {
        this.successMessage = 'Correo de verificación enviado con éxito';
        this.errorMessage = null;
        console.log('Correo de verificación enviado con éxito', response);
      },
      error: (error) => {
        console.log('Error al enviar el correo de verificación', error);
        this.successMessage = null;
        this.errorMessage = error.error?.message || 'No se pudo enviar el correo de verificación';
      }
    });
  }
  
}
