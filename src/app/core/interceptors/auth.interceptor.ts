import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';


export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  //Obtener el token de autenticación del servicio 
  const authToken = authService.getToken();

  // Clonar la solicitud para añadir el token en los headers, si existe
  let authReq = req;
  if (authToken) {
    authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${authToken}`
      }
    });
  }
  // Manejar la solicitud clonada
  return next(authReq).pipe(
    catchError((error) => {
      if (error.status === 401) {
        // Si el token es inválido o no autorizado, redirigir al login
        router.navigate(['/login']);
      }
      return throwError(() => new Error(error.message || 'Error desconocido'));
    })
  );
};
