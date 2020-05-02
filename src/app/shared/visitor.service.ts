import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {HttpService} from './http.service';
import {ILogin, IRegion} from './visitors.interfaces';
import {VisitorModel} from '../components/profile/visitor-model'
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
      .then(_ => this.getVisitor({email: body.email, cellphone: body.cellphone}))
  }

  updateVisitor(body: VisitorModel): Promise<any>{
    if(this.compareModels(body)) return new Promise((resolve, reject) => resolve('the model has not changed'))
    return this.crudVisitor(body, 'editPro2')
      .then(_ => this.getVisitor({email: body.email, cellphone: body.cellphone}))
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
 
  createNewModel(data?){
    this.curretnVisitorModel = new VisitorModel(data);
    this.getCurrrentVisitor.next(this.curretnVisitorModel);
  }

  private cloneVisitorModel(){
    return new VisitorModel(this.curretnVisitorModel);
  }

  patchCloneVisitorModel(idex){
    let clon = this.cloneVisitorModel();
    this.http.get(`groupexhib?id=${idex}`).pipe(
      map(vl => vl.map(obj => obj.name))
    ).subscribe(data =>{
      //console.log("clone groupexhib", clon.potvid);
      //console.log("new groupexhib: ", data);
      clon.patchPotvid(data);
      //console.log("patched clone", clon);
      if(clon.regnum)this.updateVisitor(clon).then(_ => console.log("patched groupexhib", this.curretnVisitorModel.potvid)).catch(err => console.log(err))
    })
  }

  setKey(data: ILogin){
    this.createNewModel();
    this.curretnVisitorModel.newEmail = data.email;
    this.curretnVisitorModel.newCellphone = data.cellphone;
    this.getCurrrentVisitor.next(this.curretnVisitorModel);
  }

  private compareModels(newModel: VisitorModel): boolean{
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
