import { Component, OnInit } from '@angular/core'; 
import { Router } from '@angular/router';
import {DashboardService} from './dashboard.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  lang:string;
  // language = window.navigator ? (window.navigator.language ||
  //   window.navigator.NavigatorLanguage.systemLanguage ||
  //   window.navigator.userLanguage) : "ru";
  // language = language.substr(0, 2).toLowerCase();

  constructor(
    private router: Router,
    private dashboard: DashboardService
  ) { }

  ngOnInit(): void {
    this.dashboard.lang.subscribe(lang => this.lang = lang)
  }

  exit(){
    this.router.navigate(['login'])
  }

  setLang(){
    if(this.lang == 'EN') this.dashboard.setLang('UK')
    else this.dashboard.setLang('EN')
  }
}
