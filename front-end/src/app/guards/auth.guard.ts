import {Injectable} from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import {Observable} from 'rxjs';
import {TokenStorageService} from "../services/token-storage.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  /************************************************************************************************/
  /*                                         Constructor                                          */
  /************************************************************************************************/
  constructor(
    private router: Router,
    private service: TokenStorageService
  ) {
  }

  /************************************************************************************************/
  /*                                          Functions                                           */
  /************************************************************************************************/
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // if user is  logged , continue
    if (this.service.isLogged()) {
      return true;
    }
    // otherwise, block user and return to home
    else {
      this.router.navigateByUrl('');
      return false;
    }
  }
}

