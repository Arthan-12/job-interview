import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CandidateService } from 'src/app/core/services/candidates.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent {

  candidateForm: FormGroup;

  ngOnInit() {
      this.candidateForm = this.fb.group({
      name: [''],
      interview: [''],
      score: [''],
      date: [''],    
    })
  }

  constructor(
    public fb: FormBuilder,
    public candidateService: CandidateService
  ) {}

  submitForm() {
    this.candidateService.createCandidate(this.candidateForm.value).subscribe(res =>
      console.log('Candidate created!'))
  }

}