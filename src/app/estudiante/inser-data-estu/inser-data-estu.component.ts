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
  successMessage:string |null=null;
  selectedFile: File | null = null;
  
  constructor(
    private estudianteService: EstudianteService,
    private router:Router,
    private route:ActivatedRoute
  ) { }
  
  ngOnInit(): void {
    this.estudianteId = this.route.snapshot.paramMap.get('id') ?? ''; 
    console.log('Estudiante ID: ', this.estudianteId)
  }

  insertarEstudiante(){
    this.estudianteService.insertarEstudiante(this.estudiante).subscribe({
      next: (response) =>{
        this.errorMessage = null;
        console.log('Estudiante insertado con éxito', response);
        this.router.navigate(['estudiante/profile', this.estudianteId]);
      },
      error: (error: Error) =>{
        console.log('Error al insertar estudiante', error);
        this.errorMessage = error.message;
      }
    });
  }

  onSubmit(){
    this.insertarEstudiante();
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
