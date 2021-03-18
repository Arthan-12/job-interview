import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Interview } from 'src/app/core/models/interview.model';
import { InterviewService } from 'src/app/core/services/interview.service';


export interface mockInterview {
  value: string;
  name: string;
}

@Component({
  selector: 'app-interview',
  templateUrl: './interview.component.html',
  styleUrls: ['./interview.component.scss']
})
export class InterviewComponent implements OnInit {

  selectedValue: string;
  interviewOptions: Interview[];
  interviewName: string[]
  interviews$: Observable<Interview[]>;

  constructor(
    private interviewsService: InterviewService
  ) { }

  ngOnInit() {
    this.interviews$ = this.interviewsService.getAllInterviews()
  }

  getInterview() {
    this.interviewsService.getInterview().subscribe()
  }

}
