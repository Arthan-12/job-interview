import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {

  constructor(private router: Router) {}

  acoes: String[] = ['Questionários', 'Candidatos', 'Calendário']


  goTo(acao: string) {
      if(acao == 'Candidatos') {
        this.router.navigate(['candidatos']);
      } else if (acao == 'Questionários') {
        this.router.navigate(['questionarios']);
      } else if (acao == 'Calendário') {
        this.router.navigate(['calendario']);
      }
  }
}
