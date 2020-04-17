import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component'
import {VisitorComponent} from './visitor/visitor.component'
import {InviteComponent} from './invite/invite.component'
import {ExhibComponent} from './exhib/exhib.component'

const routes: Routes = [
  { path: '', component: LoginComponent},
  { path: 'login', component: LoginComponent},
  { path: 'visitor', component: VisitorComponent},
  { path: 'invite', component: InviteComponent},
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
 
