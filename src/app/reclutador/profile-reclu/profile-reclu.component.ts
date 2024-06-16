import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ReclutadorService } from '../../core/services/reclutador.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile-reclu',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './profile-reclu.component.html',
  styleUrl: './profile-reclu.component.css'
})
export class ProfileRecluComponent implements OnInit{

  reclutador: any = {};
  reclutadorId: string='';
  errorMessage: string|null=null;

  // Base URL for the server (replace with your actual server URL)
  readonly serverUrl: string = 'http://localhost:8000'; // Reemplazar con la URL de tu servidor

  constructor(
    private reclutadorService: ReclutadorService, 
    private router:Router,
    private route:ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.reclutadorId = this.route.snapshot.paramMap.get('id') ?? '';
    if(this.reclutadorId){
      this.cargarDatos();
    }else{
      this.errorMessage="No se encontró el reclutador";
    }
  }

  cargarDatos(){
    this.reclutadorService.getReclutador(this.reclutadorId).subscribe({
      next: (response) => {
        this.errorMessage = null;
        this.reclutador = response;

         // Si el logo no está definido, usamos 'default.png' como predeterminado
         if (!this.reclutador.logo) {
          this.reclutador.logo = 'default.png';
        }
      },
      error: (error: Error) => {
        console.error('Error al cargar los datos del reclutador',error);
        this.errorMessage= error.message;
      }
    });
  }

  onButtonClick(): void{
    if(this.reclutador){
      this.router.navigate(['register/data', this.reclutadorId, 'Actualizar Datos']);
    } else{
      this.router.navigate(['register/data', this.reclutadorId, 'Insertar Datos'])
    }
  }

  getImageUrl(): string {
    // Si el logo es 'default.png', usa la URL de la imagen predeterminada
    if (this.reclutador.logo === 'default.png') {
      return 'https://www.researchgate.net/profile/Maria-Monreal/publication/315108532/figure/fig1/AS:472492935520261@1489662502634/Figura-2-Avatar-que-aparece-por-defecto-en-Facebook.png';
    } else {
      // Construye la URL completa para la imagen del reclutador
      return `${this.serverUrl}/imagesreclutador/${this.reclutador.logo}`;
    }
  }
  
}
