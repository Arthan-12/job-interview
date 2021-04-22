import { transition, trigger, useAnimation } from '@angular/animations';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatRadioChange } from '@angular/material';
import { Question } from 'src/app/core/models/question.model';
import { AnimationType, fadeIn, fadeOut, flipIn, flipOut, jackIn, jackOut, scaleIn, scaleOut } from './carousel.animations';

@Component({
  selector: 'app-questions-carousel',
  templateUrl: './questions-carousel.component.html',
  styleUrls: ['./questions-carousel.component.scss'],
  animations: [
    trigger("slideAnimation", [
      /* scale */
      transition("void => scale", [
        useAnimation(scaleIn, { params: { time: "500ms" } })
      ]),
      transition("scale => void", [
        useAnimation(scaleOut, { params: { time: "500ms" } })
      ]),

      /* fade */
      transition("void => fade", [
        useAnimation(fadeIn, { params: { time: "500ms" } })
      ]),
      transition("fade => void", [
        useAnimation(fadeOut, { params: { time: "500ms" } })
      ]),

      /* flip */
      transition("void => flip", [
        useAnimation(flipIn, { params: { time: "500ms" } })
      ]),
      transition("flip => void", [
        useAnimation(flipOut, { params: { time: "500ms" } })
      ]),

      /* JackInTheBox */
      transition("void => jackInTheBox", [
        useAnimation(jackIn, { params: { time: "700ms" } })
      ]),
      transition("jackInTheBox => void", [
        useAnimation(jackOut, { params: { time: "700ms" } })
      ])
    ])
  ]
})
export class QuestionsCarouselComponent {

  //@Input() isInterviewStarted: boolean;
  @Input() questions: Question[];
  @Input() animationType = AnimationType.Scale;

  @Output() questionScore = new EventEmitter<number>();

  currentSlide = 0;
  candidateScore: number[] = [];
  answerBonus: number;
  isQuestionAnswered: boolean = false;
  isQuestionSelected: boolean = false;
  isInterviewStarted: boolean = false;

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
    //this.currentSlide = previous < 0 ? this.questions.length - 1 : previous;
    this.currentSlide = previous;
    if(this.currentSlide == -1) {
      this.currentSlide = 0
    }
    console.log("previous clicked, new current slide is: ", this.currentSlide);
  }

  onNextClick() {
    this.isQuestionSelected = false;
    this.isQuestionAnswered = false;
    const next = this.currentSlide + 1;
    //this.currentSlide = next === this.questions.length ? 0 : next;
    this.currentSlide = next;
    if(this.currentSlide == this.questions.length) {
      this.currentSlide = this.questions.length - 1;
    }
    console.log("next clicked, new current slide is: ", this.currentSlide);
  }

}
