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

  onSubmit(){
      this.insertarReclutador();
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
