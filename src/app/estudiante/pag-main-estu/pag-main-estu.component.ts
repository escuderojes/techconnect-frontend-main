import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { CommonModule } from '@angular/common';
import { EstudianteService } from '../../core/services/estudiante.service';

@Component({
  selector: 'app-pag-main-estu',
  standalone: true,
  imports: [RouterLink, CommonModule] ,
  templateUrl: './pag-main-estu.component.html',
  styleUrl: './pag-main-estu.component.css'
})
export class PagMainEstuComponent implements OnInit {
  ofertas: any[]= [];
  currentPage: number =1;
  totalPages: number =1;
  errorMessage: string|null=null;
  estudiante: any = {};

  constructor(
    private authService:AuthService, 
    private estudianteService:EstudianteService,
    private router:Router
  ){}
  
  ngOnInit(): void {
    this.cargarOfertas(this.currentPage);
    this.cargarDatosEstudiante();
   }

   loading:boolean=false;

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
        
        // Redirige al usuario a la página de inicio de sesión
        this.router.navigate(['/home']);
      },
      error: (err) => {
        console.error('Logout failed:', err);
      }
    });
  }

}
