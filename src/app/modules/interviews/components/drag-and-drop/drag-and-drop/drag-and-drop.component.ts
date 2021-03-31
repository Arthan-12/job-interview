import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { filter, map, mergeMap, pluck, tap, toArray } from 'rxjs/operators';
import { Question } from 'src/app/core/models/question.model';
import { Questionnaire } from 'src/app/core/models/questionnaire.model';
import { QuestionnaireService } from 'src/app/core/services/questionnaire.service';
import { QuestionService } from 'src/app/core/services/questions.service';

@Component({
  selector: 'app-drag-and-drop',
  templateUrl: './drag-and-drop.component.html',
  styleUrls: ['./drag-and-drop.component.scss']
})
export class DragAndDropComponent implements OnInit {

  @Input() selectedOption

  questionsArray: string[];
  questionnaire: Questionnaire;
  questionnaires$: Observable<Questionnaire[]>;
  question$: Observable<Questionnaire>;
  index: number;
  currentRow: number;
  question: number;
  questions$: Observable<Question[]>;
  questions: Question[] = [];
  questionId: number

  constructor(
    private questionnaireService: QuestionnaireService,
    private questionService: QuestionService
  ) { }

  ngOnInit() {
    this.questionnaires$ = this.questionnaireService.getAllQuestionnaires();
    this.getQuestions();
  }

  drop(event: CdkDragDrop<Question[]>) {
    this.questionService.findQuestionsById(this.questionId).subscribe(questions => this.questions = questions);
    moveItemInArray(this.questions, event.previousIndex, event.currentIndex);
    console.log(this.questions)
  }

  getQuestions()  {
    if(this.selectedOption == 'Scrum Master') {
      this.questionId = 3;
      this.questions$ = this.questionService.findQuestionsById(3).pipe(
        mergeMap((questions: Question[]) => questions),
        map((question: Question) => ({
          //id: question.id,
          question: question.question,
          //questionnaireId: question.questionnaireId
        })),
        toArray(),
        tap((output) => console.log(output))
      )} else if(this.selectedOption == 'Desenvolvedor React Pl') {
        this.questionId = 1;
        this.questions$ = this.questionService.findQuestionsById(1).pipe(
        mergeMap((questions: Question[]) => questions),
        map((question: Question) => ({
          //id: question.id,
          question: question.question,
          //questionnaireId: question.questionnaireId
        })),
        toArray(),
        tap((output) => console.log(output))
      )}
  }

  getQuestion(i: number) {
    this.currentRow = i;
    this.question = this.currentRow
    console.log(this.question)
    return this.question
  }

  addQuestion() {
    let question: Question;
    this.questionsArray = [];
    this.questions.push(question);
    return this.questions
  }

  deleteQuestion() {
    this.questions.splice(this.question, 1)
  }

  onKey(event) {
    const inputValue = event.target.value;
    console.log(inputValue)
    this.questionsArray = inputValue
    return this.questionsArray
  }

  saveQuestionnaire() {
    console.log(this.questions, this.questionsArray);
    // this.questionnaireService.(this.questionnaireId).subscribe(res => {
    //     res.questions
    //     console.log(res.questions)
    //   })
  }
}