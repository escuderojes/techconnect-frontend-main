import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-actu-data-estu',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './actu-data-estu.component.html',
  styleUrls: ['./actu-data-estu.component.css']
})
export class ActuDataEstuComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.initializeFileUploadListener();
  }

  initializeFileUploadListener(): void {
    const photoInput = document.getElementById('photo') as HTMLInputElement;
    const selectedImage = document.getElementById('selectedImage') as HTMLImageElement;

    photoInput.addEventListener('change', function() {
      const file = photoInput.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
          if (e.target) {
            selectedImage.src = e.target.result as string;
          }
        }       
        reader.readAsDataURL(file);
      } else {
        alert('Por favor, selecciona una imagen primero.');
      }
    });
  }
}
