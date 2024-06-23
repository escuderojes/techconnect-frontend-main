import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ReclutadorService } from '../../core/services/reclutador.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-see-postulation',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './see-postulation.component.html',
  styleUrl: './see-postulation.component.css'
})
export class SeePostulationComponent implements OnInit{
  postulaciones: any[]=[];
  currentPage: number =1;
  totalPages: number =1;
  ofertaId: string='';
  errorMessage: string|null=null;
  
  constructor(
    private reclutadorService:ReclutadorService,
    private router:Router,
    private route:ActivatedRoute
  ) { }
  ngOnInit(): void {
    this.ofertaId= this.route.snapshot.paramMap.get('ofertaId') ?? '';
    console.log("Oferta ID:", this.ofertaId);
    if(this.ofertaId){
      this.cargarPostulaciones(this.currentPage);
    }else{
      this.errorMessage= 'No se pudo encontrar la oferta'
    }
  }
  loading:boolean=false;
  cargarPostulaciones(page:number){
    this.loading=true;
    this.reclutadorService.verPostulaciones(this.ofertaId,page).subscribe({
      next: (response) => {
        this.postulaciones=response.postulaciones.data;
        this.currentPage=response.postulaciones.currentPage;
        this.totalPages=response.postulaciones.totalPages;
        this.loading=false;
      },
      error: (error)=>{
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
