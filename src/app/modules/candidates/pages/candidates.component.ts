import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatSnackBar } from '@angular/material';
import { BehaviorSubject, fromEvent, merge, Observable, Subscription } from 'rxjs';
import { map, mergeMap, tap, toArray } from 'rxjs/operators';
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

  constructor(
      public fb: FormBuilder,
      public httpClient: HttpClient,
      private dialog: MatDialog,
      private candidateService: CandidateService,
      private snackBar: MatSnackBar
     
  ) { }
   

  ngOnInit(): void {
    this.candidates$ = this.candidateService.getAllCandidates();
    this.candidateService.getAllCandidates().subscribe((data: Candidate[]) => {
       console.log(data);
       this.candidates = data
     });
    this.candidateUpdateForm = this.fb.group({
      name: [''],
      interview: [''],
      score: [''],
      date: [''],    
    });
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
        this.snackBar.openFromComponent(SnackbarComponent, {
          data: 'Candidato deletado com sucesso!',
          duration: 2000,
          panelClass: ['snackbar-delete']
        });
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

  orderByName() {
    this.candidateService.getAllCandidates().pipe(
     
      mergeMap((candidates: Candidate[]) => candidates),
      map((candidate: Candidate) => ({
        name: candidate.name.toLocaleLowerCase(),
        interview: candidate.interview,
        score: candidate.score,
        date: candidate.date
      })),
      toArray(),
      tap(output => {
        output.sort((a, b) => {
          return a.name < b.name ? -1 : 1;
        });
        this.candidates = output
        console.log(output)})
    ).subscribe();
  }

}