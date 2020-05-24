import { Injectable } from '@angular/core';
import { Routes, RouterModule, ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import {Subscription, Observable, from} from'rxjs';
import {HttpService} from '../shared/http.service'

@Injectable({ providedIn: 'root' })
export class ConfirmResolver implements Resolve<any> {

  errMessage: string;

  constructor(
    private service: HttpService,
  ) {
    //this.service.getErrMessages.subscribe(errMessage => this.errMessage = errMessage)
  }
    
  resolve(route: ActivatedRouteSnapshot): Observable<any>|Promise<any>|any {
    console.log('route: ',route);
    return this.service.get(`setpassword/?regnum=${route.queryParams.regnum}&password=${route.queryParams.password}&firstpassword=${route.queryParams.firstpassword}`);
  }

  // private crudVisitor(body:{}, routeName: string): Promise<any>{
  //   this.errMessage = null;
  //   return new Promise((resolve, reject) =>{
  //     this.service.post(body, routeName).subscribe(data =>{
  //       if(this.errMessage) return reject(this.errMessage)
  //       return resolve(data)
  //     })
  //   })
  // }
} 
