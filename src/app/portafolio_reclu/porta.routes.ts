import { Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { HBdComponent } from './h-bd/h-bd.component';
import { HProComponent } from './h-pro/h-pro.component';


export const PORTAFOLIO_RECLU_ROUTES: Routes = [
    { path: 'about', component: AboutComponent },
    { path: 'contact', component: ContactComponent },
    { path: 'hab/bd', component: HBdComponent },
    { path: 'hab/pro', component: HProComponent },
];
