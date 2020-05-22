import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, AfterViewChecked, OnDestroy } from '@angular/core';
import {ExhibService, ExhibModel} from './exhib.service';
import {VisitorService} from '../../shared/visitor.service'
import { Router } from '@angular/router';
import {UrlService, SearchParams} from '../../shared/url.service';
import {DashboardService} from '../dashboard/dashboard.service';
import {Subscription} from 'rxjs';
 
@Component({
  selector: 'app-exhib',
  templateUrl: './exhib.component.html',
  styleUrls: ['./exhib.component.css']
})
export class ExhibComponent implements OnInit, OnDestroy {

  loading: boolean = false;

  exhibitions: ExhibModel[] = [];

  lang: string;
  getLang: Subscription;
 
  constructor(
    private exhib: ExhibService,
    private router: Router,
    private urlService: UrlService,
    private visitor: VisitorService,
    private dashboard: DashboardService,
  ) { }
  
  ngOnInit(): void {
    console.log(this.getCurrentDate());
    this.getLang = this.dashboard.lang.subscribe(lang => this.lang = lang);
    this.loading = true;
    //this.exhib.getExhibs('2019-09-01')
    this.exhib.getExhibs(this.getCurrentDate())
      .then((data: ExhibModel[])=>{
        this.loading = false;
        console.log(data);
        this.exhibitions = data
      })
      .catch(err => console.log('getExhib Error: ', err))
  }

  getCurrentDate(): string{
    let date: string
    let todayDate = new Date();
    let currYear = todayDate.getFullYear();
    let currMonth = todayDate.getMonth()+1;
    let currDay = todayDate.getDate();
    date = currYear + "-" + currMonth + "-" + currDay;
    return date
  }

  imgErrorHandler(event, img) {
    event.target.src = img;
  }
   
  getInvite(idExhib){
    this.loading = true;
    this.urlService.setIdex(idExhib);
    this.visitor.patchCloneVisitorModel(idExhib);
    this.router.navigate(['invite'], {queryParams: {idex: idExhib}});
  }

  ngOnDestroy(){
    this.getLang.unsubscribe();
    this.loading = false;
  }

}
