import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  signUpClicked: boolean = false;
  //isUserCreated: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  goToSignUp(isUserCreated) {
    if(!this.signUpClicked || isUserCreated) {
      this.signUpClicked = true;
    } else if(this.signUpClicked ) {
      this.signUpClicked = false
    }
  }

}
