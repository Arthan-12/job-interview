import { HttpClient, HttpHeaders } from "@angular/common/http";
import { identifierModuleUrl } from "@angular/compiler";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { Candidate } from "src/app/core/models/candidate.model";


@Injectable({
    providedIn: 'root'
})
export class CandidateService {

    private readonly API_URL = 'http://localhost:3000/candidates'
    httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
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

    editCandidate(id, candidate): Observable<Candidate> {
        return this.http.put<Candidate>(this.API_URL + '/' + id, JSON.stringify(candidate), this.httpOptions);
    }

    deleteCandidate(id: number) {
        return this.http.delete<Candidate>(this.API_URL + '/' + id, this.httpOptions);
    }

    

}