import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { EstudianteService } from '../../core/services/estudiante.service';

@Component({
  selector: 'app-profile-estu',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './profile-estu.component.html',
  styleUrl: './profile-estu.component.css'
})
export class ProfileEstuComponent implements OnInit{
  
  estudiante: any = {};
  estudianteId: string='';
  errorMessage: string|null=null;
  // Base URL for the server (replace with your actual server URL)
  readonly serverUrl: string = 'http://localhost:8000'; // Reemplazar con la URL de tu servidor

  constructor(
    private estudianteService:EstudianteService,
    private router:Router,
    private route:ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.estudianteId = this.route.snapshot.paramMap.get('id') ?? '';
    console.log("Estudiante ID: ", this.estudianteId);
    if(this.estudianteId){
      this.cargarDatos();
    }else{
      this.errorMessage="No se encontró el estudiante";
    }
  }

  cargarDatos(){
    this.estudianteService.obtenerEstudiante(this.estudianteId).subscribe({
      next: (response) => {
        this.errorMessage = null;
        this.estudiante = response.estudiante;

        if (!this.estudiante.photo) {
          this.estudiante.photo = 'default.png';
        }
        
      },
      error: (error: Error) => {
        console.error('Error al cargar los datos del estudiante',error);
        this.errorMessage= error.message;
      }
    });
  }

  onButtonClick(): void{
    const action= this.estudiante ? 'Actualizar' : 'Insertar';
    console.log('Navigate to:',`estudiante/inser-data/${this.estudianteId}/${action}` )
   this.router.navigate([`estudiante/inser-data/${this.estudianteId}/${action}`]);
  }

  getImageUrl(): string {
    if (this.estudiante.photo === 'default.png') {
      return 'https://www.researchgate.net/profile/Maria-Monreal/publication/315108532/figure/fig1/AS:472492935520261@1489662502634/Figura-2-Avatar-que-aparece-por-defecto-en-Facebook.png';
    } else {
      return `${this.serverUrl}/images/${this.estudiante.photo}`;
    }
  }
}
