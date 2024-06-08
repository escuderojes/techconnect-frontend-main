import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterEstuComponent } from './auth/register-estu/register-estu.component';
import { RegisterRecluComponent } from './auth/register-reclu/register-reclu.component';
import { PresentationComponent } from './home/presentation/presentation.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoginComponent, RegisterEstuComponent, RegisterRecluComponent, PresentationComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'techconnect-fronted-main';
}
