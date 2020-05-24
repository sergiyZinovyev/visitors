import { Injectable } from '@angular/core';
import { Routes, RouterModule, ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import {Subscription, Observable, from} from'rxjs';
import {ExhibvisService} from '../shared/exhibvis.service';

@Injectable({ providedIn: 'root' })
export class ExhibResolver implements Resolve<any> {
  constructor(
    private service: ExhibvisService,
  ) {}
    
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any>|Promise<any>|any {
    //console.log('route: ',route);
    //console.log('state: ',state);
    return this.service.addVisitorToExhib(route.queryParams.idex);
  }
}
