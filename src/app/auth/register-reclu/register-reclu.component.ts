import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-register-reclu',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './register-reclu.component.html',
  styleUrl: './register-reclu.component.css'
})
export class RegisterRecluComponent {

  name: string='';
  email: string='';
  password: string='';
  errorMessage:string | null=null;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit(): void{
    const registroData= {
      name:this.name,
      email:this.email,
      password:this.password
    };

    this.authService.registroReclutador(registroData).subscribe({
      next: (response) => {
        this.errorMessage=null;
        this.authService.setToken(response.access_token);
        alert('Registro exitoso. Por favor, verifica tu correo electrónico.')
        this.router.navigate(['/home.reclutador']);
        },
        error: (error)=>{
          this.errorMessage=error.error.message;
        }
    });
    }
 }
