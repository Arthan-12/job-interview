import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { UserService } from "../services/user.service";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

    constructor(
        private router: Router,
        private userService: UserService
    ) {}

    goHome() {
        this.router.navigate(['home']);
    }

    logout() {
        this.userService.isLogged = false;
        this.router.navigate(['login']);
    }

}