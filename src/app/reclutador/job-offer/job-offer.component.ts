import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ReclutadorService } from '../../core/services/reclutador.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-job-offer',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
    FormsModule
  ],
  templateUrl: './job-offer.component.html',
  styleUrl: './job-offer.component.css'
})
export class JobOfferComponent implements OnInit {

  oferta: any= {
    titulo: '',
    nombreEmpresa: '',
    ciudad: '',
    sueldo: '',
    carrera: '',
    descripcion: '',
    habilidades: []
  };
  errorMessage:string|null=null;
  successMessage:string|null=null;
  skills: any[]=[];
  habilidadesSeleccionadas:number[]=[];
  reclutador: any = {};
  
  constructor(
    private reclutadorService: ReclutadorService,
    private authService: AuthService,
    private router:Router,
    private route:ActivatedRoute
  ) { }
  ngOnInit(): void {
    this.cargarSkills();
    this.cargarDatosReclutador();
  }

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
  cargarDatosReclutador():void{
    this.reclutadorService.reclutadorLogueado().subscribe({
      next: (response) => {
        this.reclutador= response.reclutador;
      },
      error: (error)=>{
        console.error('Error al cargar los datos del reclutador', error)
      }
    });
  }

  insertarOferta(){
    this.oferta.habilidades= this.habilidadesSeleccionadas;
    if (!this.authService.getEmailVerified()) {
      this.errorMessage= 'Su correo electrónico no está verificado. Por favor, verifíquelo para acceder a todas las funciones.';
      this.successMessage= null;
      return;
    }

    this.reclutadorService.insertarOferta(this.oferta).subscribe({
      next: (response) => {
          this.errorMessage=null;
          this.successMessage= response.mensaje;
          console.log('Oferta insertada con éxito', response);
          // Redirigir después de un tiempo
          setTimeout(() => {
            this.router.navigate(['reclutador/home.reclutador']);
          }, 2000); 
      },
      error: (error) => {
        console.log('Error al insertar la oferta', error);
        this.successMessage=null;
        this.errorMessage= error.message;
      }
    });
  }
  onSubmit(){
    this.insertarOferta();
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
