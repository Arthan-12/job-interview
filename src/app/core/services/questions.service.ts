import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core"
import { Observable } from "rxjs";
import { mergeMap, map, toArray, tap } from "rxjs/operators";

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
        return this.http.get<Question[]>(this.API_URL + '/questions');
    }

    getQuestion(): Observable<Question> {
        return this.http.get<Question>(this.API_URL + '/questions');
    }

    getQuestionsByInterview(questionnaireId: number): Observable<Question[]> {
        this.findQuestionsByQuestionnaireId(questionnaireId).pipe(
            mergeMap((questions: Question[]) => questions),
            map((question: Question) => ({
                id: question.id,
                question: question.question,
                answer: question.answer,
                difficulty: question.difficulty
                //questionnaireId: question.questionnaireId
            })),
            toArray(),
            tap((output) => console.log(output))
            )
        return this.http.get<Question[]>(this.API_URL + '/questionnaires/' + questionnaireId + '/questions')
    }

    findQuestionsByQuestionnaireId(questionnaireId: number): Observable<Question[]> {
        return this.http.get<Question[]>(this.API_URL + '/questionnaires/' + questionnaireId + '/questions');
    }

    addQuestion(question: Question): Observable<Question> {
        return this.http.post<Question>(this.API_URL + '/questions', JSON.stringify(question), this.httpOptions);
    }

    editQuestion(id: number, question: Question): Observable<Question> {
        return this.http.put<Question>(this.API_URL + '/questions/' + id, JSON.stringify(question), this.httpOptions)
    }

    deleteQuestion(id: number): Observable<Question> {
        return this.http.delete<Question>(this.API_URL + '/questions/' + id, this.httpOptions);
    }

}