import { Component, OnInit } from '@angular/core'; 
import { Router } from '@angular/router';
import {Observable} from 'rxjs';
import {DashboardService} from './dashboard.service';
import {UrlService, SearchParams} from '../../shared/url.service';
import {VisitorService} from '../../shared/visitor.service'


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  lang:string;  
  searchParamsExhib: number;

  constructor(
    private router: Router,
    private dashboard: DashboardService,
    private urlService: UrlService,
    private visitor: VisitorService
  ) { }
 
  ngOnInit(): void {
    this.dashboard.lang.subscribe(lang => this.lang = lang);
    this.urlService.getSearchParams.subscribe((data:SearchParams) => this.searchParamsExhib = data.idex);
  }

  exit(){
    this.visitor.createNewModel();
    this.urlService.setIdex(null);
    this.router.navigate(['login'])
  }

  setLang(){
    if(this.lang == 'EN') this.dashboard.setLang('UK')
    else this.dashboard.setLang('EN')
  }
}
