import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatDialog, MatPaginator, MatSort } from '@angular/material';
import { BehaviorSubject, fromEvent, merge, Observable } from 'rxjs';
import { Candidate } from 'src/app/core/models/candidate.model';
import { CandidateService } from 'src/app/core/services/candidates.service';
import {DataSource} from '@angular/cdk/collections';

@Component({
  selector: 'app-candidates',
  templateUrl: './candidates.component.html',
  styleUrls: ['./candidates.component.scss']
})
export class CandidatesComponent implements OnInit {

  candidateData: Candidate[] = [
    {id: 1, name: 'Victor Souza', interview: 'Trainee Consultoria', score: 75, date: '28/02/21'}
  ];
  displayedColumns: string[] = ['id', 'name', 'interview', 'score', 'date'];
  dataSource = this.candidateData;
  index: number;
  id: number;

  constructor(
    // public httpClient: HttpClient,
    // public dialog: MatDialog,
    // public candidateService: CandidateService
  ) { }

  // @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  // @ViewChild(MatSort, {static: true}) sort: MatSort;
  // @ViewChild('filter', {static: true}) filter: ElementRef;

  ngOnInit() {
    //this.loadCandidates();
  }

  // loadCandidates() {
  //   this.candidateService = new CandidateService(this.httpClient);
  //   this.dataSource = new CandidateData(this.candidateService, this.paginator, this.sort);
  //   fromEvent(this.filter.nativeElement, 'keyup').subscribe(() => {
  //     if(!this.dataSource) {
  //       return;
  //     }
  //     this.dataSource.filter = this.filter.nativeElement.value;
  //   });

  //   export class CandidateData extends DataSource<Candidate> {
  //     _filterChange = new BehaviorSubject('');
  //     get filter(): string {
  //       return this._filterChange.value;
  //     }
    
  //     set filter(filter: string) {
  //       this._filterChange.next(filter);
  //     }
    
  //     filteredData: Candidate[] = [];
  //     renderedData: Candidate[] = [];
    
  //     constructor(public _exampleDatabase: CandidateService,
  //                 public _paginator: MatPaginator,
  //                 public _sort: MatSort) {
  //       super();
  //       // Reset to the first page when the user changes the filter.
  //       this._filterChange.subscribe(() => this._paginator.pageIndex = 0);
  //     }
    
  //     /** Connect function called by the table to retrieve one stream containing the data to render. */
  //     connect(): Observable<Candidate[]> {
  //       // Listen for any changes in the base data, sorting, filtering, or pagination
  //       const displayDataChanges = [
  //         this._exampleDatabase.dataChange,
  //         this._sort.sortChange,
  //         this._filterChange,
  //         this._paginator.page
  //       ];
    
  //       this._exampleDatabase.getAllIssues();
    
    
  //       return merge(...displayDataChanges).pipe(map( () => {
  //           // Filter data
  //           this.filteredData = this._exampleDatabase.data.slice().filter((issue: Issue) => {
  //             const searchStr = (issue.id + issue.title + issue.url + issue.created_at).toLowerCase();
  //             return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
  //           });
    
  //           // Sort filtered data
  //           const sortedData = this.sortData(this.filteredData.slice());
    
  //           // Grab the page's slice of the filtered sorted data.
  //           const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
  //           this.renderedData = sortedData.splice(startIndex, this._paginator.pageSize);
  //           return this.renderedData;
  //         }
  //       ));
  //     }
    
  //     disconnect() {}
    
    
  //     /** Returns a sorted copy of the database data. */
  //     sortData(data: Candidate[]): Candidate[] {
  //       if (!this._sort.active || this._sort.direction === '') {
  //         return data;
  //       }
    
  //       return data.sort((a, b) => {
  //         let propertyA: number | string = '';
  //         let propertyB: number | string = '';
    
  //         switch (this._sort.active) {
  //           case 'id': [propertyA, propertyB] = [a.id, b.id]; break;
  //           case 'name': [propertyA, propertyB] = [a.name, b.name]; break;
  //           case 'interview': [propertyA, propertyB] = [a.interview, b.interview]; break;
  //           case 'score': [propertyA, propertyB] = [a.score, b.score]; break;
  //           case 'date': [propertyA, propertyB] = [a.date, b.date]; break;
  //         }
    
  //         const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
  //         const valueB = isNaN(+propertyB) ? propertyB : +propertyB;
    
  //         return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
  //       });
  //     }
  //   }
  // }
}