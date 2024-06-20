import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { EstudianteService } from '../../core/services/estudiante.service';

@Component({
  selector: 'app-inser-skill-estu',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './inser-skill-estu.component.html',
  styleUrl: './inser-skill-estu.component.css'
})
export class InserSkillEstuComponent implements OnInit{
  skills: any[]= [];
  habilidadesSeleccionadas: number[] = [];
  errorMessage: string|null=null;
  successMessage: string | null = null;
  
  constructor(
    private estudianteService:EstudianteService,
    private router:Router
  ) { }
  ngOnInit(): void {
    this.cargarSkills();
  }

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

  // Método para manejar cambios en los checkboxes de habilidades
  onSkillChange(skillId: number): void {
    const index = this.habilidadesSeleccionadas.indexOf(skillId);
    if (index === -1) {
      this.habilidadesSeleccionadas.push(skillId); // Agregar habilidad seleccionada
    } else {
      this.habilidadesSeleccionadas.splice(index, 1); // Quitar habilidad seleccionada si ya está seleccionada
    }
  }  

  //asociar habilidades al estudiantes
  agregarHabilidadesAlEstudiantes():void{
    this.estudianteService.asociarHabilidadesEstudiante(this.habilidadesSeleccionadas).subscribe({
      next: (response) => {
        this.errorMessage= null;
        this.successMessage = 'Habilidades asociadas correctamente';
        console.log('Habilidades agregadas correctamente', response)
        // Redirigir después de un tiempo
        setTimeout(() => {
          this.router.navigate(['estudiante/home.estudiante']);
        }, 2000); 
      },
      error: (error) => {
        this.errorMessage = 'Error al asociar habilidades al estudiante';
        this.successMessage = null;
        console.log('Error al asociar las habilidades', error);
      }
    });
  }

}
