import { Injectable, Inject } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, from } from 'rxjs';
import {ExhibvisService} from '../shared/exhibvis.service';
import {VisitorService} from '../shared/visitor.service';
import {DialogService} from '../modals/dialog.service';

@Injectable({
  providedIn: 'root'
})
export class IsExhibGuard implements CanActivate {
  constructor(
    @Inject(ExhibvisService) private exhib: ExhibvisService,
    @Inject(VisitorService) private visitor: VisitorService,
    private dialog: DialogService,
    ){}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this.visitor.curretnVisitorModel.regnum) {
      if(this.exhib.visitorsData.id_exhibition) return true;
      this.dialog.confirmOpen('Оберіть виставку', 'exhibitions');
      return false;
    };
    this.dialog.confirmOpen('Зареєструйтесь будь ласка', 'login');
    return false;
  }
   
}
