import { Component, OnInit } from "@angular/core";

import { UserService } from "src/app/core/services/user.service";

@Component({
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{

    user: string; 
    isInterviewStarted = false;
 

    constructor( private userService: UserService
    ) {}

    ngOnInit(): void {
            this.user = this.userService.currentUser.name;
    }

    startInterview() {
        this.isInterviewStarted = true
    }

}