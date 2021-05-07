import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { EmailValidator, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { User } from 'src/app/core/models/user.model';
import { UserService } from 'src/app/core/services/user.service';
import { SnackbarComponent } from 'src/app/shared/components/snackbar/snackbar.component';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  @Output() isUserCreated = new EventEmitter<boolean>();

  signUpForm: FormGroup;
  submitted: boolean = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private snackBar: MatSnackBar
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
    this.userService.getAllUsers().subscribe(
      (users: User[]) => {
        for (let user of users) {
          if(newUser.email === user.email) {
            console.log('Email já cadastrado!');
            this.snackBar.openFromComponent(SnackbarComponent, {
              data: 'Essa conta de email já existe. Seus truques Jedi não funcionam',
              duration: 4000,
              panelClass: ['snackbar-delete']
            });
            return
        } else {
          this.userService.createUserProfile(newUser).subscribe();
          this.isUserCreated.emit();
          this.snackBar.openFromComponent(SnackbarComponent, {
            data: 'Usuário criado com sucesso!',
            duration: 4000,
            panelClass: ['snackbar-create']
          });
          return
          }
        }
      })    
    this.signUpForm.reset();
    this.submitted = false;
  }

}
