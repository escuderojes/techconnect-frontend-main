import { Routes } from '@angular/router';
import { ProfileRecluComponent } from './profile-reclu/profile-reclu.component';
import { PageMainRecluComponent } from './page-main-reclu/page-main-reclu.component';
import { RegDataRecluComponent } from './reg-data-reclu/reg-data-reclu.component';
import { ActuDataRecluComponent } from './actu-data-reclu/actu-data-reclu.component';

export const RECLUTADOR_ROUTES: Routes = [
    { path: 'page/main/reclu', component: PageMainRecluComponent },
    { path: 'profile/reclu', component: ProfileRecluComponent },
    { path: 'register/data/reclu', component: RegDataRecluComponent },
    { path: 'update/data/reclu', component: ActuDataRecluComponent },
];
