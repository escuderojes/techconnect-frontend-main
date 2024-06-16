import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReclutadorService } from '../../core/services/reclutador.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reg-data-reclu',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './reg-data-reclu.component.html',
  styleUrl: './reg-data-reclu.component.css'
})
export class RegDataRecluComponent implements OnInit {

  reclutador: any = {};
  reclutadorId: string='';
  errorMessage: string|null=null;

  constructor(
    private reclutadorService: ReclutadorService, 
    private router:Router,
    private route:ActivatedRoute
  ) { }
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
        
      },
      error: (error: Error) => {
        console.error('Error al cargar los datos del reclutador',error);
        this.errorMessage= error.message;
      }
    });
  }

  insertarReclutador(){
    this.reclutadorService.insertarReclutador(this.reclutador).subscribe({
      next: (response) =>{
        this.errorMessage = null;
        console.log('Reclutador insertado con éxito', response);
        this.router.navigate(['/home.estudiante']);
      },
      error: (error: Error) =>{
        console.log('Error al insertar reclutador', error);
        this.errorMessage = error.message;
      }
    });
  }

  actualizarReclutador(){
    if(this.reclutadorId){
      this.reclutadorService.actualizarReclutador(this.reclutadorId,this.reclutador).subscribe({
        next: (response) => {
          this.errorMessage = null;
          console.log('Reclutador actualizado con exito', response)
          this.router.navigate(['/reclutador/profile']);
        },
        error: (error: Error) => {
          console.error('Error al actualizar el reclutador', error)
          this.errorMessage = error.message;
        }
      });
    }
  }

  onSubmit(){
    if(this.reclutadorId){
      this.actualizarReclutador();
    }else{
      this.insertarReclutador();
    }
  }

  // Método para manejar la selección de un archivo
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('logo', file);

      // Adjuntar otros campos del reclutador
      for (const key in this.reclutador) {
        if (this.reclutador.hasOwnProperty(key)) {
          formData.append(key, this.reclutador[key]);
        }
      }

      // Usar formData en la solicitud de actualización o inserción
      if (this.reclutadorId) {
        this.reclutadorService.actualizarReclutador(this.reclutadorId, formData).subscribe({
          next: (response) => {
            this.errorMessage = null;
            console.log('Reclutador actualizado con éxito', response);
            this.router.navigate(['/reclutador/home.reclutador']);
          },
          error: (error: Error) => {
            console.error('Error al actualizar el reclutador', error);
            this.errorMessage = 'Error al actualizar el reclutador';
          }
        });
      } else {
        this.reclutadorService.insertarReclutador(formData).subscribe({
          next: (response) => {
            this.errorMessage = null;
            console.log('Reclutador insertado con éxito', response);
            this.router.navigate(['/reclutador/home.reclutador']);
          },
          error: (error: Error) => {
            console.error('Error al insertar el reclutador', error);
            this.errorMessage = 'Error al insertar el reclutador';
          }
        });
      }
    }
  }
}
