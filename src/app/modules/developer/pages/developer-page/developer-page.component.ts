import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-developer-page',
  templateUrl: './developer-page.component.html',
  styleUrls: ['./developer-page.component.scss']
})
export class DeveloperPageComponent implements OnInit {

  selectedAccounts = [];
  selectedAccount = '';

  accounts = [
    { name: 'Victor Augusto de Souza', acronym: 'VSU', selected: true, selectedGroup: 'Recentes' },
    { name: 'William de Oliveira Cunha', acronym: 'WCU', selected: false, selectedGroup: 'Colaboradores'},
    { name: 'Gabriela Trindade Pires', acronym: 'GPR', selected: false, selectedGroup: 'Colaboradores'},
    { name: 'Ivan Souza', acronym: 'ISU', selected: false, selectedGroup: 'Colaboradores'},
    { name: 'Renato Bonfim Herculano', acronym: 'RHE', selected: false, selectedGroup: 'Colaboradores'},
    { name: 'Francisca Dairley Santos',acronym: 'FAV', selected:  false, selectedGroup: 'Colaboradores'},
    { name: 'Eduarda Gabriela da Silva', acronym: 'EGS', selected: false, selectedGroup: 'Colaboradores'},
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

  getSelectedValues() {
    this.accounts.map(account => {
      if (account.selected === true) {
        account.selectedGroup = 'Recentes'
      }
      if (account.selected === false) {
        account.selected = true
        account.selectedGroup = 'Recentes'
      }
    })
    console.log(this.selectedAccounts);
  }

  getValues() {
    console.log(this.selectedAccount)
  }

  clear() {
    this.selectedAccount = '';
  }

}

export interface Account {
  name?: string;
  acronym?: string;
  selected?: boolean;
  selectedGroup?: string;
}
