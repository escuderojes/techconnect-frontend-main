import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { CommonModule } from '@angular/common';
import { EstudianteService } from '../../core/services/estudiante.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pag-main-estu',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule] ,
  templateUrl: './pag-main-estu.component.html',
  styleUrl: './pag-main-estu.component.css'
})
export class PagMainEstuComponent implements OnInit {
  ofertas: any[]= [];
  currentPage: number =1;
  totalPages: number =1;
  errorMessage: string|null=null;
  estudiante: any = {};
  skills: any[]= [];
  habilidadesSeleccionadas: number[] = [];

  constructor(
    private authService:AuthService, 
    private estudianteService:EstudianteService,
    private router:Router
  ){}
  
  ngOnInit(): void {
    this.cargarOfertas(this.currentPage);
    this.cargarDatosEstudiante();
    this.cargarSkills();

    // Verificar si el correo del usuario está verificado
    if (!this.authService.getEmailVerified()) {
      alert('Su correo electrónico no está verificado. Por favor, verifíquelo para acceder a todas las funciones.');
    }
   }

   loading:boolean=false;


   cargarSkills(): void {
    this.estudianteService.getSkills().subscribe({
      next: (response) => {
        this.skills = response.habilidades; // Asigna las habilidades recibidas del servicio
      },
      error: (error) => {
        console.error('Error al cargar las habilidades', error);
      }
    });
  }

   cargarOfertas(page:number):void{
    this.loading=true;
    this.estudianteService.obtenerOfertas(page).subscribe({
      next: (response) => {
        this.ofertas = response.ofertas.data;
        this.currentPage= response.ofertas.currentPage;
        this.totalPages = response.ofertas.last_page;
        this.loading=false;
      },
      error: (error) => {
        this.errorMessage = error.message || 'Error al cargar los datos de las ofertas';
        this.loading=false;
      }
    });
   }

  cambiarPagina(page:number): void{
    if(page > 0 && page<= this.totalPages){
      this.cargarOfertas(page);
    }
  }

  cargarDatosEstudiante() : void{
    this.estudianteService.getEstudiante().subscribe({
      next: (response) => {
        this.estudiante = response.estudiante;
      },
      error: (error)=>{
        console.error('Error al cargar los datos del estudiante', error)
      }
  });
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

  buscarOfertasPorHabilidades(): void {
    this.estudianteService.filtrarOfertasporHabilidades(this.habilidadesSeleccionadas).subscribe({
      next: (response)=> {
        this.ofertas = response.ofertas.data;
        this.currentPage = response.ofertas.currentPage;
        this.totalPages = response.ofertas.last_page;
      }
    });
  }

  // Método para manejar cambios en los checkboxes de habilidades
  onSkillChange(skillId: number): void {
    const index = this.habilidadesSeleccionadas.indexOf(skillId);
    if (index === -1) {
      this.habilidadesSeleccionadas.push(skillId); // Agregar habilidad seleccionada
    } else {
      this.habilidadesSeleccionadas.splice(index, 1); // Quitar habilidad seleccionada si ya está seleccionada
    }
  }  
}
