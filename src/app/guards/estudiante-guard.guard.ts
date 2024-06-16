import { Injectable } from '@angular/core';
import { CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../core/services/auth.service';


@Injectable({
  providedIn: 'root'
})
export class EstudianteGuard{
  constructor(private authService: AuthService, private router: Router) {}
  canActivate 
  (route: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot
  ): boolean {
    const isAuthenticated = this.authService.isAuthenticated();
    const hasStudentRole = this.authService.getRole('estudiante');

    if (!isAuthenticated || !hasStudentRole) {
      this.router.navigate(['/unauthorized']);
      return false;
    }
    return true;
    }
}
