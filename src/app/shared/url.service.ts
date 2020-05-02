import { Injectable } from '@angular/core';
import {Observable, from, of, Subject, BehaviorSubject, Subscription} from 'rxjs';
import * as Url from 'url/url.js';

export class SearchParams {
  private _idex: number;
  readonly referrer_url: string;
  readonly utm_source: string;
  readonly utm_medium: string;
  readonly utm_campaign: string;
  readonly utm_term: string;
  readonly utm_content: string;

  constructor(frontUrl?: Url, refUrl?: Url){
    this._idex = frontUrl?.query.idex ?? null;
    this.referrer_url = refUrl?.href ?? "";
    this.utm_source = frontUrl?.query.utm_source ?? "";
    this.utm_medium = frontUrl?.query.utm_medium ?? "";
    this.utm_campaign = frontUrl?.query.utm_campaign ?? "";
    this.utm_term = frontUrl?.query.utm_term ?? "";
    this.utm_content = frontUrl?.query.utm_content ?? "";
  }

  public get idex() : number {
    return this._idex
  }

  public set idex(v : number) {
    this._idex = v;
  }
  
}
  

@Injectable({
  providedIn: 'root'
})
export class UrlService {

  private _frontUrl: Url;
  private _refUrl: Url;
  private _url = Url;

  searchParams: SearchParams;
  getSearchParams: BehaviorSubject<SearchParams> = new BehaviorSubject(this.searchParams);

  constructor() { 
    this._frontUrl = this._url.parse(window.location.href, true);
    if(window.document.referrer) this._refUrl = this._url.parse(window.document.referrer);

    this.searchParams = new SearchParams(this._frontUrl, this._refUrl);
    this.getSearchParams.next(this.searchParams);
  }

  setIdex(idex: number){
    this.searchParams.idex = idex;
    this.getSearchParams.next(this.searchParams)
  }

}
