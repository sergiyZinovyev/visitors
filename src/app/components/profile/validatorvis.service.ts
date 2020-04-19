import { Injectable } from '@angular/core';
import { catchError, map, tap} from 'rxjs/operators';
import {FormControl, FormGroup, ValidatorFn, AbstractControl} from '@angular/forms';
import {HttpService} from '../../shared/http.service';
import {VisitorService} from '../../shared/visitor.service';

@Injectable({
  providedIn: 'root'
})
export class ValidatorvisService {

  constructor(
    private server: HttpService,
    private visitorService: VisitorService,
  ) { }

  set = new Set();

  validEmail(control: AbstractControl, errName: string = 'validEmail', err = {}){
    //console.log('validEmail: start');
    return this.server.get(`validcontact?field=email&value=${control.value}&regnum=${this.visitorService.curretnVisitorModel.regnum}`).pipe(
      map(response => {
        //console.log('validEmail: ', response);
        if(response) {
          this.set.add(errName);
          err[errName] = 'Така електронна пошта вже існує, вкажіть іншу';
          return err
        }
        else return null
      })
    );
  }

  validCellphone(control: AbstractControl, errName: string = 'validCellphone', err = {}){
    //console.log('validCellphone: start');
    return this.server.get(`validcontact?field=cellphone&value=${control.value}&regnum=${this.visitorService.curretnVisitorModel.regnum}`).pipe(
      map(response => {
        //console.log('validCellphone: ', response);
        if(response) {
          this.set.add(errName);
          err[errName] = 'Такий телефон вже існує, вкажіть інший';
          return err
        }
        return null
      })
    );
  }

  validExhibition(control: AbstractControl, errName: string = 'validExhibition', err = {}): {[key: string]: any} | null{
    this.set.add(errName);
    err[errName] = 'Потрібно обрати принаймні одну виставку';
    if(!control.value) return err;
    let arr: Array<string> = control.value.split(', ').filter((val:string) => val != '')
    if(arr.length > 0) return null;
    else return err
  }

  validContact(group: FormGroup, errName: string = 'validContact', err = {}): {[key: string]: any}{
    //console.log('validContact: start');
   
      this.set.add(errName);
      err[errName] = 'Потрібно заповнити або телефон або email';
      //console.log('cellphone', group.get('cellphone').value);
      //console.log('email', group.get('email').value);
      if(!group.get('cellphone').value && !group.get('email').value){
        //console.log(err);
        return err
      }
      else {
        //console.log('null');
        return null
      }
    
  }

  private getErrors(formGroup: FormGroup, errors: any = {}):Object {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        if(control.errors)errors[field] = control.errors
        else errors[field] = null;
      } else if (control instanceof FormGroup) {
        errors[field] = this.getErrors(control);
      }
    });
    return errors;
  }

  getErrorsMessages(formGroup: FormGroup){
    let errors = this.getErrors(formGroup)
    let messages = new Set();
    for (let key in errors){
      if(errors[key] instanceof Object) {
        for (let errName in errors[key]){
          if(this.set.has(errName))
          messages.add(errors[key][errName])
        }
      }
    }
    return messages
  }

}
