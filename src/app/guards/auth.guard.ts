import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { LoginService } from "@services";
import { map, Observable, take } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private loginService: LoginService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
      return this.loginService.loginStatus$.pipe(
        map(isLogged => {
          if(!isLogged) {
            this.router.navigate(['/login'])
          }
          return isLogged;
        })
      );
  }
}