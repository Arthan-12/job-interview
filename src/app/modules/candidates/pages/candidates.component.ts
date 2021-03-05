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
  candidate: Candidate;
  index: number
  currentRow: number
  

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
        n.id
      })
    });
    //console.log()
  }

  deleteCandidate(id: number) {
    this.candidateService.deleteCandidate(id).subscribe((res =>
      this.candidate = res));
  }

  getCandidate(i: number) {
      //this.index = i + 1;
      this.candidateService.getCandidate().subscribe((res) => {
      this.candidate = res
      this.currentRow = i;
      console.log(this.candidate[i], i);
    })
  }

  getIndex(i) {
    res => this.candidate = res;
    console.log(i);
  }

  updateCandidate(data: Candidate) {
 }
  
}