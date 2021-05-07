import { Component, OnInit } from '@angular/core';
import { EmailValidator, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/core/models/user.model';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  signUpForm: FormGroup;
  submitted: boolean = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.signUpForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required,
                  Validators.email,
                  Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  createUser() {
    this.submitted = true;
    if(this.signUpForm.invalid) {
      return
    }
    const newUser = {
      name: this.signUpForm.get('name').value,
      email: this.signUpForm.get('email').value,
      password: this.signUpForm.get('password').value,
      profilePicure: null
    }
    console.log(newUser);
    this.userService.getAllUsers().subscribe(
      (users: User[]) => {
        for (let user of users) {
          if(newUser.email === user.email) {
            console.log('Email já cadastrado!');
            return
        } else {
          console.log('Conta disponível!');
          this.userService.createUserProfile(newUser).subscribe()
          return
          }
        }
      })    
    this.signUpForm.reset();
    this.submitted = false;
  }

}
