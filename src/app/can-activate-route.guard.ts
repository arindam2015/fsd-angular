import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { RouterService } from './services/router.service';
import { AuthenticationService } from './services/authentication.service';

@Injectable()
export class CanActivateRouteGuard implements CanActivate {

  constructor(
    private routerservice:RouterService,
    private authservice:AuthenticationService,
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      const bearertoken=localStorage.getItem('bearerToken');   

    if(bearertoken !=null)
    {
      const authStatus = this.authservice.isUserAuthenticated(bearertoken).then(
        (data)=>{
          return data;
      },
      (err)=>{
        console.log(err);
      });
        if(authStatus)
        {
          return true;
        }
      }
      else
      {
        this.routerservice.routeToLogin();
        return false;
      }
  }
  }

