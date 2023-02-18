import { Injectable } from '@angular/core';
import{ Router } from '@angular/router'
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { TokenStorageService } from '../services/token-storage.service';
@Injectable({
  providedIn: 'root',

})
export class TokenHttpInterceptor implements HttpInterceptor {
  constructor(
    private service: TokenStorageService,
    private router: Router
  ) {}
  // C'est dans la fonction intercept qu'on implémente la logique
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // On récupère le token depuis le TokenStorageService
    const token = this.service.getToken();
    // s'il n'est pas initialisé, on envoie la requête telle qu'elle est
    if (!token) { 
      return next.handle(request);
    }
    // Si non, on va injecter le token dedans :
    const updatedRequest = request.clone({
      headers: request.headers.set('Authorization', `Bearer ${token}`),
    });
    // et envoyer la requête avec le token
    return next.handle(updatedRequest).pipe(
      tap(
        (event) => {},
        (error) => {
            if(error instanceof HttpErrorResponse){
                if (error.status === 401){
                    //Redirection pour que l'utilisateur se reconnecte
                    
                    this.router.navigateByUrl('/login');
                }
            }
        }
      )
    );
  }
}
