import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UrlService {

  frontUrl: URL;
  refUrl: URL;

  constructor() { 
    this.frontUrl = this.setUrl(window.location.href);
    if(window.document.referrer)this.refUrl = this.setUrl(window.document.referrer);
    console.log('frontUrl0: ', this.frontUrl)
  }

  private setUrl(url: string): URL{
    return new URL(url)
  }

  getSearchParam(param: string){
    return this.frontUrl.searchParams.get(param)
  }
}
