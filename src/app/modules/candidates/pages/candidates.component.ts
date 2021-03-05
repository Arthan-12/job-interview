import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { BehaviorSubject, fromEvent, merge, Observable, Subscription } from 'rxjs';
import { Candidate } from 'src/app/core/models/candidate.model';
import { CandidateService } from 'src/app/core/services/candidates.service';
import {DataSource} from '@angular/cdk/collections';

@Component({
  selector: 'app-candidates',
  templateUrl: './candidates.component.html',
  styleUrls: ['./candidates.component.scss']
})
export class CandidatesComponent implements OnInit {

  candidates: Candidate[] = [];

  constructor(
     public httpClient: HttpClient,
     private candidateService: CandidateService
  ) {}
   

  ngOnInit(): void {
    this.candidateService.getAllCandidates().subscribe((data: Candidate[]) => {
      console.log(data);
      this.candidates = data
      this.candidates.map((n) => {
        n.name,
        n.interview,
        n.score,
        n.date
      })
    });
    console.log()
  }

  updateCandidate(data: Candidate) {
 }
  
}