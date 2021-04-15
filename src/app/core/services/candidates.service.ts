import { HttpClient, HttpHeaders } from "@angular/common/http";
import { identifierModuleUrl } from "@angular/compiler";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { Candidate } from "src/app/core/models/candidate.model";


@Injectable({
    providedIn: 'root'
})
export class CandidateService {

    private readonly API_URL = 'http://localhost:3000/candidates'
    private httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json; charset=utf-8'
        })
    }
    
    candidates: Array<Candidate> = [];
    
    constructor(private http: HttpClient) {
    }

    findById(candidateId: number) {
        return this.http.get<Candidate>(this.API_URL + '/' + candidateId)
    }

    getAllCandidates(): Observable<Candidate[]> {
        return this.http.get<Candidate[]>(this.API_URL);
    }

    getCandidate(): Observable<Candidate> {
        return this.http.get<Candidate>(this.API_URL);
    }

    createCandidate(candidate: Candidate): Observable<Candidate> {
        return this.http.post<Candidate>(this.API_URL, JSON.stringify(candidate), this.httpOptions);
    }

    editCandidate(id: number, candidate: Candidate): Observable<Candidate> {
        return this.http.put<Candidate>(this.API_URL + '/' + id, JSON.stringify(candidate), this.httpOptions);
    }

    editAllCandidates(ids: number[]): Observable<Candidate[]> {
        return this.http.put<Candidate[]>(this.API_URL + '/' + ids, this.httpOptions);
    }

    deleteCandidate(id: number): Observable<Candidate> {
        return this.http.delete<Candidate>(this.API_URL + '/' + id, this.httpOptions).pipe(
            catchError(this.errorHandler)
            )
        }
        errorHandler(error) {
           let errorMessage = '';
           if(error.error instanceof ErrorEvent) {
             // Get client-side error
             errorMessage = error.error.message;
           } else {
             // Get server-side error
             errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
           }
           console.log(errorMessage);
           return throwError(errorMessage);
    }
}