import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor 
{
  constructor(private authService: AuthService) {}

  
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Ignorer l'ajout du token pour les routes de connexion, d'inscription et les annonces publiques
    if (!request.url.includes("/auth/login") && !request.url.includes("/auth/register") && !request.url.includes("/api/ads/allAds")) {
      let newRequest = request.clone({
        headers : request.headers.set('Authorization', 'Bearer ' + this.authService.accesToken)
      });
      return next.handle(newRequest);
    } else {
      return next.handle(request);
    }
  }
}