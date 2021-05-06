import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { mergeMap, map } from 'rxjs/operators';
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
    public fb: FormBuilder,
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
    this.users$ = this.userService.getAllUsers().pipe();
    this.users$.pipe(
            mergeMap((users: User[]) => users),
            map((apiUser: User) => {
                if(model.email === apiUser.email && model.password === apiUser.password) {
                    this.isLogged = true;
                    this.userService.isLogged = true;
                    this.userService.currentUser = apiUser
                    this.router.navigate(['home']);
                } else {
                    this.isLogged = false;
                    this.userService.isLogged = false;
                }
            })
        ).subscribe();
    this.isUserLogged();
  }

  isUserLogged() {
    if(this.isLogged) {
      console.log('usuário autenticado!');
    } else {
      console.error('falha na autenticação!');
      this.loginErrorMessage = 'Login ou senha inválidos!';
    }
  }


}
