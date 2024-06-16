import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterEstuComponent } from './auth/register-estu/register-estu.component';
import { RegisterRecluComponent } from './auth/register-reclu/register-reclu.component';
import { PresentationComponent } from './home/presentation/presentation.component';
import { PagMainEstuComponent } from './estudiante/pag-main-estu/pag-main-estu.component';
import { PageMainRecluComponent } from './reclutador/page-main-reclu/page-main-reclu.component';
import { ProfileEstuComponent } from './estudiante/profile-estu/profile-estu.component';
import { ActuDataEstuComponent } from './estudiante/actu-data-estu/actu-data-estu.component';
import { InserSkillEstuComponent } from './estudiante/inser-skill-estu/inser-skill-estu.component';
import { InserDataEstuComponent } from './estudiante/inser-data-estu/inser-data-estu.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoginComponent, RegisterEstuComponent, RegisterRecluComponent, PresentationComponent, PagMainEstuComponent, PageMainRecluComponent, ProfileEstuComponent, ActuDataEstuComponent, InserSkillEstuComponent, InserDataEstuComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'techconnect-fronted-main';
}
