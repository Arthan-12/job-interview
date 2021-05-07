import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatRadioChange } from '@angular/material';
import { Question } from 'src/app/core/models/question.model';

@Component({
  selector: 'app-questions-carousel',
  templateUrl: './questions-carousel.component.html',
  styleUrls: ['./questions-carousel.component.scss'],
})
export class QuestionsCarouselComponent {

  //@Input() isInterviewStarted: boolean;
  @Input() questions: Question[];
  @Output() questionScore = new EventEmitter<number>();

  currentSlide: number = 0;
  candidateScore: number[] = [];
  answerBonus: number;
  isQuestionAnswered: boolean = false;
  isQuestionSelected: boolean = false;
  isInterviewStarted: boolean = false;
  disableButton: boolean = false;

  constructor() {}

  radioChange(event: MatRadioChange) {
    this.isQuestionSelected = true;
    this.isInterviewStarted = true;
    this.answerBonus = event.value;
    console.log(this.answerBonus);
    console.log(this.isInterviewStarted)
    return this.answerBonus
  }

  scoreCount(value: number) {
    this.isQuestionAnswered = true;
    value = 100 * this.answerBonus;
    console.log(value);
    this.questionScore.emit(value);
  }

  totalScore() {
    console.log(this.candidateScore)
  }

  onPreviousClick() {
    this.isQuestionSelected = false;
    this.isQuestionAnswered = false;
    const previous = this.currentSlide - 1;
    this.currentSlide = previous;
    if(this.currentSlide == 0) {
      this.disableButton = true;
    }
    if(this.currentSlide == -1) {
      this.currentSlide = 0
    }
  }

  onNextClick(value: boolean) {
    this.isQuestionSelected = false;
    this.isQuestionAnswered = false;
    const next = this.currentSlide + 1;
    this.currentSlide = next;
    if(this.currentSlide == this.questions.length) {
      this.currentSlide = this.questions.length - 1;
      this.disableButton = true;
    }
  }

}
