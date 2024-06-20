import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent implements OnInit{
  resetForm: FormGroup;
  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(
    private authService:AuthService,
    private route:Router,
    private fb: FormBuilder
  ) {
    this.resetForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      password_confirmation: ['', Validators.required],
      token: ['', Validators.required]
    });
   }

  ngOnInit(): void {

  }

  onSubmit():void{
    if (this.resetForm.valid) {
      this.authService.resetPassword(this.resetForm.value)
        .subscribe({
          next: (response) => {
            this.successMessage = response.mensaje;
            this.errorMessage = null;
            this.resetForm.reset();
          },
          error: (error: Error)=>{
            this.errorMessage = error.message || 'Error al restablecer la contraseña';
            this.successMessage = null;
          }
        });
  }
  }

}
