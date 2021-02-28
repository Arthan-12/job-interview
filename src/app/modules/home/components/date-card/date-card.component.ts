import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-date-card',
  templateUrl: './date-card.component.html',
  styleUrls: ['./date-card.component.scss']
})
export class DateCardComponent implements OnInit {

  today = moment();

  constructor(
  ) { }

  ngOnInit() {
  }

  cards: number[] = [
    //this.today, moment().add(1,'d'), moment().add(2,'d'), moment().add(3,'d'), moment().add(4,'d'), moment().add(5,'d'), moment().add(6,'d')
    1, 2, 3, 4, 5, 6, 7
  ];
  
}
