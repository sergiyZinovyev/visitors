import { Injectable, Inject } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, from } from 'rxjs';
import {VisitorService} from '../shared/visitor.service';
import {DialogService} from '../modals/dialog.service';

 
@Injectable({
  providedIn: 'root'
})
export class IsLoggedInGuard implements CanActivate {

  constructor(
    @Inject(VisitorService) private visitor: VisitorService,
    private dialog: DialogService,
    ){}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this.visitor.curretnVisitorModel.email || this.visitor.curretnVisitorModel.cellphone) return true;
    this.dialog.confirmOpen('Зареєструйтесь будь ласка', 'login');
    return false;
  }
  
}
 