import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {HttpService} from './http.service';
import {ILogin, IRegion} from './visitors.interfaces';
import {VisitorModel} from '../components/profile/visitor-model'
import {Observable, from, of, Subject, BehaviorSubject, Subscription} from 'rxjs';
import { catchError, map} from 'rxjs/operators';
import {DialogService} from '../modals/dialog.service';

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
    private dialog: DialogService
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
    return this.crudVisitor(body, 'getVisitor')
      .then(data => {
        if(data[0])this.createNewModel(data[0]);
        //console.log('curretnVisitorModel: ', this.curretnVisitorModel)
        return data
      })
      //.catch(err => err);
  }
 
  createVisitor(body: VisitorModel): Promise<any>{
    let createBody = new VisitorModel(body);
    createBody.password = this.curretnVisitorModel.password; //передаємо для редагування старий пароль
    console.log("createInVisitorsCreate body: ",createBody);
    return this.crudVisitor(createBody, 'createInVisitorsCreate')
      .then(_ => this.getVisitor({email: body.email, cellphone: body.cellphone, password: body.password}))
      .then(data => {console.log("changePass body: ",body); this.changePass(body, data[0].regnum); return 'ok'}) 
      //.catch(err => err);
  }

  updateVisitor(body: VisitorModel): Promise<any>{
    this.changePass(body);
    if(this.compareModels(body)) return Promise.resolve('the model has not changed');
    body.password = this.curretnVisitorModel.password; //передаємо для редагування старий пароль
    return this.crudVisitor(body, 'editPro2')
      .then(_ => this.getVisitor({email: body.email, cellphone: body.cellphone, password: body.password}))
  }

  private changePass(newVisitorModel, regnum?): void{
    if(newVisitorModel.password === this.curretnVisitorModel.password) return console.log('password not change');
    if(!newVisitorModel.email) {this.dialog.dialogOpen('для встановлення пароля необхідна електронна пошта');return}
    newVisitorModel.firstpassword = this.curretnVisitorModel.password;
    if (regnum) newVisitorModel.regnum = regnum;
    this.dialog.dialogOpen("На вашу пошту буде надісланий електронний лист з підтвердженням пароля, перевірте пошту та підтвердіть пароль");
    this.crudVisitor(newVisitorModel, 'changePass')
      .then(data => {console.log('data changePass:',data)})
      .catch(err=> {console.log('err: ', err); this.dialog.dialogOpen("Вибачте, помилка на сервері, пароль не змінено, спробуйте пізніше")})
  }

  resetPassword(data): void{
    //if(!data.email) return this.dialog.dialogOpen('для встановлення пароля необхідна електронна пошта');
    this.dialog.dialogOpen("На вашу пошту буде надісланий електронний лист з підтвердженням, перевірте пошту та підтвердіть скидання пароля");
    this.crudVisitor(data, 'resetpassword')
      .then(data => {console.log('data resetpassword:',data)})
      .catch(err=> {
        console.log('err: ', err);
        if(JSON.parse(err).resetpassError) this.dialog.dialogOpen("Ви не вказали свою електронну пошту при реєстрації. Пароль не скинуто, для відновлення доступу зверніться до адміністратора")
        else this.dialog.dialogOpen("Вибачте, помилка на сервері, пароль не змінено, спробуйте пізніше")
      })
  }

  private crudVisitor(body:{}, routeName: string): Promise<any>{
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
      if(clon.regnum) this.updateVisitor(clon).then(_ => console.log("patched groupexhib", this.curretnVisitorModel.potvid)).catch(err => console.log(err))
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
        if (key == 'patchPotvid' || key == 'fullName' || key == 'newEmail' || key == 'newCellphone'|| key == 'password') continue
        if(currentModel[key] == newModel[key]){
          //console.log(`${key} -- not changed`)
        }
        else{
          flag = false;
          console.log(`${key}: ${currentModel[key]} => ${newModel[key]} -- changed`)
        }
    }
    console.log(flag); 
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
