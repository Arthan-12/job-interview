import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CandidateService } from 'src/app/core/services/candidates.service';

@Component({
  selector: 'app-edit-candidate-dialog',
  templateUrl: './edit-candidate-dialog.component.html',
  styleUrls: ['./edit-candidate-dialog.component.scss']
})
export class EditCandidateDialogComponent implements OnInit {

  candidateForm: FormGroup;
  
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: any,
    public fb: FormBuilder,
    private candidateService: CandidateService) {}

  ngOnInit() {
    this.candidateForm = this.fb.group({
    name: [''],
    interview: [''],
    score: [''],
    date: [''],    
  })
}

submitForm() {
  this.candidateService.createCandidate(this.candidateForm.value).subscribe(res =>
    console.log('Candidate created!'))
}

}
