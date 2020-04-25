import { Injectable } from '@angular/core';
import {HttpService} from '../../shared/http.service';
import {catchError, map} from 'rxjs/operators';

export class ExhibModel {
  numexhib: number;
  name: string;
  description: string;
  datebegin: Date;
  dateend: Date;
  img: string;
  altImg: string;
  logoImg: string;
  altLogoImg: string;
  site: string; 

  constructor(exhibData, dbUrl: string) {
    this.numexhib = exhibData?.numexhib ?? null;
    this.name = exhibData?.nameexhibkor ?? "";
    this.description = exhibData?.description ?? "";
    this.datebegin = exhibData?.datebegin ?? "";
    this.dateend = exhibData?.dateend ?? "";
    this.img = `${dbUrl}/static/registration/exhibitions/${exhibData?.numexhib}.png` ?? "";
    this.altImg = `${dbUrl}/static/registration/exhibitions/000.png` ?? "";
    this.logoImg = `${dbUrl}/static/registration/exhibitions/logo${exhibData?.numexhib}.png` ?? "";
    this.altLogoImg = `${dbUrl}/static/registration/exhibitions/logo000.png` ?? "";
    this.site = exhibData?.site != '' ? exhibData?.site : "http://www.galexpo.com.ua";
  }
}

@Injectable({
  providedIn: 'root'
})
export class ExhibService {

  errMessage: string;
  exhibitions: ExhibModel[];

  constructor(
    private http: HttpService,
  ) {
    this.http.getErrMessages.subscribe(errMessage =>{
      this.errMessage = errMessage;
    });
  }

  getExhibs(date){
    this.errMessage = null;
    return new Promise((resolve, reject) =>{
      this.http.get(`getexhibitions?date=${date}`).pipe(
        map(vl => vl.map(obj => new ExhibModel(obj, this.http.dbUrl)))
      ).subscribe(data =>{
        if(this.errMessage) return reject(this.errMessage)
        return resolve(data)
      })
    })
  }
 
  getExhib(id){
    this.errMessage = null;
    return new Promise((resolve, reject) =>{
      this.http.get(`getexhibition?id=${id}`).pipe(
        map(vl => new ExhibModel(vl[0], this.http.dbUrl))
      ).subscribe(data =>{
        if(this.errMessage) return reject(this.errMessage)
        return resolve(data)
      })
    })
  }
 
}
