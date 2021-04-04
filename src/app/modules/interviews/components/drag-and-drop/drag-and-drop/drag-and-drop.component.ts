import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { Observable } from 'rxjs';
import { filter, map, mergeMap, pluck, tap, toArray } from 'rxjs/operators';
import { Question } from 'src/app/core/models/question.model';
import { Questionnaire } from 'src/app/core/models/questionnaire.model';
import { QuestionnaireService } from 'src/app/core/services/questionnaire.service';
import { QuestionService } from 'src/app/core/services/questions.service';
import { ConfirmDialogComponent } from 'src/app/modules/candidates/components/confirm-dialog/confirm-dialog.component';
import { EditQuestionDialogComponent } from '../../edit-question-dialog/edit-question-dialog.component';

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
  question$: Observable<Question>;
  index: number;
  currentRow: number;
  question: Question;
  questions$: Observable<Question[]>;
  questions: Question[] = [];
  questionnaireId: number;
  questionIndex: number;
  questionModel: Question;

  constructor(
    private questionnaireService: QuestionnaireService,
    private questionService: QuestionService,

    public fb: FormBuilder,
    public httpClient: HttpClient,
    private dialog: MatDialog,
  ) { }

  ngOnInit() {
    //this.questionnaires$ = this.questionnaireService.getAllQuestionnaires();
    //this.getQuestions();

    //this.questions$.subscribe(data => this.questionnaires.push({questions: data}))
  }

  
  drop(event: CdkDragDrop<Question[]>) {
    moveItemInArray(this.questions, event.previousIndex, event.currentIndex);
    console.log(this.questions)
  }

  getQuestions()  {
    if(this.selectedOption == 'Scrum Master') {
      this.questionnaireId = 3;
      this.questions$ = this.questionService.findQuestionsByQuestionnaireId(3).pipe(
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
      )} else if(this.selectedOption == 'Desenvolvedor React Pl') {
        this.questionnaireId = 1;
        this.questions$ = this.questionService.findQuestionsByQuestionnaireId(1).pipe(
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
      )}
  }

  getQuestion(i: number) {
    this.currentRow = i;
    this.questionIndex = this.currentRow;
    this.questionService.findQuestionsByQuestionnaireId(this.questionnaireId).subscribe(res => {
      console.log(res[i])
      this.question = res[i];
    });
  }

  addQuestion() {
    this.questionService.findQuestionsByQuestionnaireId(this.questionnaireId).subscribe(res  => {
      res.push(this.question);
      console.log(res);
    })
  }

  deleteQuestion() {
    console.log(this.question.id)
    this.dialog.open(ConfirmDialogComponent, {data: {
      actionTitle: 'Confirma exclusão de pergunta?'
      }
    })
    .afterClosed().subscribe((result) => {
      if(result == true) {
        this.questionService.deleteQuestion(this.question.id).subscribe();
      }
    })
  }

  onKey(event) {
    const inputValue = event.target.value;
    console.log(inputValue)
    this.questionsArray = inputValue
    return this.questionsArray
  }

  editQuestion() {
   this.dialog.open(EditQuestionDialogComponent, {data: {
      formTitle: 'Editar pergunta',
      id: this.question.id,
      question: this.question.question,
      difficulty: this.question.difficulty,
      questionnaireId: this.question.questionnaireId,
      answer: this.question.answer
      }
    })
    .afterClosed().subscribe(() => {
      this.refreshQuestionTable()
    })
  }

  openDialog() {
    this.dialog.open(EditQuestionDialogComponent, { data: {
      formTitle: 'Crie uma pergunta',
      id: null,
      question: '',
      difficulty: '',
      questionnaireId: this.questionnaireId,
      answer: '',
      },
    })
    .afterClosed().subscribe(() => {
      this.refreshQuestionTable()
      }  
    );
  }

  refreshQuestionTable() {
      this.questionService.getAllQuestions().subscribe((data: Question[]) => 
      this.questions = data)
  }
}