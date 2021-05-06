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
    currentUser: User;

    constructor(
        private http: HttpClient,
        private router: Router) {}

    getAllUsers(): Observable<User[]> {
        return this.http.get<User[]>(this.API_URL);
    }

    getUserById(user: User): Observable<User> {
        return this.http.get<User>(this.API_URL+ `/${user.id}`);
    }

    createUserProfile(user: User): Observable<User> {
        return this.http.post<User>(this.API_URL, user, this.httpOptions);
    }

    modifyUserProfile(user: User): Observable<User> {
        return this.http.patch<User>(this.API_URL + `/${user.id}`, JSON.stringify(user), this.httpOptions);
    }

    getCurrentUser() {
        console.log(this.currentUser);
    }

    userLogged() {
        if(this.isLogged == true) {
            console.log('usuário logado!', this.isLogged);
        } else {
            console.log('usuário deslogado', this.isLogged);
        }
    }
}