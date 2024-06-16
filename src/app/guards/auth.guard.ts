import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../core/services/auth.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})


export class AuthGuard {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot
  )
    
  : boolean { 
    // Check if the user is authenticated
      const isAuthenticated = this.authService.isAuthenticated();

      if (!isAuthenticated) {
        // Redirect to login if not authenticated
        this.router.navigate(['/login']);
        return false;
      }
      return true;
    }
}
