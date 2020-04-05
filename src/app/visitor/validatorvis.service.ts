import { Injectable } from '@angular/core';
import { catchError, map, tap} from 'rxjs/operators';
import {FormControl, FormGroup} from '@angular/forms';
import {HttpService} from './../shared/http.service'

@Injectable({
  providedIn: 'root'
})
export class ValidatorvisService {

  constructor(
    private server: HttpService
  ) { }

  validEmail(group: FormGroup){
    console.log('validator start');
    console.log(`validcontact?field=email&value=${group.get('email').value}&regnum=${group.get('regnum').value}`);
    return this.server.get(`validcontact?field=email&value=${group.get('email').value}&regnum=${group.get('regnum').value}`).pipe(
      map(response => {
        console.log('data valid: ',response)
        if(response) {
          group.get('email').setErrors(response)
          return response
        }
        else return null
      })
    );
  }

  validCellphone(group: FormGroup){
    console.log('validator2 start');
    console.log(`validcontact?field=cellphone&value=${group.get('cellphone').value}&regnum=${group.get('regnum').value}`);
    return this.server.get(`validcontact?field=cellphone&value=${group.get('cellphone').value}&regnum=${group.get('regnum').value}`).pipe(
      map(response => {
        console.log('data valid2: ',response)
        if(response) {
          group.get('cellphone').setErrors(response)
          return response
        }
        else return null
      })
    );
  }

  getErrors(formGroup: FormGroup, errors: any = {}) {
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

  getErrorsMessages(errors){
    let errorValue;
    let messages = [];
    for (let key in errors){
      if(errors[key] instanceof Object) {
        for (let key2 in errors[key]){
          errorValue = errorValue===true?'поле не заповнене':errors[key][key2]
          messages.push(`${key}: ${errorValue}`)
        }
      }
    }
    return messages
  }

}
