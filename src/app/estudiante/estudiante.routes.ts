import { Routes } from '@angular/router';
import { PagMainEstuComponent } from './pag-main-estu/pag-main-estu.component';
import { ProfileEstuComponent } from './profile-estu/profile-estu.component';
import { ActuDataEstuComponent } from './actu-data-estu/actu-data-estu.component';
import { InserSkillEstuComponent } from './inser-skill-estu/inser-skill-estu.component';

export const ESTUDIANTE_ROUTES: Routes = [
    { path: 'pag-main-estu', component: PagMainEstuComponent },
    { path: 'profile-estu', component: ProfileEstuComponent },
    { path: 'actu-data-estu', component: ActuDataEstuComponent},
    { path: 'inser-skill-estu', component: InserSkillEstuComponent}
];