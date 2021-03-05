import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { Candidate } from "src/app/core/models/candidate.model";


@Injectable({
    providedIn: 'root'
})
export class CandidateService {

    private readonly API_URL = 'http://localhost:3000/candidates'
    candidates: Array<Candidate> = [];
    
    constructor(private http: HttpClient) {
    }

    getAllCandidates(): Observable<Candidate[]> {
        return this.http.get<Candidate[]>(this.API_URL)
    }

    createCandidate(candidate: Candidate) {
    }

    editCandidate(candidate: Candidate) {
    }

    deleteCandidate(id: number) {
    }

    

}