import { Routes } from '@angular/router';
import { PagMainEstuComponent } from './pag-main-estu/pag-main-estu.component';
import { ProfileEstuComponent } from './profile-estu/profile-estu.component';
import { ActuDataEstuComponent } from './actu-data-estu/actu-data-estu.component';
import { InserSkillEstuComponent } from './inser-skill-estu/inser-skill-estu.component';
import { AuthGuard } from '../guards/auth.guard';
import { EstudianteGuard } from '../guards/estudiante-guard.guard';

export const ESTUDIANTE_ROUTES: Routes = [
    { path: 'home.estudiante', component: PagMainEstuComponent, canActivate: [AuthGuard,EstudianteGuard] },
    { path: 'profile-estu', component: ProfileEstuComponent, canActivate: [AuthGuard,EstudianteGuard] },
    { path: 'actu-data-estu', component: ActuDataEstuComponent, canActivate: [AuthGuard,EstudianteGuard]},
    { path: 'inser-skill-estu', component: InserSkillEstuComponent, canActivate: [AuthGuard,EstudianteGuard]}
];