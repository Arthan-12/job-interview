import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { map, mergeMap } from "rxjs/operators";
import { User } from "../models/user.model";


@Injectable({
    providedIn: 'root'
})
export class UserService {

    private readonly API_URL = 'http://localhost:3000/users';
    httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache'
        })
    }
    isLogged: boolean;

    constructor(
        private http: HttpClient,
        private router: Router) {}

    getAllUsers(): Observable<User[]> {
        return this.http.get<User[]>(this.API_URL);
    }

    createUserProfile(user: User): Observable<User> {
        return this.http.post<User>(this.API_URL, user, this.httpOptions);
    }

    modifyUserProfile(user: User) {
        return this.http.patch<User>(this.API_URL + `/${user.id}`, JSON.stringify(user), this.httpOptions);
    }

    userLogin(user: User) {
        let users = this.getAllUsers();
        users.pipe(
            mergeMap((users: User[]) => users),
            map((apiUser: User) => {
                if(user.email === apiUser.email && user.password === user.password) {
                    this.isLogged = true;
                    console.log('usuário autenticado!');
                    this.router.navigate(['home'])
                } else {
                    this.isLogged = false;
                    console.log('falha na autenticação!');
                }
            })
        ).subscribe();
    }

    userLogged() {
        if(this.isLogged == true) {
            console.log('usuário logado!', this.isLogged);
        } else {
            console.log('usuário deslogado', this.isLogged);
        }
    }
}