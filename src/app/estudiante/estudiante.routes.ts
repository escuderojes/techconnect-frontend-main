import { Routes } from '@angular/router';
import { PagMainEstuComponent } from './pag-main-estu/pag-main-estu.component';
import { ProfileEstuComponent } from './profile-estu/profile-estu.component';
import { InserDataEstuComponent } from './inser-data-estu/inser-data-estu.component';
import { InserSkillEstuComponent } from './inser-skill-estu/inser-skill-estu.component';
import { AuthGuard } from '../guards/auth.guard';
import { EstudianteGuard } from '../guards/estudiante-guard.guard';
import { ActuDataEstuComponent } from './actu-data-estu/actu-data-estu.component';
import { MisPostulacionesComponent } from './mis-postulaciones/mis-postulaciones.component';

export const ESTUDIANTE_ROUTES: Routes = [
    { path: 'home.estudiante', component: PagMainEstuComponent, canActivate: [AuthGuard,EstudianteGuard] },
    { path: 'profile/:id', component: ProfileEstuComponent, canActivate: [AuthGuard,EstudianteGuard] },
    { path: 'inser-data', component: InserDataEstuComponent, canActivate: [AuthGuard,EstudianteGuard]},
    { path: 'actu-data/:estudianteId', component: ActuDataEstuComponent, canActivate: [AuthGuard,EstudianteGuard] },
    { path: 'inser-skill/:estudianteId', component: InserSkillEstuComponent, canActivate: [AuthGuard,EstudianteGuard]},
    { path: 'mis-postulaciones/:estudianteId', component: MisPostulacionesComponent, canActivate: [AuthGuard,EstudianteGuard] }
];