import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { Observable } from 'rxjs';
import { Candidate } from 'src/app/core/models/candidate.model';
import { CandidateService } from 'src/app/core/services/candidates.service';
import { SnackbarComponent } from 'src/app/shared/components/snackbar/snackbar.component';

@Component({
  selector: 'app-edit-candidate-dialog',
  templateUrl: './edit-candidate-dialog.component.html',
  styleUrls: ['./edit-candidate-dialog.component.scss']
})
export class EditCandidateDialogComponent implements OnInit {

  candidateForm: FormGroup;
  candidate: Candidate;
  candidate$: Observable<Candidate>;
  index: number
  
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: any,
    public fb: FormBuilder,
    private candidateService: CandidateService,
    private snackBar: MatSnackBar) {}

  ngOnInit() {
    this.candidateForm = this.fb.group({
    name: this.data.name,
    interview: this.data.interview,
    score: this.data.score,
    date: this.data.date,    
  })
}

getCandidate(i: number, candidateId: number) {
  this.candidateService.getCandidate().subscribe((res) => {
  this.candidate = res;
  this.candidate$ = this.candidateService.findById(this.candidate[i].id);
  candidateId = this.candidate[i].id;
  console.log(this.candidate[i], candidateId);
  })
} 

submitForm() {
  if(this.data.formTitle == 'Inscreva um candidato') {
    this.candidateService.createCandidate(this.candidateForm.value)
    .subscribe(res =>
      console.log('Candidate created!'));
      this.snackBar.openFromComponent(SnackbarComponent, {
        data: 'Candidato criado com sucesso!',
        duration: 2000,
        panelClass: ['snackbar-create']
      });
  } else if(this.data.formTitle == 'Editar dados do candidato') {
    this.candidateService.editCandidate(this.data.id, this.candidateForm.value)
    .subscribe();
    console.log(this.candidateForm.value);
    console.log('Candidate modified!');
    this.snackBar.openFromComponent(SnackbarComponent, {
      data: 'Candidato modificado com sucesso!',
      duration: 2000,
      panelClass: ['snackbar-edit']
    });
  }
  
}

}
