import { Routes } from '@angular/router';
import { JobOfferComponent } from './job-offer/job-offer.component';
import { SeePostulationComponent } from './see-postulation/see-postulation.component';
// Importa otros componentes necesarios para las rutas

export const RECLUTADOR_ROUTES: Routes = [
  { path: 'job-offer', component: JobOfferComponent },
  { path: 'see-postulation', component: SeePostulationComponent}
  // Otras rutas para el módulo de reclutador
];
