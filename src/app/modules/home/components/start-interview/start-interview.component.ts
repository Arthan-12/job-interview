import { Component, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Candidate } from 'src/app/core/models/candidate.model';
import { Interview } from 'src/app/core/models/interview.model';
import { Question } from 'src/app/core/models/question.model';
import { Questionnaire } from 'src/app/core/models/questionnaire.model';
import { CandidateService } from 'src/app/core/services/candidates.service';
import { InterviewService } from 'src/app/core/services/interview.service';
import { QuestionnaireService } from 'src/app/core/services/questionnaire.service';
import { QuestionService } from 'src/app/core/services/questions.service';
import { AnimationType } from '../questions-carousel/carousel.animations';
import { QuestionsCarouselComponent } from '../questions-carousel/questions-carousel.component'

@Component({
  selector: 'app-start-interview',
  templateUrl: './start-interview.component.html',
  styleUrls: ['./start-interview.component.scss']
})
export class StartInterviewComponent implements OnInit {

  @Input() selectedOption: string;
  carousel: QuestionsCarouselComponent;

  animationType = AnimationType.Scale;

  animationTypes = [
    {
      name: "Scale",
      value: AnimationType.Scale
    },
    {
      name: "Fade",
      value: AnimationType.Fade
    },
    {
      name: "Flip",
      value: AnimationType.Flip
    },
    {
      name: "Jack In The Box",
      value: AnimationType.JackInTheBox
    }
  ];
  
  questions: Question[];

  interviewTitle = 'Entrevista de padawan';
  interviewForm: FormGroup;
  questionnaire: Questionnaire = {};

  candidates$: Observable<Candidate[]>;
  interviews$: Observable<Interview[]>;
  questionnaires$: Observable<Questionnaire[]>;

  constructor(
    public fb: FormBuilder,
    private candidateService: CandidateService,
    private interviewService: InterviewService,
    private questionnaireService: QuestionnaireService,
    private questionService: QuestionService
  ) { }


  ngOnInit() {
    this.candidates$ = this.candidateService.getAllCandidates();
    this.interviews$ = this.interviewService.getAllInterviews();
    this.questionnaires$ = this.questionnaireService.getAllQuestionnaires();
    this.interviewForm = this.fb.group({
      candidateName: '',
      interviewVacancy: '',
      questionnaireName: '',
    });
  }

  submitForm() {
    this.questionnaire.id = this.interviewForm.get('questionnaireName').value
    this.questionService.getQuestionsByInterview(this.questionnaire.id).subscribe(res => {
      this.questions = res
      console.log(res);
    })
    console.log(this.questionnaire.id);
  }

  
}
