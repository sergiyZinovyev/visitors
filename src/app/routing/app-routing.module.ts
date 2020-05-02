import { NgModule, Injectable } from '@angular/core';
import { Routes, RouterModule, ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import {LoginComponent} from '../components/login/login.component';
import {VisitorComponent} from '../components/profile/visitor.component';
import {InviteComponent} from '../components/invite/invite.component';
import {ExhibComponent} from '../components/exhib/exhib.component';
import {IsLoggedInGuard} from './is-logged-in.guard';
import {IsExhibGuard} from './is-exhib.guard';
import {ExhibvisService} from '../shared/exhibvis.service';
import {Subscription, Observable, from} from'rxjs';
 
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
 
const routes: Routes = [
  { path: '', component: LoginComponent},
  { path: 'login', component: LoginComponent},
  { path: 'visitor', component: VisitorComponent, canActivate: [IsLoggedInGuard]},
  { path: 'invite', component: InviteComponent, canActivate: [IsExhibGuard], resolve:{exhibData: ExhibResolver}},
  { path: 'exhibitions', component: ExhibComponent},
  { path: '**', component: LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    scrollPositionRestoration: 'top'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }  
 
