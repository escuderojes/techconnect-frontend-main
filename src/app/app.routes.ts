import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: '',
        loadChildren: () => import('./auth/auth.routes').then(m => m.AUTH_ROUTES)
    },
    {
        path: 'home',
        loadChildren: () => import('./home/home.routes').then(m => m.HOME_ROUTES)
    },
    {
        path: 'reclutador',
        loadChildren: () => import('./reclutador/reclutador.routes').then(m => m.RECLUTADOR_ROUTES)
    },
    {
        path: 'portafolio_reclu',
        loadChildren: () => import('./portafolio_reclu/porta.routes').then(m => m.PORTAFOLIO_RECLU_ROUTES)
    },
    {
        path: 'admin',
        loadChildren: () => import('./admin/admin.routes').then(m => m.ADMIN_ROUTES)
    }
];
