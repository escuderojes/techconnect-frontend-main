import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{

  email: string='';
  password: string='';
  errorMessage: string | null=null;
  successMessage:string|null=null;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {}

  onSubmit(): void{
    this.authService.login(this.email, this.password).subscribe({
      next: (response) => {
        this.errorMessage= null;
        this.successMessage= response.mensaje;
        this.authService.setToken(response.access_token);
        this.authService.setRole(response.role);
        this.authService.setEmailVerified(response.email_verified)

        console.log('User Role:', response.role);

        const userRole= response.role;
        if (userRole) {
          switch (userRole) {
            case 'estudiante':
              this.router.navigate(['estudiante/home.estudiante']);
              break;
            case 'reclutador':
              this.router.navigate(['reclutador/home.reclutador']);
              break;
            case 'administrador':
              this.router.navigate(['admin/dashboard']);
              break;
            default:
              console.error('Unexpected user role:', userRole);
              break;
          }
        } else {
          console.error('Unable to determine user role');
        }
      },
      error: (error: Error) => {
        console.log(this.errorMessage = error.message);
        this.errorMessage= 'El email o la contraseña no se encuentran registrados, revise sus credenciales o registrese según el rol que desee'
      }
    })
  }
}
