import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Candidate } from "src/app/core/models/candidate.model";


@Injectable()
export class CandidateService {

    private readonly API_URL = 'http://localhost:3000/candidates'
    dataChange: BehaviorSubject<Candidate[]> = new BehaviorSubject<Candidate[]>([]);
    // Guarda os dados dos dialogs temporariamente
    dialogData: any;

    constructor(private http: HttpClient) {}

    get data(): Candidate[] {
        return this.dataChange.value;
    }

    getDialogData() {
        return this.dialogData;
    }

    getAllCandidates(): void {
        this.http.get<Candidate[]>(this.API_URL).subscribe(data => {
            this.dataChange.next(data);
        })
    }

    createCandidate(candidate: Candidate): void {
        this.dialogData = candidate
    }
    
    
    updateCandidate(candidate: Candidate): void {
        this.dialogData = candidate
    }

    deleteCandidate(id: number): void {
        console.log(id)
    }

}