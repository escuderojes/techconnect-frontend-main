import { Component, OnInit } from '@angular/core';
import { EstudianteService } from '../../core/services/estudiante.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-actu-data-estu',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './actu-data-estu.component.html',
  styleUrl: './actu-data-estu.component.css',
})
export class ActuDataEstuComponent implements OnInit{
  
  estudiante:any={};
  estudianteId:string='';  
  errorMessage: string|null=null;
  successMessage:string |null=null;
  selectedFile: File | null = null;

  constructor(
    private estudianteService: EstudianteService, 
    private router:Router,
    private route:ActivatedRoute
  ){}
  ngOnInit(): void {
    this.estudianteId = this.route.snapshot.paramMap.get('estudianteId') ?? '';
    console.log('Estudiante ID:', this.estudianteId)
    if(this.estudianteId){
      this.cargarDatos();
    }else{
      this.errorMessage= 'No se encontró al estudiante'
    }
  }

  cargarDatos(){
    this.estudianteService.obtenerEstudiante(this.estudianteId).subscribe({
      next: (response) => {
        console.log('Respuesta del servidor: ', response)
        this.errorMessage = null;
        this.estudiante = response.estudiante;

        if (this.estudiante.photo) {
          const logoUrl = `http://localhost:8000/images/${this.estudiante.photo}`;
          const selectedImage = document.getElementById('selectedImage') as HTMLImageElement;
          selectedImage.src = logoUrl;
        }
        
      },
      error: (error: Error) => {
        console.error('Error al cargar los datos del estudiante',error);
        this.errorMessage= 'El estudiante no tiene datos o hubo un error al cargar sus datos';
      }
    });
  }

  actualizarEstudiante(){
    if(this.estudiante){
      const formData = new FormData();

      // Agregar archivo de photo si está presente
      if (this.selectedFile) {
          formData.append('photo', this.selectedFile);
      }
      // Agregar otros campos del estudiante
      formData.append('nombres', this.estudiante.nombres);
      formData.append('apellidos', this.estudiante.apellidos);
      formData.append('genero', this.estudiante.genero);
      formData.append('fecha_nacimiento', this.estudiante.fecha_nacimiento);
      formData.append('correo', this.estudiante.correo);
      formData.append('telefono', this.estudiante.telefono);
      formData.append('carrera', this.estudiante.carrera);
      formData.append('bio', this.estudiante.bio)
      this.estudianteService.actualizarEstudiante(this.estudianteId, formData).subscribe({
        next: (response) => {
          this.errorMessage= null;
          console.log('Estudiante actualizado con éxito', response)
          this.successMessage = 'Estudiante actualizado con éxito';
          this.router.navigate(['/estudiante/profile',this.estudianteId]);
        },
        error: (error: Error)=>{
          console.log('Error al actualizar el estudiante',error)
          this.errorMessage = error.message;
        }
      });
    }
   
  }

  onSubmit(){
    console.log('Datos a enviar: ', this.estudiante)
    this.actualizarEstudiante();
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
