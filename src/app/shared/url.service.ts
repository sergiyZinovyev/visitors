import { Injectable } from '@angular/core';

export class SearchParams {
  constructor(
    public idex: number = null,
    public referrer_url: string = '',
    public utm_source: string = '',
    public utm_medium: string = '',
    public utm_campaign: string = '',
    public utm_term: string = '',
    public utm_content: string = '',
  ){}
}

@Injectable({
  providedIn: 'root'
})
export class UrlService {

  private _frontUrl: URL;
  private _refUrl: URL;
  private params = new SearchParams();

  constructor() { 
    this._frontUrl = this.setUrl(window.location.href);
    if(window.document.referrer) this._refUrl = this.setUrl(window.document.referrer);
    console.log('frontUrl0: ', this._frontUrl)
  }

  private setUrl(url: string): URL{
    return new URL(url)
  }

  public get refUrl() : string {
    if(this._refUrl)return this._refUrl.href
    else return ''
  }

  public get frontUrl() : string {
    if(this._frontUrl)return this._frontUrl.href
    else return ''
  }
    
  getSearchParam(param: string){
    return this._frontUrl.searchParams.get(param)
  }

  getAllSearch(): SearchParams{
    this.params.referrer_url = this.refUrl;
    this._frontUrl.searchParams.forEach((value, key)=>{
      if(Object.keys(this.params).includes(key)) this.params[key] = value;
    })
    return this.params
  }

}
