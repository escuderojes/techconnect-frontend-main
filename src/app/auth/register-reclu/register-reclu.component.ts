import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register-reclu',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './register-reclu.component.html',
  styleUrl: './register-reclu.component.css'
})
export class RegisterRecluComponent implements OnInit{

  name: string='';
  email: string='';
  password: string='';
  errorMessage:string | null=null;
  successMessage:string|null=null;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onSubmit(): void{
    this.authService.registroReclutador(this.name,this.email,this.password).subscribe({
      next: (response) => {
        this.errorMessage=null;
        this.successMessage= response.message;
        this.authService.setToken(response.access_token);
        this.authService.setRole(response.role);
        this.authService.setEmailVerified(response.email_verified);
        console.log('User Role:', response.role);
        this.router.navigate(['reclutador/home.reclutador']);
      },
        error: (error: Error)=>{
          console.log(this.errorMessage= error.message);
          this.errorMessage='Algo falló, revise los datos insertados';
        }
    });
  }
 }
