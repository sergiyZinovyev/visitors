import { Component, OnInit, OnDestroy } from '@angular/core';
import {DashboardService} from '../dashboard/dashboard.service';
import {Subscription, Observable, from} from'rxjs';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit, OnDestroy {

  subLang: Subscription;
  lang: string;

  constructor(
    private dashboard: DashboardService,
  ) { }
 
  ngOnInit(): void {
    this.subLang = this.dashboard.lang.subscribe(lang => this.lang = lang);
  }

  ngOnDestroy():void {
    this.subLang.unsubscribe();
  }
}
