import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../core/services/auth.service';


@Injectable({
  providedIn: 'root'
})

export class ReclutadorGuard {
  constructor(private authService: AuthService, private router: Router) {}
  canActivate 
  (route: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot
  ): boolean {
    const isAuthenticated = this.authService.isAuthenticated();
    const hasStudentRole = this.authService.getRole('reclutador');

    if (!isAuthenticated || !hasStudentRole) {
      this.router.navigate(['/unauthorized']);
      return false;
    }
    return true;
    }
}
