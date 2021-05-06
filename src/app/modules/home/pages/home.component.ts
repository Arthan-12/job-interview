import { Component, OnInit } from "@angular/core";

import { User } from "src/app/core/models/user.model";
import { UserService } from "src/app/core/services/user.service";

@Component({
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent {

    user: string = this.userService.currentUser.name
    isInterviewStarted = false;
 

    constructor( private userService: UserService
    ) {}

    startInterview() {
        this.isInterviewStarted = true
    }

}