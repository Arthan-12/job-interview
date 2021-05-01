import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  signInForm: FormGroup;

  constructor(
    //public data: any,
    public fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.signInForm = this.fb.group({
      email: '',
      password: ''
    });
  }

  login() {
    console.log(this.signInForm.value);
    this.router.navigate(['home']);
  }
}
