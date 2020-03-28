import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {HttpService} from './http.service';
import {Login} from './visitors.interfaces';
import {VisitorModel} from '../visitor/VisitorModel'
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

  constructor(
    private http: HttpService,
    private router: Router,
  ){ 
    this.http.getErrMessages.subscribe(errMessage =>{
      this.errMessage = errMessage;
      this.getErrMessages.next(this.errMessage);
    })
  }

  getVisitor(body: Login){
    this.errMessage = null;
    this.http.post(body, "get").subscribe(data =>{
      if(this.errMessage) return console.log('err: ',this.errMessage);
      console.log(data);
      if(data[0]) this.curretnVisitorModel = new VisitorModel(data[0]);
      this.getCurrrentVisitor.next(this.curretnVisitorModel);
      console.log('model: ', this.curretnVisitorModel);
    })
  }

  createNewModel(){
    this.curretnVisitorModel = new VisitorModel();
  }

  setKey(data){
    this.curretnVisitorModel.newEmail = data.email;
    this.curretnVisitorModel.newCellphone = data.cellphone;
  }
}