import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-date-card',
  templateUrl: './date-card.component.html',
  styleUrls: ['./date-card.component.scss']
})
export class DateCardComponent implements OnInit {

  todayDay = moment().format('ddd');
  todayNum = moment().format('DD/MM');
  cards: number[] = []

  constructor(
  ) { }

  ngOnInit() {
    this.weekCalculator()
  }

  weekCalculator() {
    for(let i = 0; i < 8; i++) {
      let numero = 1
      this.cards = [numero++];
    }
  }
  
}
