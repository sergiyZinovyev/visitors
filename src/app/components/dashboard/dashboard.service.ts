import { Injectable } from '@angular/core';
import {Observable, from, of, Subject, BehaviorSubject, Subscription} from 'rxjs';
 
@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  lang: BehaviorSubject<'EN'|'UK'> = new BehaviorSubject(this.setStartLang());

  constructor() { 
    console.log('language',this.getLanguage()) 
  }

  private getLanguage(){
    let language = window.navigator ? (window.navigator.language) : "UK";
    return language.substr(0, 2).toUpperCase();
  }

  private setStartLang(): 'EN'|'UK'{
    if(this.getLanguage()==='UK' || this.getLanguage()==='RU') return 'EN'
    else return 'UK'
  }

  setLang(language: 'EN'|'UK'){
    this.lang.next(language)
  }
  
}
  
