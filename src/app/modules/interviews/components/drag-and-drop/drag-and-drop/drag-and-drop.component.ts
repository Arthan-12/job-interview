import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-drag-and-drop',
  templateUrl: './drag-and-drop.component.html',
  styleUrls: ['./drag-and-drop.component.scss']
})
export class DragAndDropComponent implements OnInit {

  interviews: any[] = [
    {
    "name":"teste",
    "interview": "teste",
    "difficulty": "teste"
    },
    {
    "name":"teste",
    "interview": "teste",
    "difficulty": "teste"
    },
  ]

  constructor() { }

  ngOnInit() {
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.interviews, event.previousIndex, event.currentIndex);
  }
}
