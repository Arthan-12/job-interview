import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-candidate',
  templateUrl: './search-candidate.component.html',
  styleUrls: ['./search-candidate.component.scss']
})
export class SearchCandidateComponent implements OnInit {

  searchCandidate: string = '';

  constructor() { }

  ngOnInit() {
  }

}
