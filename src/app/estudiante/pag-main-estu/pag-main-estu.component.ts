import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-pag-main-estu',
  standalone: true,
  imports: [RouterLink] ,
  templateUrl: './pag-main-estu.component.html',
  styleUrl: './pag-main-estu.component.css'
})
export class PagMainEstuComponent implements OnInit {
  constructor(private authService:AuthService, private router:Router){}
  
  ngOnInit(): void { }

  onLogout(): void {
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
        // Opcional: manejar el error de logout, por ejemplo mostrando un mensaje al usuario
      }
    });
  }

}
