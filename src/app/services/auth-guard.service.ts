import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate
{
  constructor(private auth: AuthService,
              private router: Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) 
  {
    const isSignedIn = this.auth.isLoggedIn();
    if (isSignedIn !== true)
    {
        this.router.navigate(['login']);
    }
    return isSignedIn;
  }
}
