import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterEstuComponent } from './auth/register-estu/register-estu.component';
import { RegisterRecluComponent } from './auth/register-reclu/register-reclu.component';
import { PresentationComponent } from './home/presentation/presentation.component';
import { PagMainEstuComponent } from './estudiante/pag-main-estu/pag-main-estu.component';
import { ProfileEstuComponent } from './estudiante/profile-estu/profile-estu.component';
import { InserSkillEstuComponent } from './estudiante/inser-skill-estu/inser-skill-estu.component';
import { InserDataEstuComponent } from './estudiante/inser-data-estu/inser-data-estu.component';
import { JobOfferComponent } from './reclutador/job-offer/job-offer.component';
import { PageMainRecluComponent } from './reclutador/page-main-reclu/page-main-reclu.component';
import { ActuDataRecluComponent } from './reclutador/actu-data-reclu/actu-data-reclu.component';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
import { SeePostulationComponent } from './reclutador/see-postulation/see-postulation.component';
import { MisOfertasComponent } from './reclutador/mis-ofertas/mis-ofertas.component';
import { MisPostulacionesComponent } from './estudiante/mis-postulaciones/mis-postulaciones.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoginComponent, RegisterEstuComponent, RegisterRecluComponent, PresentationComponent, PagMainEstuComponent, PageMainRecluComponent, ProfileEstuComponent, InserSkillEstuComponent, InserDataEstuComponent, JobOfferComponent, ActuDataRecluComponent, ResetPasswordComponent, SeePostulationComponent, MisOfertasComponent, MisPostulacionesComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'techconnect-fronted-main';
  constructor(router: Router){
    
  }
}
