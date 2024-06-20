import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { EstudianteService } from '../../core/services/estudiante.service';
import { ReclutadorService } from '../../core/services/reclutador.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent implements OnInit{
  estudiante:any= {};
  estudianteId: string='';
  errorMessage: string|null=null;
  readonly serverUrl: string = 'http://localhost:8000';
  constructor(
    private route:ActivatedRoute,
    private reclutadorService: ReclutadorService
  ) { }

  ngOnInit(): void { 
    this.estudianteId = this.route.snapshot.paramMap.get('id') ?? '';
    console.log("Estudiante ID: ", this.estudianteId);
    if(this.estudianteId){
      this.cargarEstudiante();
    }else{
      this.errorMessage= 'No se encontró el estudiante'
    }
    
  }

  cargarEstudiante(){
    this.reclutadorService.obtenerEstudianteporId(this.estudianteId).subscribe({
      next: (response) => {
        this.errorMessage= null;
        this.estudiante = response.estudiante;

        if(!this.estudiante.photo){
          this.estudiante.photo = 'default.png';
        }
      },
      error: (error:Error) => {
        console.error('Error al cargar los datos del estudiante', error);
        this.errorMessage= 'Error al cargar los datos del estudiante';
      }
    });
  }

  getImageUrl(): string {
    if (this.estudiante.photo === 'default.png') {
      return 'https://www.researchgate.net/profile/Maria-Monreal/publication/315108532/figure/fig1/AS:472492935520261@1489662502634/Figura-2-Avatar-que-aparece-por-defecto-en-Facebook.png';
    } else {
      return `${this.serverUrl}/images/${this.estudiante.photo}`;
    }
  }

}
