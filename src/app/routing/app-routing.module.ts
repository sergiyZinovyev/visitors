import { NgModule} from '@angular/core';
import { Routes, RouterModule} from '@angular/router';

import {LoginComponent} from '../components/login/login.component';
import {VisitorComponent} from '../components/profile/visitor.component';
import {InviteComponent} from '../components/invite/invite.component';
import {ExhibComponent} from '../components/exhib/exhib.component';
import {ConfirmComponent} from '../components/confirm/confirm.component';

import {IsLoggedInGuard} from './is-logged-in.guard';
import {IsExhibGuard} from './is-exhib.guard';
import {ConfirmResolver} from './confirm-resolser.service';
import {ExhibResolver} from './exhib-resolver.service';
 
const routes: Routes = [
  { path: '', component: LoginComponent},
  { path: 'login', component: LoginComponent},
  { path: 'visitor', component: VisitorComponent, canActivate: [IsLoggedInGuard]},
  { path: 'invite', component: InviteComponent, canActivate: [IsExhibGuard], resolve:{exhibData: ExhibResolver}},
  { path: 'exhibitions', component: ExhibComponent},
  { path: 'confirm', component: ConfirmComponent, resolve:{confirmData: ConfirmResolver}},
  { path: '**', component: LoginComponent},
];
 
@NgModule({
  imports: [RouterModule.forRoot(routes,{
    scrollPositionRestoration: 'top'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }  
 
