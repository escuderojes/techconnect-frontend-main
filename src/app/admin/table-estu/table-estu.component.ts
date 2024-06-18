import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { AdminService } from '../../core/services/admin.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-table-estu',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './table-estu.component.html',
  styleUrl: './table-estu.component.css'
})
export class TableEstuComponent implements OnInit{
  estudiantes: any = {};
  constructor(
    private authService:AuthService,
    private adminService:AdminService,
    private router:Router
  ) { }
  ngOnInit(): void {
    this.cargarEstudiantes();
  }

  cargarEstudiantes(): void {
    this.adminService.obtenerEstudiantes(this.estudiantes).subscribe({
      next: (response) => {
        if (response.status === 200) {
          this.estudiantes = response.estudiantes;
        } else {
          console.error('Error al obtener los estudiantes:', response.mensaje);
        }
      },
      error: (error) => {
        console.error('Error en la petición:', error);
      },
      complete: () => {
        console.log('Petición completada');
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

