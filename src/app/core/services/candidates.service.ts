import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { Candidate } from "src/app/core/models/candidate.model";


@Injectable({
    providedIn: 'root'
})
export class CandidateService {

    public readonly API_URL = 'http://localhost:3000/candidates'
    private httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json; charset=utf-8'
        })
    }
    
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

    editCandidateScore(id: number, candidateScore: number): Observable<Candidate> {
        return this.http.put<Candidate>(this.API_URL + '/' + id, JSON.stringify(candidateScore), this.httpOptions);
    }

    deleteCandidate(id: number): Observable<Candidate> {
        return this.http.delete<Candidate>(this.API_URL + '/' + id, this.httpOptions);
    }
}