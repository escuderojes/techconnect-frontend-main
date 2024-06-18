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
  selectedFile: File | null = null;

  constructor(
    private reclutadorService: ReclutadorService, 
    private router:Router,
    private route:ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.reclutadorId = this.route.snapshot.paramMap.get('reclutadorId') ?? '';
    console.log('Reclutador ID:', this.reclutadorId)
    if(this.reclutadorId){
      this.cargarDatos();
    }else{
      this.errorMessage="No se encontró el reclutador";
    }
  }

  cargarDatos(){
    this.reclutadorService.getReclutador(this.reclutadorId).subscribe({
      next: (response) => {
        console.log('Respuesta del servidor: ', response)
        this.errorMessage = null;
        this.reclutador = response.reclutador; 
              // Actualizar la imagen del logo si existe
      if (this.reclutador.logo) {
        const logoUrl = `http://localhost:8000/imagesreclutador/${this.reclutador.logo}`;
        const selectedImage = document.getElementById('selectedImage') as HTMLImageElement;
        selectedImage.src = logoUrl;
      }

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
        this.router.navigate(['/home.reclutador']);
      },
      error: (error: Error) =>{
        console.log('Error al insertar reclutador', error);
        this.errorMessage = error.message;
      }
    });
  }

  actualizarReclutador(){
    if(this.reclutadorId){
        const formData = new FormData();

        // Agregar archivo de logo si está presente
        if (this.selectedFile) {
            formData.append('logo', this.selectedFile);
        }

        // Agregar otros campos del reclutador
        for (const key in this.reclutador) {
            if (this.reclutador.hasOwnProperty(key) && key !== 'logo') {
                formData.append(key, this.reclutador[key]);
            }
        }
      this.reclutadorService.actualizarReclutador(this.reclutadorId,this.reclutador).subscribe({
        next: (response) => {
          this.errorMessage = null;
          console.log('Reclutador actualizado con exito', response)
          this.router.navigate(['reclutador//home.reclutador']);
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
        if (this.reclutador.hasOwnProperty(key) && key !== 'logo') {
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

  logoSelect(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const selectedImage = document.getElementById('selectedImage') as HTMLImageElement;
        selectedImage.src = e.target.result;
      };
      reader.readAsDataURL(file);
    } else {
      alert('Por favor, selecciona una imagen primero.');
    }
  }
}
