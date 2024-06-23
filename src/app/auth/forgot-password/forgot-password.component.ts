import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent implements OnInit{
  requestForm: FormGroup;
  errorMessage: string | null=null;
  successMessage:string|null=null;
  constructor(
    private fb:FormBuilder,
    private authService: AuthService
  ) {
    this.requestForm= this.fb.group({
      email:['',[Validators.required, Validators.email]]
    });
  }
  ngOnInit(): void {}

  onSubmit():void{
    if(this.requestForm.valid){
      this.authService.forgotPassword(this.requestForm.value).subscribe({
        next:(response)=>{
          console.log(this.successMessage= response.message);
          this.successMessage='Se ah enviado un correo con la instrucciones para restablecer su contraseña';
        },
        error: (error)=>{
          console.log(this.errorMessage=error.message);
          this.errorMessage= 'Ha ocurrido un error al enviar la solicitud. Por favor, inténtalo de nuevo.';
        }
      });
    } 
  }
}
