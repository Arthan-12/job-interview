import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild, ElementRef, Input, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatSnackBar } from '@angular/material';
import * as moment from 'moment';
import { BehaviorSubject, fromEvent, merge, Observable, Subscription } from 'rxjs';
import { debounce, debounceTime, map, mergeMap, tap, toArray } from 'rxjs/operators';
import { Candidate } from 'src/app/core/models/candidate.model';
import { CandidateService } from 'src/app/core/services/candidates.service';
import { SnackbarComponent } from 'src/app/shared/components/snackbar/snackbar.component';
import { ConfirmDialogComponent } from '../components/confirm-dialog/confirm-dialog.component';
import { EditCandidateDialogComponent } from '../components/edit-candidate-dialog/edit-candidate-dialog.component';

@Component({
  selector: 'app-candidates',
  templateUrl: './candidates.component.html',
  styleUrls: ['./candidates.component.scss']
})
export class CandidatesComponent implements OnInit {

  @Input() searchCandidate: string;

  candidateUpdateForm: FormGroup;
  candidates: Candidate[] = [];
  candidate: Candidate;
  candidateModel: Candidate;
  index: number;
  currentRow: number;
  candidate$: Observable<Candidate>;
  candidates$: Observable<Candidate[]>;

  //subscription: Subscription;

  newCandidateList: Candidate[];

  constructor(
      public fb: FormBuilder,
      public httpClient: HttpClient,
      private dialog: MatDialog,
      private candidateService: CandidateService,
      private snackBar: MatSnackBar
     
  ) { }
   

  ngOnInit(): void {
    this.candidates$ = this.candidateService.getAllCandidates();
    this.candidateUpdateForm = this.fb.group({
      name: [''],
      interview: [''],
      score: [''],
      date: [''],    
    });
    this.orderByName();
  }

  deleteCandidate() {
      this.dialog.open(ConfirmDialogComponent, {data: {
        actionTitle: 'Confirma exclusão de candidato?'
        }
      })
      .afterClosed().subscribe((result) => {
        if(result == true) {
        console.log(this.candidateModel.id);
        this.candidateService.deleteCandidate(this.candidateModel.id).subscribe()
        this.snackBar.openFromComponent(SnackbarComponent, {
          data: 'Candidato deletado com sucesso!',
          duration: 2000,
          panelClass: ['snackbar-delete']
        });
        this.refreshCandidateTable();
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
      this.refreshCandidateTable();
      this.currentRow = null;
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
    this.candidates = data);
    this.candidates$ = this.candidateService.getAllCandidates();
    this.orderByName();
  }

  orderByName() {
    this.candidates$ = this.candidateService.getAllCandidates().pipe(
     
      mergeMap((candidates: Candidate[]) => candidates),
      map((candidate: Candidate) => ({
        id: candidate.id,
        name: candidate.name,
        interview: candidate.interview,
        score: candidate.score,
        date: candidate.date
      })),
      toArray(),
      tap(output => {
        output.sort((a, b) => (a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1)
        );
        this.candidates = output
        console.log(output.map((candidate) => candidate.id))
        return this.candidates
      })
    );
    
  }

  orderByInterview() {
    this.candidates$ = this.candidateService.getAllCandidates().pipe(
     
      mergeMap((candidates: Candidate[]) => candidates),
      map((candidate: Candidate) => ({
        id: candidate.id,
        name: candidate.name,
        interview: candidate.interview,
        score: candidate.score,
        date: candidate.date
      })),
      toArray(),
      tap(output => {
        output.sort((a, b) => (a.interview.toLowerCase() < b.interview.toLowerCase() ? -1 : 1)
        );
        this.candidates = output
        return this.candidates
      })
    );
  }

  orderByScore() {
    this.candidates$ = this.candidateService.getAllCandidates().pipe(
     
      mergeMap((candidates: Candidate[]) => candidates),
      map((candidate: Candidate) => ({
        id: candidate.id,
        name: candidate.name,
        interview: candidate.interview,
        score: candidate.score,
        date: candidate.date
      })),
      toArray(),
      tap(output => {
        output.sort((a, b) => (b.score - a.score)
        );
        this.candidates = output
        return this.candidates
      })
    );
  }

  trackByFunction(i: number, candidate: Candidate) {
    this.currentRow = i;
    candidate ? candidate.id : null;
    this.candidate = candidate;
    return this.candidate
  }

  getCandidate(candidate: Candidate, i) {
    this.currentRow = i;
    this.candidateModel = candidate;
    console.log(this.candidateModel);
  }

}