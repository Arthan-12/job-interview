import { Component } from "@angular/core";

@Component({
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent {
    user ='Victor';
    isInterviewStarted = false;

    constructor(
    ) {}

    startInterview() {
        this.isInterviewStarted = true
    }
}