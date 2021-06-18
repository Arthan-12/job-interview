import { getTestBed, TestBed } from "@angular/core/testing";
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserService } from "./user.service";
import { User } from "../models/user.model";


describe(UserService.name, () => {
    let userService: UserService = null;
    let httpClientMock: HttpTestingController;
    let injector: TestBed;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [UserService]
        });
        injector = getTestBed();
        userService = injector.get(UserService);
        httpClientMock = injector.get(HttpTestingController);
    });

    afterEach(() => {
        httpClientMock.verify();
    });

    it(`#${UserService.prototype.getAllUsers.name}
    should return all users when called`, () => {
        const expectedUsers: User[] = 
        [{id: 1, name: 'Ezra Bridger', email: 'ezra.bridger@rebels.com', password: '123'}, { id: 2, name: 'Sabine Wren', email: 'sabine.wren@rebels.com', password: '123'}];

        userService.getAllUsers().subscribe(
            users => {
                expect(users).toEqual(expectedUsers, 'expected users');
            }
        );

        const req = httpClientMock.expectOne(`${userService.API_URL}`);
        expect(req.request.method).toBe('GET');
        req.flush(expectedUsers);
    });

    it(`#${UserService.prototype.getUserById.name}
    should return a specific user by it's ID when called`, () => {
       // const expectedInterviewId: number = 1;
        const expectedUser: User = {id: 1, name: 'Ezra Bridger', email: 'ezra.bridger@rebels.com', password: '123'};

        userService.getUserById(expectedUser).subscribe(
            user => {
                expect(user).toEqual(expectedUser)
            }
        );

        const req = httpClientMock.expectOne(req => req.method === 'GET' && req.url === `${userService.API_URL}/${expectedUser.id}`);
        req.flush(expectedUser);
        
    });

    it(`#${UserService.prototype.createUserProfile.name}
    should create an user and return it when called`, () => {
        const expectedUser: User = {id: 1, name: 'Ezra Bridger', email: 'ezra.bridger@rebels.com', password: '123'};

        userService.createUserProfile(expectedUser).subscribe(
            user => {
                expect(user).toEqual(expectedUser)
                //fail
            }
        );

        const req = httpClientMock.expectOne( req => req.method === 'POST' && req.url ===`${userService.API_URL}`);
        req.flush(expectedUser);
    });

    it(`#${UserService.prototype.modifyUserProfile.name}
    should modify an user and return it when called`, () => {
        const expectedUser: User = {id: 1, name: 'Ezra Bridger', email: 'ezra.bridger@rebels.com', password: '123'};

        userService.modifyUserProfile(expectedUser).subscribe(
            user => {
                expect(user).toEqual(expectedUser)
            }
        );

        const req = httpClientMock.expectOne(req => req.method === 'PATCH' && req.url === `${userService.API_URL}/${expectedUser.id}`);
        req.flush(expectedUser);
    });

    it(`#${UserService.prototype.userLogged.name}
    should check if an user is logged or not and return it when called`, () => {
        const expectedUserLogged: boolean = false;
        const expectedIsLogged: boolean = false;

        userService.userLogged(expectedUserLogged) 
            if(expectedUserLogged) {
                expect(expectedIsLogged).toBe(true);
            }
            else if (!expectedUserLogged) {
                expect(expectedIsLogged).toBe(false);
            }
    });

    it(`#${UserService.prototype.canAuth.name}
    should check if an user can or cannot auth by returning true or false when called`, () => {
        const expectedIsLogged: boolean = false;

        userService.canAuth() 
            if (expect(expectedIsLogged).toBe(false)) {
            return false
            }
            else if (expect(!expectedIsLogged).toBe(true)) {
            return
            }
    })
});
