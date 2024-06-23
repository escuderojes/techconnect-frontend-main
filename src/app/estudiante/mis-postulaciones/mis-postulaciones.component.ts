import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { EstudianteService } from '../../core/services/estudiante.service';

@Component({
  selector: 'app-mis-postulaciones',
  standalone: true,
  imports: [ RouterLink, FormsModule, CommonModule],
  templateUrl: './mis-postulaciones.component.html',
  styleUrl: './mis-postulaciones.component.css'
})
export class MisPostulacionesComponent implements OnInit{
  postulaciones: any[]=[];
  currentPage: number =1;
  totalPages: number =1;
  estudianteId: string='';
  errorMessage: string|null=null;
  
  constructor(
    private estudianteService:EstudianteService,
    private router:Router,
    private route:ActivatedRoute
  ) { }
  ngOnInit(): void {
    this.estudianteId= this.route.snapshot.paramMap.get('estudianteId') ?? '';
    console.log("Estudiante ID:", this.estudianteId);
    if(this.estudianteId){
      this.cargarPostulaciones(this.currentPage);
    }else{
      this.errorMessage= 'No se pudo encontrar del estudiante'
    }
  }

  loading:boolean=false;
  cargarPostulaciones(page:number){
    this.loading=true;
    this.estudianteService.verMisPostulaciones(this.estudianteId,page).subscribe({
      next:(response)=>{
        this.postulaciones=response.postulaciones.data;
        this.currentPage=response.postulaciones.currentPage;
        this.totalPages=response.postulaciones.totalPages;
        this.loading=false;
      },
      error:(error)=>{
        this.errorMessage=error.message || 'Error al cargar las postulaciones';
        this.loading=false;
      }
    });
  }

  cambiarPagina(page:number): void{
    if(page > 0 && page<= this.totalPages){
      this.cargarPostulaciones(page);
    }
  }

}
