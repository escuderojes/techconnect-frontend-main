import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterEstuComponent } from './auth/register-estu/register-estu.component';
import { RegisterRecluComponent } from './auth/register-reclu/register-reclu.component';
import { PresentationComponent } from './home/presentation/presentation.component';
import { PageMainRecluComponent } from './reclutador/page-main-reclu/page-main-reclu.component';
import { ProfileRecluComponent } from './reclutador/profile-reclu/profile-reclu.component';
import { RegDataRecluComponent } from './reclutador/reg-data-reclu/reg-data-reclu.component';
import { ActuDataRecluComponent } from './reclutador/actu-data-reclu/actu-data-reclu.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoginComponent, RegisterEstuComponent,
    RegisterRecluComponent, PresentationComponent, PageMainRecluComponent, ProfileRecluComponent, RegDataRecluComponent, ActuDataRecluComponent,],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'techconnect-fronted-main';
}
