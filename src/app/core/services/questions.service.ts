import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core"
import { Observable } from "rxjs";
import { Question } from "../models/question.model";

@Injectable({
    providedIn: 'root'
})
export class QuestionService {

    private readonly API_URL = 'http://localhost:3000';
    httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
    }

    constructor(private http: HttpClient) {}

    getAllQuestions(): Observable<Question[]> {
        return this.http.get<Question[]>(this.API_URL + '/questions')
    }

    findQuestionsById(questionnaireId: number): Observable<Question[]> {
        return this.http.get<Question[]>(this.API_URL + '/questionnaires/' + questionnaireId + '/questions')
    }
}