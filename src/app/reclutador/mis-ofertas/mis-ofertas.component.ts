import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ReclutadorService } from '../../core/services/reclutador.service';

@Component({
  selector: 'app-mis-ofertas',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './mis-ofertas.component.html',
  styleUrl: './mis-ofertas.component.css'
})
export class MisOfertasComponent implements OnInit{
  
  ofertas: any[]= [];
  currentPage: number =1;
  totalPages: number =1;
  errorMessage: string|null=null;
  successMessage: string | null = null;
  constructor(
    private reclutadorService:ReclutadorService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.cargarOfertasDelReclutador(this.currentPage);
  }

  loading:boolean=false;
  cargarOfertasDelReclutador(page:number):void{
    this.loading=true;
    this.reclutadorService.obtenerOfertasPorReclutador(page).subscribe({
      next:(response)=>{
        this.ofertas=response.ofertas.data;
        this.currentPage=response.ofertas.currentPage;
        this.totalPages=response.ofertas.totalPages;
        this.loading=false;
      },
      error:(error)=>{
        this.errorMessage=error.message || 'Error al cargar los datos de las ofertas';
        this.loading=false;
      }
    });
  }

  cambiarPagina(page:number): void{
    if(page > 0 && page<= this.totalPages){
      this.cargarOfertasDelReclutador(page);
    }
  }

}
