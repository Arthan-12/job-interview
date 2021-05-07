import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';

import { Candidate } from 'src/app/core/models/candidate.model';
import { Interview } from 'src/app/core/models/interview.model';
import { Question } from 'src/app/core/models/question.model';
import { Questionnaire } from 'src/app/core/models/questionnaire.model';
import { CandidateService } from 'src/app/core/services/candidates.service';
import { InterviewService } from 'src/app/core/services/interview.service';
import { QuestionnaireService } from 'src/app/core/services/questionnaire.service';
import { QuestionService } from 'src/app/core/services/questions.service';
import { QuestionsCarouselComponent } from '../questions-carousel/questions-carousel.component'

@Component({
  selector: 'app-start-interview',
  templateUrl: './start-interview.component.html',
  styleUrls: ['./start-interview.component.scss']
})
export class StartInterviewComponent implements OnInit {

  @Input() selectedOption: string;
  carousel: QuestionsCarouselComponent;
  
  questions: Question[];
  candidate: Candidate;

  interviewTitle = 'Entrevista de padawan';
  interviewForm: FormGroup;
  questionnaire: Questionnaire;
  score: number[] = [];
  totalScore: number;
  isInterviewStarted: boolean = false;
  disableButton: boolean = true;

  candidate$: Observable<Candidate>;
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
      candidateName: null,
      interviewVacancy: null,
      questionnaireName: null,
    });
    this.questionnaire = {
      id: null,
      title: null,
      category: null,
      questions: null,
      vacancies: null
    }
    this.candidate = {
      name: null,
      interview: null,
      score: null,
      id: null
    }
  }

  getCandidate(event: string) {
    console.log(event)
    console.log(this.interviewForm.get('candidateName').value);
    this.candidate.id = this.interviewForm.get('candidateName').value;
    this.candidateService.findById(this.candidate.id).subscribe(res => {
      console.log(res);
    });  
  }

  enableStartInterviewButton() {
    let candidate = this.interviewForm.get('candidateName').value;
    let questionnaire = this.interviewForm.get('questionnaireName').value;
    if(candidate != "" && questionnaire != "") {
      this.disableButton = false;
    }
  }

  submitForm() {
    this.isInterviewStarted = true;
    this.questionnaire.id = this.interviewForm.get('questionnaireName').value;
    this.questionService.getQuestionsByInterview(this.questionnaire.id).subscribe(res => {
      this.questions = res
      console.log(res);
    })
    console.log(this.questionnaire.id);
  }

  showScore(questionScore: number) {
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    this.score.push(questionScore);
    console.log(this.score);
    this.totalScore = this.score.reduce(reducer);
    console.log(this.totalScore);
    return this.totalScore
  }

  submitCandidateScore() {
    this.getScore();
    console.log(this.candidate);
    this.candidateService.editCandidate(this.candidate.id, this.candidate).subscribe();
  }

  getScore() {
    this.candidate.score = this.totalScore;
    this.candidateService.findById(this.candidate.id).subscribe(candidate => {
      candidate.score = this.totalScore;
      this.candidate = candidate;
      //console.log(this.candidate)
      return this.candidate
    });
  }
  
}
