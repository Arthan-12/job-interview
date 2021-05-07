import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { mergeMap, map, delay } from 'rxjs/operators';
import { User } from 'src/app/core/models/user.model';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  signInForm: FormGroup;
  loginErrorMessage: string = '';
  isLogged: boolean = false;

  users$: Observable<User[]>;

  constructor(
    //public data: any,
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.signInForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login() {
    const model: User = this.signInForm.value as User;
    this.users$ = this.userService.getAllUsers();
    this.userService.getAllUsers().subscribe(
      (users: User[]) => {
        
        for (let user of users) {
          if(model.email === user.email && model.password === user.password) {
            this.isLogged = true;
            this.userService.isLogged = true;
            this.userService.currentUser = user
            this.router.navigate(['home']);
            return
        } else {
            this.isLogged = false;
            this.userService.isLogged = false;
          }
        }
        this.userAuth();
      }
    )
  }


  userAuth() {
    if(this.isLogged) {
      console.log('usuário autenticado!');
    } else {
      console.error('falha na autenticação!');
      this.loginErrorMessage = 'Login ou senha inválidos!';
    }
    this.userService.userLogged(this.isLogged);
  }
}
