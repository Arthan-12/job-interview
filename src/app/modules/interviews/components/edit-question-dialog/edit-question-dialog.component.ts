import { Component, Inject, OnChanges, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Observable } from 'rxjs';
import { Question } from 'src/app/core/models/question.model';
import { QuestionService } from 'src/app/core/services/questions.service';

@Component({
  selector: 'app-edit-question-dialog',
  templateUrl: './edit-question-dialog.component.html',
  styleUrls: ['./edit-question-dialog.component.scss']
})
export class EditQuestionDialogComponent implements OnInit {

  questionForm: FormGroup;
  question: Question;
  question$: Observable<Question>;
  index: number;
  selectedDifficultyOption: string;
  difficultyOptions: string[] = [
    'fácil',
    'médio',
    'difícil'
  ]
  
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: any,
    public fb: FormBuilder,
    private questionService: QuestionService) {}

  ngOnInit() {
    this.questionForm = this.fb.group({
    id: this.data.id,
    question: this.data.question,
    difficulty: this.data.difficulty,
    questionnaireId: this.data.questionnaireId,
    answer: this.data.answer,
    });
  }

  submitForm() {
    if(this.data.formTitle == 'Crie uma pergunta') {
      this.questionService.addQuestion(this.questionForm.value)
      .subscribe(res =>
        console.log('Question created!'));
    }
    else if(this.data.formTitle == 'Editar pergunta') {
      this.questionService.editQuestion(this.data.id, this.questionForm.value)
      .subscribe()
      console.log(this.questionForm.value);
      console.log('Question modified!')
    }
  }

  

}
