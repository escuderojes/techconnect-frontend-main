import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { ReclutadorService } from '../../core/services/reclutador.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-page-main-reclu',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './page-main-reclu.component.html',
  styleUrl: './page-main-reclu.component.css'
})
export class PageMainRecluComponent implements OnInit{

  estudiantes: any[] = [];
  currentPage: number = 1;
  totalPages: number=1;
  errorMessage: string | null=null;

  constructor(
    private authService:AuthService, 
    private reclutadorService:ReclutadorService, 
    private router:Router){}

  ngOnInit(): void {
    this.cargarEstudiantes(this.currentPage);
  }

  cargarEstudiantes(page:number): void {
    this.reclutadorService.obtenerEstudiantesPaginados(page).subscribe({
      next: (response) => {
        this.estudiantes = response.data;
        this.currentPage = response.currentPage;
        this.totalPages = response.last_page;;
      },
      error: (error) => {
        this.errorMessage = error.message || 'Error al cargar los datos de los estudiantes';
      }
    });
  }

  cambiarPagina(page:number): void{
    if(page > 0 && page<= this.totalPages){
      this.cargarEstudiantes(page);
    }
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
        
        // Redirige al usuario a la página de inicio de sesión
        this.router.navigate(['/home']);
      },
      error: (err) => {
        console.error('Logout failed:', err);
        // Opcional: manejar el error de logout, por ejemplo mostrando un mensaje al usuario
      }
    });
  }

  
}
