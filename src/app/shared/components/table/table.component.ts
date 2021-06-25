import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Column } from 'src/app/core/models/column.model';
import { Row } from 'src/app/core/models/row.model';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent<T> implements OnInit {

  @Input() columns: Column<T>[];
  @Input() rows: Row<T>[];

  public dataSource = new MatTableDataSource<Row<T>>();
  public columnNames: string[];

  constructor() { }

  ngOnInit(): void {
    this.dataSource.data = this.rows;
    this.columnNames = this.columns.map((column) => column.name.toString());
  }

}
