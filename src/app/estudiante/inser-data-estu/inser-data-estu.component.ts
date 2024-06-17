import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EstudianteService } from '../../core/services/estudiante.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-inser-data-estu',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './inser-data-estu.component.html',
  styleUrl: './inser-data-estu.component.css'
})
export class InserDataEstuComponent implements OnInit{

  estudiante:any = {};
  estudianteId: string='';
  errorMessage: string | null=null;
  
  constructor(
    private estudianteService: EstudianteService,
    private router:Router,
    private route:ActivatedRoute
  ) { }
  
  ngOnInit(): void {
    this.estudianteId = this.route.snapshot.paramMap.get('id')?? '';
    if(this.estudianteId){
      this.cargarDatos();
    }else {
      this.errorMessage= "No se encontró el estudiante";
    }
  }

  cargarDatos(){
    this.estudianteService.obtenerEstudiante(this.estudianteId).subscribe({
      next: (response) => {
        this.errorMessage = null;
        this.estudiante = response;
        
      },
      error: (error: Error) => {
        console.error('Error al cargar los datos del estudiante',error);
        this.errorMessage= error.message;
      }
    });
  }

  insertarEstudiante(){
    this.estudianteService.insertarEstudiante(this.estudiante).subscribe({
      next: (response) =>{
        this.errorMessage = null;
        console.log('Estudiante insertado con éxito', response);
        this.router.navigate(['/home.estudiante']);
      },
      error: (error: Error) =>{
        console.log('Error al insertar estudiante', error);
        this.errorMessage = error.message;
      }
    });
  }

  actualizarEstudiante(){
    if(this.estudianteId){
      this.estudianteService.actualizarEstudiante(this.estudianteId,this.estudiante).subscribe({
        next: (response) => {
          this.errorMessage = null;
          console.log('Estudiante actualizado con exito', response)
          this.router.navigate(['/estudiante/profile']);
        },
        error: (error: Error) => {
          console.error('Error al actualizar el estudiante', error)
          this.errorMessage = error.message;
        }
      });
    }
  }

  onSubmit(){
    if(this.estudianteId){
      this.actualizarEstudiante();
    }else{
      this.insertarEstudiante();
    }
  }

   // Método para manejar la selección de un archivo
   onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('photo', file);

      // Adjuntar otros campos del estudiante
      for (const key in this.estudiante) {
        if (this.estudiante.hasOwnProperty(key)) {
          formData.append(key, this.estudiante[key]);
        }
      }

      // Usar formData en la solicitud de actualización o inserción
      if (this.estudianteId) {
        this.estudianteService.actualizarEstudiante(this.estudianteId, formData).subscribe({
          next: (response) => {
            this.errorMessage = null;
            console.log('Estudiante actualizado con éxito', response);
            this.router.navigate(['/estudiante/home.estudiante']);
          },
          error: (error: Error) => {
            console.error('Error al actualizar el estudiante', error);
            this.errorMessage = 'Error al actualizar el estudiante';
          }
        });
      } else {
        this.estudianteService.insertarEstudiante(formData).subscribe({
          next: (response) => {
            this.errorMessage = null;
            console.log('Estudiante insertado con éxito', response);
            this.router.navigate(['/estudiante/home.estudiante']);
          },
          error: (error: Error) => {
            console.error('Error al insertar el estudiante', error);
            this.errorMessage = 'Error al insertar el estudiante';
          }
        });
      }
    }
  }
}
