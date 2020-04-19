import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from '../components/login/login.component';
import {VisitorComponent} from '../components/profile/visitor.component';
import {InviteComponent} from '../components/invite/invite.component';
import {ExhibComponent} from '../components/exhib/exhib.component';
import {IsLoggedInGuard} from './is-logged-in.guard';
import {IsExhibGuard} from './is-exhib.guard';


const routes: Routes = [
  { path: '', component: LoginComponent},
  { path: 'login', component: LoginComponent},
  { path: 'visitor', component: VisitorComponent, canActivate: [IsLoggedInGuard]},
  { path: 'invite', component: InviteComponent, canActivate: [IsExhibGuard]},
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
 
