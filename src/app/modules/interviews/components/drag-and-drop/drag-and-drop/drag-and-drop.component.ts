import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, pluck } from 'rxjs/operators';
import { Questionnaire } from 'src/app/core/models/questionnaire.model';
import { QuestionnaireService } from 'src/app/core/services/questionnaire.service';

@Component({
  selector: 'app-drag-and-drop',
  templateUrl: './drag-and-drop.component.html',
  styleUrls: ['./drag-and-drop.component.scss']
})
export class DragAndDropComponent implements OnInit {

  @Input() selectedOption
  questions: string[];
  questionnaires$: Observable<Questionnaire[]>;
  

  constructor(
    private questionnaireService: QuestionnaireService
  ) { }

  ngOnInit() {
    this.questionnaires$ = this.questionnaireService.getAllQuestionnaires();
    this.getQuestionnaire();
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.questions, event.previousIndex, event.currentIndex);
  }

  getQuestionnaire() {
      if(this.selectedOption == 'Scrum Master') {
          this.questionnaireService.findById(3).subscribe(res => {
            res.questions
            console.log(res.questions)
            this.questions = res.questions
          return this.questions
          });
        } else if(this.selectedOption == 'Desenvolvedor React Pl') {
          this.questionnaireService.findById(1).subscribe(res => {
            res.questions
            console.log(res.questions)
            this.questions = res.questions
          return this.questions
          });
        }
      
  }
}
