import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {HttpService} from './http.service';
import {ILogin, IRegion} from './visitors.interfaces';
import {VisitorModel} from '../visitor/visitor-model'
import {Observable, from, of, Subject, BehaviorSubject, Subscription} from 'rxjs';
import { catchError, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VisitorService {

  curretnVisitorModel:VisitorModel = new VisitorModel();
  getCurrrentVisitor: BehaviorSubject<VisitorModel> = new BehaviorSubject(this.curretnVisitorModel);
  getErrMessages: Subject<string> = new Subject();
  errMessage: string;

  Countries: BehaviorSubject<IRegion[]> = new BehaviorSubject([]);
  Regions: BehaviorSubject<IRegion[]> = new BehaviorSubject([]);
  Cities: BehaviorSubject<IRegion[]> = new BehaviorSubject([]);


  constructor(
    private http: HttpService,
    private router: Router,
  ){ 
    this.http.getErrMessages.subscribe(errMessage =>{
      this.errMessage = errMessage;
      this.getErrMessages.next(this.errMessage);
    });
    this.http.get('region').subscribe((data: IRegion[]) =>{
      this.Countries.next(data)
    })
  }

  getVisitor(body: ILogin){
    this.errMessage = null;
    this.http.post(body, "get").subscribe(data =>{
      if(this.errMessage) return console.log('err: ',this.errMessage);
      console.log(data);
      if(data[0]) this.curretnVisitorModel = new VisitorModel(data[0]);
      this.getCurrrentVisitor.next(this.curretnVisitorModel);
      this.router.navigate(['visitor'])
    })
  }

  createNewModel(){
    this.curretnVisitorModel = new VisitorModel();
  }

  setKey(data: ILogin){
    this.curretnVisitorModel.newEmail = data.email;
    this.curretnVisitorModel.newCellphone = data.cellphone;
  }

  getRegions(countryid){
    this.http.get(`region?countryid=${countryid}`).subscribe((data: IRegion[]) =>{
      this.Regions.next(data);
      this.Cities.next([])
    })
  }

  getCities(countryid, regionid){
    this.http.get(`region?countryid=${countryid}&regionid=${regionid}`).subscribe((data: IRegion[]) =>{
      console.log('Cities: ', data);
      this.Cities.next(data)
    })
  }


}
