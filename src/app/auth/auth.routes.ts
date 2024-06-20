import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterEstuComponent } from './register-estu/register-estu.component';
import { RegisterRecluComponent } from './register-reclu/register-reclu.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

export const AUTH_ROUTES: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register/estu', component: RegisterEstuComponent },
    { path: 'register/reclu', component: RegisterRecluComponent },
    { path: 'reset-password', component: ResetPasswordComponent }
];
