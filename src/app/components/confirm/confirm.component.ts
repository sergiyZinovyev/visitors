import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute  } from '@angular/router';
import {BehaviorSubject, Subscription} from 'rxjs';
import {DashboardService} from '../dashboard/dashboard.service';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit, OnDestroy {

  lang: string;
  getLang: Subscription;
  getResolveResult: Subscription;

  text: string;
  img: string;
  imgLink: string;

  resolveResult: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dashboard: DashboardService,
  ) {  } 
 
  ngOnInit(): void {
    this.getResolveResult = this.route.data.subscribe((data) => {
      console.log('dataConfirm: ',data['confirmData']);
      this.resolveResult = data['confirmData'];
      switch (data['confirmData']) {
        case 'DONE':
          this.text = "Ви успішно змінили пароль. Увійдіть використовуючи новий пароль";
          this.img = 'smile';
          break;
        case 'Error':
          this.text = "Щось пішло не так. Спробуйте ще раз пізніше";
          this.img = 'sad';
          break;
        default:
          this.text = "Всі необхідні зміни вже були зроблені";
          this.img = 'neutral';
          break;
      }
      this.imgLink = `https://visitors.galexpo.com.ua:7002/static/registration/shared/${this.img}.png`;
    });

    this.getLang = this.dashboard.lang.subscribe(lang => this.lang = lang);
  }

  enter(){
    this.router.navigate(['login'])
  }

  ngOnDestroy():void {
    this.getLang.unsubscribe();
    this.getResolveResult.unsubscribe()
  }
}
