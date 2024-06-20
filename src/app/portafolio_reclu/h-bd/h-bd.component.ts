import { Component, AfterViewInit, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { skillsBd, animateProgress, Skill } from './h-bd';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ReclutadorService } from '../../core/services/reclutador.service';

@Component({
  selector: 'app-h-bd',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './h-bd.component.html',
  styleUrls: ['./h-bd.component.css', './circle2.css', './style-sw.css']
})
export class HBdComponent implements AfterViewInit, OnInit {
  skills: Skill[] = [];
  estudiante:any= {};
  estudianteId: string='';
  errorMessage: string|null=null;
  readonly serverUrl: string = 'http://localhost:8000';

  constructor(
    private route: ActivatedRoute,
    private reclutadorService:ReclutadorService
  ) {
    this.skills = skillsBd; // Asigna las habilidades en el constructor
  }

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

  ngAfterViewInit(): void {
    // Verifica si 'skills' está correctamente inicializado
    console.log(this.skills);

    // Llama a 'animateProgress' con las habilidades correctamente inicializadas
    animateProgress(this.skills);
  }
}
