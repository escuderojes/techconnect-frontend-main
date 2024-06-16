import { Routes } from '@angular/router';
import { ProfileRecluComponent } from './profile-reclu/profile-reclu.component';
import { PageMainRecluComponent } from './page-main-reclu/page-main-reclu.component';
import { RegDataRecluComponent } from './reg-data-reclu/reg-data-reclu.component';
import { ReclutadorGuard } from '../guards/reclutador-guard.guard';
import { AuthGuard } from '../guards/auth.guard';

export const RECLUTADOR_ROUTES: Routes = [
    { path: 'home.reclutador', component: PageMainRecluComponent,  canActivate: [AuthGuard,ReclutadorGuard]},
    { path: 'profile', component: ProfileRecluComponent, canActivate: [AuthGuard,ReclutadorGuard] },
    { path: 'register/data', component: RegDataRecluComponent,  canActivate: [AuthGuard,ReclutadorGuard] },
];
