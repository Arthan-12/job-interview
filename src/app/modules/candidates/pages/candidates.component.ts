import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { BehaviorSubject, fromEvent, merge, Observable, Subscription } from 'rxjs';
import { Candidate } from 'src/app/core/models/candidate.model';
import { CandidateService } from 'src/app/core/services/candidates.service';
import { ConfirmDialogComponent } from '../components/confirm-dialog/confirm-dialog.component';
import { EditCandidateDialogComponent } from '../components/edit-candidate-dialog/edit-candidate-dialog.component';

@Component({
  selector: 'app-candidates',
  templateUrl: './candidates.component.html',
  styleUrls: ['./candidates.component.scss']
})
export class CandidatesComponent implements OnInit {

  candidateUpdateForm: FormGroup;
  candidates: Candidate[] = [];
  candidate: Candidate;
  candidateModel: Candidate;
  index: number;
  currentRow: number;
  candidate$: Observable<Candidate>;
  // candidateId: number;
  // candidateName: string;
  // candidateInterview: string;
  // candidateScore: number;
  // candidateDate: string;

  constructor(
      public fb: FormBuilder,
      public httpClient: HttpClient,
      private dialog: MatDialog,
      private candidateService: CandidateService
     
  ) { }
   

  ngOnInit(): void {
    this.candidateService.getAllCandidates().subscribe((data: Candidate[]) => {
      console.log(data);
      this.candidates = data
    });
    this.candidateUpdateForm = this.fb.group({
      name: [''],
      interview: [''],
      score: [''],
      date: [''],    
    })
  }

  getCandidate(i: number) {
    this.candidateService.getCandidate().subscribe((res) => {
    this.candidate = res;
    this.currentRow = i;
    this.candidate$ = this.candidateService.findById(this.candidate[i].id);
    this.candidateModel = {
      id: this.candidate[i].id,
      name: this.candidate[i].name,
      interview: this.candidate[i].interview,
      score: this.candidate[i].score,
      date: this.candidate[i].date
    }
    console.log(this.candidate[i]);
    })
  }

  deleteCandidate() {
      this.dialog.open(ConfirmDialogComponent, {data: {
        actionTitle: 'Confirma exclusão de candidato?'
        }
      })
      .afterClosed().subscribe((result) => {
        if(result == true) {
        this.candidateService.deleteCandidate(this.candidateModel.id).subscribe()
        this.refreshCandidateTable()
        }
        
      }
    )  
  }

  updateCandidate(): void {
    console.log(this.candidateModel.id)
    this.dialog.open(EditCandidateDialogComponent, {data: {
      formTitle: ['Editar dados do candidato'],
      id: this.candidateModel.id, 
      name: this.candidateModel.name,
      interview: this.candidateModel.interview,
      score: this.candidateModel.score,
      date: this.candidateModel.date
      }
    })
    .afterClosed().subscribe(() => {
      this.refreshCandidateTable()
    })
  }

  

  openDialog() {
    this.dialog.open(EditCandidateDialogComponent, { data: {
      formTitle: ['Inscreva um candidato'],
      name: [''],
      interview: [''],
      score: [''],
      date: ['']
      },
    })
    .afterClosed().subscribe(() => {
      this.refreshCandidateTable()
      }  
    );
  }

  refreshCandidateTable() {
      this.candidateService.getAllCandidates().subscribe((data: Candidate[]) => 
      this.candidates = data)
  }
  
}