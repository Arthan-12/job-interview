import { Injectable } from "@angular/core";
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { UserService } from "../services/user.service";

@Injectable({ providedIn: 'root'})
export class AuthGuard implements CanActivate{

    constructor(
        private userService: UserService,
        private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
        //console.log(this.userService.isLogged)
        
        if(!this.userService.canAuth()) {
            this.router.navigate(
                ['login']
                );
                return false
        }
        return true
    }
}