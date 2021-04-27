import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core"
import { Observable } from "rxjs";

import { Questionnaire } from "../models/questionnaire.model";

@Injectable({
    providedIn: 'root'
})
export class QuestionnaireService {

    private readonly API_URL = 'http://localhost:3000/questionnaires';
    httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
    }

    constructor(private http: HttpClient) {}

    findById(questionnaireId: number): Observable<Questionnaire> {
        return this.http.get<Questionnaire>(this.API_URL + '/' + questionnaireId)
    }

    getAllQuestionnaires(): Observable<Questionnaire[]> {
        return this.http.get<Questionnaire[]>(this.API_URL);
    }

    getQuestionnaire(): Observable<Questionnaire> {
        return this.http.get<Questionnaire>(this.API_URL);
    }

    getQuestionnaireByInterview(interviewId: number): Observable<Questionnaire[]> {
        return this.http.get<Questionnaire[]>(this.API_URL + '/' + interviewId + '/interviews')
    }

    addQuestionaire(questionnaire: Questionnaire): Observable<Questionnaire> {
        return this.http.post<Questionnaire>(this.API_URL, JSON.stringify(questionnaire), this.httpOptions)
    }

    editQuestionaire(id: number, questionnaire: Questionnaire): Observable<Questionnaire> {
        return this.http.put<Questionnaire>(this.API_URL + '/' + id, JSON.stringify(questionnaire), this.httpOptions)
    }

    editQuestion(id: number): Observable<Questionnaire> {
        return this.http.put<Questionnaire>(this.API_URL + '/' + id, this.httpOptions)
    }
    
}