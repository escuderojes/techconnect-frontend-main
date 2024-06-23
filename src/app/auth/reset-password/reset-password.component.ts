import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent implements OnInit{
  password:string='';
  password_confirmation: string = '';
  errorMessage: string | null = null;
  successMessage: string | null = null;
  token:string;
  email: string | null = null;

  constructor(
    private authService:AuthService,
    private route:ActivatedRoute,
    private router:Router
  ) {
    this.token= this.route.snapshot.paramMap.get('token') || '';
    // Obtiene el correo electrónico de los parámetros de la consulta
    this.email = this.route.snapshot.queryParamMap.get('email');
   }

  ngOnInit(): void {}

  onSubmit():void{
    if (this.password && this.password === this.password_confirmation) {
      const resetData = {
        password: this.password,
        password_confirmation: this.password_confirmation,
        token: this.token,
        email:this.email
      };

      this.authService.resetPassword(resetData).subscribe({
          next: (response) => {
            console.log(this.successMessage = response.mensaje);
            this.successMessage= 'Tu contraseña ha sido restablecida con exito'
            this.errorMessage = null;
            // Redirigir al usuario después de un tiempo
            setTimeout(() => {
              this.successMessage = null;
              // Redirigir al login o a otra página después de un tiempo
              this.router.navigate(['/login']);
            }, 3000);
          },
          error: (error: Error)=>{
            this.errorMessage = error.message || 'Error al restablecer la contraseña';
            this.successMessage = null;
          }
        });
    }else{
      this.errorMessage = 'Las contraseñas no coinciden';
      this.successMessage = null;
    }
  }
  passwordsMatch(): boolean {
    return this.password === this.password_confirmation;
  }

}
