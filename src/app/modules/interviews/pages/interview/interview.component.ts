import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Interview } from 'src/app/core/models/interview.model';
import { Questionnaire } from 'src/app/core/models/questionnaire.model';
import { InterviewService } from 'src/app/core/services/interview.service';
import { QuestionnaireService } from 'src/app/core/services/questionnaire.service';


@Component({
  selector: 'app-interview',
  templateUrl: './interview.component.html',
  styleUrls: ['./interview.component.scss']
})
export class InterviewComponent implements OnInit {

  @Input() selectedOption: string;
  interviewOptions: Interview[];
  interviewName: string[]
  interviews$: Observable<Interview[]>;
  questionaires$: Observable<Questionnaire[]>

  constructor(
    private interviewsService: InterviewService,
    private questionnaireService: QuestionnaireService
  ) { }

  ngOnInit() {
    this.interviews$ = this.interviewsService.getAllInterviews();
    this.questionaires$ = this.questionnaireService.getAllQuestionnaires();
    this.interviewsService.getInterview();
  }

  getInterview() {
    this.interviewsService.getInterview().subscribe()
  }

  getSelectedValue() {
    console.log(this.selectedOption)
  }

}
