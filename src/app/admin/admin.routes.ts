import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TableRecluComponent } from './table-reclu/table-reclu.component';
import { TableEstuComponent } from './table-estu/table-estu.component';


export const ADMIN_ROUTES: Routes = [
    { path: 'dashboard', component: DashboardComponent },
    { path: 'table/reclu', component: TableRecluComponent },
    { path: 'table/estu', component: TableEstuComponent },
];
