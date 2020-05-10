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
    this.getLang = this.dashboard.lang.subscribe(lang => this.lang = lang);
    this.exhib.getExhibs('2019-09-01')
      .then((data: ExhibModel[])=>{
        console.log(data);
        this.exhibitions = data
      })
      .catch(err => console.log('getExhib Error: ', err))
  }

  imgErrorHandler(event, img) {
    event.target.src = img;
  }
   
  getInvite(idExhib){
    this.urlService.setIdex(idExhib);
    this.visitor.patchCloneVisitorModel(idExhib);
    this.router.navigate(['invite'], {queryParams: {idex: idExhib}});
  }

  ngOnDestroy(){
    this.getLang.unsubscribe();
  }

}
