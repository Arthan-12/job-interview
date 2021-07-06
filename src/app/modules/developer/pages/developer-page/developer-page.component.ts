import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-developer-page',
  templateUrl: './developer-page.component.html',
  styleUrls: ['./developer-page.component.scss']
})
export class DeveloperPageComponent implements OnInit {

  selectedAccounts = [];
  selectedAccount = [];

  accounts = [
    { name: 'Victor Augusto de Souza', acronym: 'VSU' },
    { name: 'William de Oliveira Cunha', acronym: 'WCU'},
    { name: 'Gabriela Trindade Pires', acronym: 'GPR'},
    { name: 'Ivan Souza', acronym: 'ISU'},
    { name: 'Renato Bonfim Herculano', acronym: 'RHE'},
    { name: 'Francisca Dairley Santos',acronym: 'FAV'},
    { name: 'Eduarda Gabriela da Silva', acronym: 'EGS'},
];


  constructor() { }

  ngOnInit() {
  }

  compareAccounts = (item, selected) => {
    if (selected.country && item.country) {
        return item.country === selected.country;
    }
    if (item.name && selected.name) {
        return item.name === selected.name;
    }
    return false;
  };

  getValues() {
    console.log(this.selectedAccount)
  }

  getIndex(i) {
    console.log(this.selectedAccount[i], this.selectedAccount)
  }

  clear(i) {
     const accountArray = this.selectedAccount;
     accountArray[i] = "";
    this.selectedAccount = accountArray; 
    console.log(this.selectedAccount)
  }

  unselectAll() {
    this.selectedAccounts = [];
  }

}

export interface Account {
  name?: string;
  acronym?: string;
  selected?: boolean;
  selectedGroup?: string;
}
