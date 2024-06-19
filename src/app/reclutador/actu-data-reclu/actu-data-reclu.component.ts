import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReclutadorService } from '../../core/services/reclutador.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-actu-data-reclu',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './actu-data-reclu.component.html',
  styleUrl: './actu-data-reclu.component.css'
})
export class ActuDataRecluComponent implements OnInit{

  reclutador: any={};
  reclutadorId: string='';
  errorMessage: string|null=null;
  successMessage:string |null=null;
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

  actualizarReclutador(){
    if(this.reclutadorId){
        const formData = new FormData();

        // Agregar archivo de logo si está presente
        if (this.selectedFile) {
            formData.append('logo', this.selectedFile);
        }

        // Agregar otros campos del reclutador
      formData.append('nombreEmpresa', this.reclutador.nombreEmpresa);
      formData.append('correo', this.reclutador.correo);
      formData.append('direccion', this.reclutador.direccion);
      formData.append('telefono', this.reclutador.telefono);
      formData.append('codigoPostal', this.reclutador.codigoPostal);
      formData.append('ciudad', this.reclutador.ciudad);
      formData.append('descripcionEmpresa', this.reclutador.descripcionEmpresa);
      this.reclutadorService.actualizarReclutador(this.reclutadorId,formData).subscribe({
        next: (response) => {
          this.errorMessage = null;
          console.log('Reclutador actualizado con exito', response)
          this.successMessage= 'Reclutador Actualizaco con exito'
        },
        error: (error: Error) => {
          console.error('Error al actualizar el reclutador', error)
          this.errorMessage = error.message;
        }
      });
    }
  }

  onSubmit(){
    console.log('Datos a enviar:', this.reclutador);
    this.actualizarReclutador();
  }

  // Método para manejar la selección de un archivo
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
        // Verificar el tipo de archivo
        const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
        if (!validTypes.includes(file.type)) {
            this.errorMessage = 'Solo se permiten archivos de tipo JPG, JPEG o PNG.';
            return;
        }

         // Verifica el tamaño del archivo (máximo 2 MB)
         const maxSize = 2 * 1024 * 1024; // 2MB
         if (file.size > maxSize) {
             this.errorMessage = 'El archivo debe tener un tamaño menor o igual a 2MB.';
             return;
         }

        this.selectedFile = file; // Asigna el archivo seleccionado
        this.previewImage(file);  // Previsualiza la imagen

        // Resetea el mensaje de error si es necesario
        this.errorMessage = null;
    }
  }

  previewImage(file: File) {
    const reader = new FileReader();
    reader.onload = (e: any) => {
        const selectedImage = document.getElementById('selectedImage') as HTMLImageElement;
        selectedImage.src = e.target.result;
    };
    reader.readAsDataURL(file);
}
}
