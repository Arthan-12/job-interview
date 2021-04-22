import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-candidate-score',
  templateUrl: './candidate-score.component.html',
  styleUrls: ['./candidate-score.component.scss']
})
export class CandidateScoreComponent implements OnInit {

  @Input() candidateScore: number;

  constructor() { }

  ngOnInit() {
  }

  getCandidateScore() {
    console.log(this.candidateScore);
  }

}
