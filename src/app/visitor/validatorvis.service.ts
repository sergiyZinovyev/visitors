import { Injectable } from '@angular/core';
import { catchError, map, tap} from 'rxjs/operators';
import {FormControl, FormGroup, ValidatorFn, AbstractControl} from '@angular/forms';
import {HttpService} from './../shared/http.service'

@Injectable({
  providedIn: 'root'
})
export class ValidatorvisService {

  constructor(
    private server: HttpService
  ) { }

  set = new Set();

  validEmail(group: FormGroup, errName: string = 'validEmail', err = {}){
    return this.server.get(`validcontact?field=email&value=${group.get('email').value}&regnum=${group.get('regnum').value}`).pipe(
      map(response => {
        if(response) {
          this.set.add(errName);
          err[errName] = 'Така електронна пошта вже існує, вкажіть іншу';
          group.get('email').setErrors(err)
          return response
        }
        else return null
      })
    );
  }

  validCellphone(group: FormGroup, errName: string = 'validCellphone', err = {}){
    return this.server.get(`validcontact?field=cellphone&value=${group.get('cellphone').value}&regnum=${group.get('regnum').value}`).pipe(
      map(response => {
        if(response) {
          this.set.add(errName);
          err[errName] = 'Такий телефон вже існує, вкажіть інший';
          group.get('cellphone').setErrors(err)
          return response
        }
        else return null
      })
    );
  }

  validExhibition(control: AbstractControl, errName: string = 'validExhibition', err = {}): {[key: string]: any} | null{
    this.set.add(errName);
    err[errName] = 'Потрібно обрати принаймі одну виставку';
    if(!control.value) return err;
    let arr: Array<string> = control.value.split(', ').filter((val:string) => val != '')
    if(arr.length > 0) return null;
    else return err
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

  getErrorsMessages(formGroup: FormGroup):Array<string>{
    let errors = this.getErrors(formGroup)
    let messages = [];
    for (let key in errors){
      if(errors[key] instanceof Object) {
        for (let errName in errors[key]){
          if(this.set.has(errName))
          messages.push(errors[key][errName])
        }
      }
    }
    return messages
  }

}
