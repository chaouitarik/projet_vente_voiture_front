import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    // Vérifier si la route nécessite une authentification
    const requiresAuth = route.data['requiresAuth'] !== false;

    // Si la route nécessite une authentification
    if (requiresAuth && !this.authService.isAuthenticated) {
      // Rediriger vers la page de connexion si l'utilisateur n'est pas authentifié
      this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
      return false;
    }

    // Si l'authentification n'est pas nécessaire ou si l'utilisateur est authentifié, autoriser l'accès
    return true;
  }
}