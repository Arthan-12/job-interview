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

    public readonly API_URL = 'http://localhost:3000/users';
    httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache'
        })
    }
    isLogged: boolean;
    currentUser: User;

    constructor(
        private http: HttpClient) {}

    getAllUsers(): Observable<User[]> {
        return this.http.get<User[]>(this.API_URL);
    }

    getUserById(user: User): Observable<User> {
        return this.http.get<User>(this.API_URL+ `/${user.id}`);
    }

    createUserProfile(user: User): Observable<User> {
        return this.http.post<User>(this.API_URL, JSON.stringify(user), this.httpOptions);
    }

    modifyUserProfile(user: User): Observable<User> {
        return this.http.patch<User>(this.API_URL + `/${user.id}`, JSON.stringify(user), this.httpOptions);
    }

    userLogged(isUserLogged: boolean): boolean {
        
        if(isUserLogged) {
            console.log('usuário logado!', this.isLogged);
            return this.isLogged = true
        } else {
            console.log('usuário deslogado', this.isLogged);
            return this.isLogged = false
        }
    }

    canAuth() {
        if(this.isLogged)
        return true
        else
        return false
    }
}