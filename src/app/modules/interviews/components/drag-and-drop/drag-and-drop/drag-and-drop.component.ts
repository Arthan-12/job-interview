import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Observable, pipe } from 'rxjs';
import { filter, map, mergeMap, pluck, tap, toArray } from 'rxjs/operators';
import { Interview } from 'src/app/core/models/interview.model';
import { Question } from 'src/app/core/models/question.model';
import { Questionnaire } from 'src/app/core/models/questionnaire.model';
import { QuestionService } from 'src/app/core/services/questions.service';
import { ConfirmDialogComponent } from 'src/app/modules/candidates/components/confirm-dialog/confirm-dialog.component';
import { SnackbarComponent } from 'src/app/shared/components/snackbar/snackbar.component';
import { EditQuestionDialogComponent } from '../../edit-question-dialog/edit-question-dialog.component';

@Component({
  selector: 'app-drag-and-drop',
  templateUrl: './drag-and-drop.component.html',
  styleUrls: ['./drag-and-drop.component.scss']
})
export class DragAndDropComponent implements OnInit {

  @Input() selectedOption: string;
  //questionsArray: string[];
  questionnaire: Questionnaire;
  interview: Interview;
  question: Question;

  questionnaires$: Observable<Questionnaire[]>;
  questions$: Observable<Question[]>;

  index: number;
  currentRow: number;
  questionIndex: number;
  
  questions: Question[] = [];
  
  constructor(
    private questionService: QuestionService,
    private snackBar: MatSnackBar,

    public fb: FormBuilder,
    public httpClient: HttpClient,
    private dialog: MatDialog,
  ) {
    this.interview = {},
    this.questionnaire = {}
   }

  ngOnInit() {
    
  }
  
  drop(event: CdkDragDrop<Question[]>) {
    moveItemInArray(this.questions, event.previousIndex, event.currentIndex);
    console.log(this.questions)
  }

  getQuestionnaireId(interview: Interview, questionnaire: Questionnaire) {
    if(interview.vacancy == 'Desenvolvedor Angular Pl' || interview.vacancy == 'Desenvolvedor React Pl') {
      questionnaire.id = 1;
    } else if (interview.vacancy == 'Desenvolvedor Java Jr') {
      questionnaire.id= 2;
    } else if (interview.vacancy == 'Scrum Master') {
      questionnaire.id = 3;
    } return questionnaire.id
  }

  getQuestions()  {
    this.interview.vacancy = this.selectedOption;
    this.getQuestionnaireId(this.interview, this.questionnaire);
    console.log(this.interview, this.questionnaire.id)
    this.questions$ = this.questionService.getQuestionsByInterview(this.questionnaire.id);
    this.snackBar.openFromComponent(SnackbarComponent, {
      data: 'Tabela atualizada com sucesso!',
      duration: 2000,
      panelClass: ['snackbar-success']
    });
    this.observableToArray()
  }

  getQuestion(question: Question, i: number) {
    this.currentRow = i;
    this.questionIndex = this.currentRow;
    this.question = question
    console.log(this.question);
  }

  addQuestion() {
    this.questionService.findQuestionsByQuestionnaireId(this.questionnaire.id).subscribe(res  => {
      res.push(this.question);
      console.log(res);
    });
  }

  deleteQuestion() {
    console.log(this.question.id)
    this.dialog.open(ConfirmDialogComponent, {data: {
      actionTitle: 'Confirma exclusão de pergunta?'
      }
    })
    .afterClosed().subscribe((result) => {
      if(result == true) {
        this.questionService.deleteQuestion(this.question.id).subscribe((res) => console.log(res), (err) => console.log(err));
      }
      this.snackBar.openFromComponent(SnackbarComponent, {
        data: 'Tabela atualizada com sucesso!',
        duration: 2000,
        panelClass: ['snackbar-delete']
      });
    })
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
    });
  }

  openDialog() {
    this.dialog.open(EditQuestionDialogComponent, { data: {
      formTitle: 'Crie uma pergunta',
      id: null,
      question: '',
      difficulty: '',
      questionnaireId: this.questionnaire.id,
      answer: '',
      },
    })
    .afterClosed().subscribe(() => {
      this.refreshQuestionTable()
      }  
    );
  }

  refreshQuestionTable() {
      this.questionService.getQuestionsByInterview(this.questionnaire.id).subscribe((data: Question[]) => 
      this.questions = data);
      this.questions$ = this.questionService.getQuestionsByInterview(this.questionnaire.id);
  }

  observableToArray() {
    this.questions$ = this.questionService.getQuestionsByInterview(this.questionnaire.id).pipe(
     
      mergeMap((questions: Question[]) => questions),
      map((question: Question) => ({
        id: question.id,
        question: question.question,
        questionnaireId: question.questionnaireId,
        difficulty: question.difficulty,
        answer: question.answer
      })),
      toArray(),
      tap(output => {
        this.questions = output
        console.log(output.map((question) => question.question))
        return this.questions
      })
    );
    
  }

}