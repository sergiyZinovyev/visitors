import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
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

  Branches: BehaviorSubject<[]> = new BehaviorSubject([]);

  Countries: BehaviorSubject<IRegion[]> = new BehaviorSubject([]);
  Regions: BehaviorSubject<IRegion[]> = new BehaviorSubject([]);
  Cities: BehaviorSubject<IRegion[]> = new BehaviorSubject([]);


  constructor(
    private http: HttpService,
  ){
    this.http.getErrMessages.subscribe(errMessage =>{
      this.errMessage = errMessage;
      this.getErrMessages.next(this.errMessage);
    });
    this.http.get('region').subscribe((data: IRegion[]) =>{
      this.Countries.next(data)
    });
    this.http.get('branch').pipe(
      map(vl => vl.map(obj => obj.branch))
    ).subscribe(data =>{
      this.Branches.next(data)
    })
  }

  getVisitor(body: ILogin): Promise<any>{
    return this.crudVisitor(body, 'get')
      .then(data => {
        if(data[0])this.createNewModel(data[0]);
        return data
      })
  }

  createVisitor(body: VisitorModel): Promise<any>{
    return this.crudVisitor(body, 'createInVisitorsCreate')
  }

  updateVisitor(body: VisitorModel): Promise<any>{
    return this.crudVisitor(body, 'editPro2')
  }

  private crudVisitor(body:{}, routeName: string){
    this.errMessage = null;
    return new Promise((resolve, reject) =>{
      this.http.post(body, routeName).subscribe(data =>{
        if(this.errMessage) return reject(this.errMessage)
        return resolve(data)
      })
    })
  }

  private createNewModel(data?){
    this.curretnVisitorModel = new VisitorModel(data);
    this.getCurrrentVisitor.next(this.curretnVisitorModel);
  }

  setKey(data: ILogin){
    this.createNewModel();
    this.curretnVisitorModel.newEmail = data.email;
    this.curretnVisitorModel.newCellphone = data.cellphone;
    this.getCurrrentVisitor.next(this.curretnVisitorModel);
  }

  compareModels(newModel: VisitorModel): boolean{
    let currentModel = this.curretnVisitorModel
    let flag = true
    for (let key in currentModel){
        if(currentModel[key] == newModel[key]){
          //console.log(key, ': not changed')
        }
        else{
          flag = false;
          //console.log(key, ': changed')
        }
    }
    //console.log(flag);
    return flag;
  }

  getRegions(countryid){
    this.http.get(`region?countryid=${countryid}`).subscribe((data: IRegion[]) =>{
      this.Regions.next(data);
      this.Cities.next([])
    })
  }

  getCities(countryid, regionid){
    if(regionid>0){
      this.http.get(`region?countryid=${countryid}&regionid=${regionid}`).subscribe((data: IRegion[]) =>{
        this.Cities.next(data)
      })
    }
  }


}
