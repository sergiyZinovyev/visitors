import { Injectable } from '@angular/core';
import {HttpService} from './http.service';
import { VisitorService} from './visitor.service';
import {UrlService, SearchParams} from './url.service';
import {VisitorModel} from '../components/profile/visitor-model';
import{ExhibService, ExhibModel} from '../components/exhib/exhib.service'


class ExhibvisModel {

  id_exhibition: number;
  id_visitor: number;
  registered: number = 1;
  visited: number = 0;
  date_vis: string = undefined;
  date_reg: string = undefined;
  fake_id: number = 0;
  referrer_url: string;
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_term: string;
  utm_content: string;
  new_visitor: string = undefined;

  //reg: boolean = false;

  constructor(searchParameters: SearchParams, regnum: number) {
    this.id_exhibition = searchParameters.idex;
    this.referrer_url = searchParameters.referrer_url;
    this.utm_source = searchParameters.utm_source;
    this.utm_medium = searchParameters.utm_medium;
    this.utm_campaign = searchParameters.utm_campaign;
    this.utm_term = searchParameters.utm_term;
    this.utm_content = searchParameters.utm_content;
    this.id_visitor = regnum;
  }
    
}
 
@Injectable({
  providedIn: 'root'
})
export class ExhibvisService {

  visitorsData = new ExhibvisModel(this.urlService.searchParams, this.visitor.curretnVisitorModel.regnum);
  errMessage: string;

  constructor(
    private visitor: VisitorService,
    private http: HttpService,
    private urlService: UrlService,
    private exhibition: ExhibService
  ){
    this.visitor.getCurrrentVisitor.subscribe((data: VisitorModel) =>{
      this.visitorsData.id_visitor = data.regnum
    })
    this.http.getErrMessages.subscribe(errMessage =>{
      this.errMessage = errMessage;
    });
  }

  addVisitorToExhib(idex){
    this.errMessage = null;
    this.setExhib(idex);
    return new Promise((resolve, reject)=>{
      //this.visitorsData.reg = false;
      this.http.get(`checkViv/?idVis=${this.visitorsData.id_visitor}&exhib=${this.visitorsData.id_exhibition}`).subscribe(checkData =>{
        if(this.errMessage) return reject(this.errMessage)
        if(checkData[0]) {
          //this.visitorsData.reg = true;
          this.exhibition.getExhib(idex)
            .then((data: ExhibModel)=>{
              return resolve({reg: 'REGISTERED', dataExhibition: data})
            })
            .catch(err => console.log('getExhib Error: ', err)) 
          //return resolve('REGISTERED')
        }
        else {
          this.http.post(this.visitorsData, 'createInExhibition_vis').subscribe(data =>{ 
            if(this.errMessage) return reject(this.errMessage)
            console.log("addVisitorToExhib data: ", data);
            this.exhibition.getExhib(idex)
            .then((data: ExhibModel)=>{
              return resolve({reg: 'NOREGISTERED', dataExhibition: data})
            })
            .catch(err => console.log('getExhib Error: ', err)) 
            //resolve(data)
          })
        }
      })
    })
  }
 
  private setExhib(id){
    this.visitorsData.id_exhibition = id
  }
 
}
