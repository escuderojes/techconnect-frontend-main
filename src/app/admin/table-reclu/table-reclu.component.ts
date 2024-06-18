import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { AdminService } from '../../core/services/admin.service';

@Component({
  selector: 'app-table-reclu',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './table-reclu.component.html',
  styleUrl: './table-reclu.component.css'
})
export class TableRecluComponent implements OnInit{
  reclutadores: any={};
  constructor(
    private authService:AuthService,
    private adminService:AdminService,
    private router:Router
  ) { }
  ngOnInit(): void {
    this.cargarReclutadores();
  }

  cargarReclutadores():void{
    this.adminService.obtenerReclutadores(this.reclutadores).subscribe({
      next: (response) => {
        if(response.status=== 200){
          this.reclutadores = response.reclutadores;
        }else{
          console.error('Error al obtener los reclutadores', response.mensaje);
        }
      },
      error: (error)=>{
        console.error('Error en la peticion', error);
      },
      complete: ()=>{
        console.log('Peticion completada');
      }
    })
  }

  onLogout(event: MouseEvent): void {
    event.preventDefault();
    this.authService.logout().subscribe({
      next: () => {
        // Limpia el token del localStorage
        this.authService.removeToken();
        this.authService.removeRole();
        
        // Redirige al usuario a la página de inicio de sesión
        this.router.navigate(['/home']);
      },
      error: (err) => {
        console.error('Logout failed:', err);
      }
    });
  }
}
