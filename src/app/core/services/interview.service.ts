import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Interview } from "../models/interview.model";


@Injectable({
    providedIn: 'root'
})
export class InterviewService {

    private readonly API_URL = 'http://localhost:3000/interviews'
    httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
    }

    constructor(private http: HttpClient) {
    }

    findById(interviewId: number) {
        return this.http.get<Interview>(this.API_URL + '/' + interviewId)
    }

    getAllInterviews(): Observable<Interview[]> {
        return this.http.get<Interview[]>(this.API_URL);
    }

    getInterview(): Observable<Interview> {
        return this.http.get<Interview>(this.API_URL);
    }
}