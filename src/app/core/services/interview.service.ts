import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Interview } from "../models/interview.model";
import { Questionnaire } from "../models/questionnaire.model";


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

    addInterview(interview: Interview): Observable<Interview> {
        return this.http.post<Interview>(this.API_URL, JSON.stringify(interview), this.httpOptions)
    }

    editInterview(id: number, interview: Interview): Observable<Interview> {
        return this.http.put<Interview>(this.API_URL + '/' + id, JSON.stringify(interview), this.httpOptions)
    }
}