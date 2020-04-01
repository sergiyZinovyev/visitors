import { Injectable } from '@angular/core';
import {HttpService} from './../../shared/http.service';
import {Observable, from, of, Subject, BehaviorSubject, Subscription} from 'rxjs';
import { catchError, map} from 'rxjs/operators';
import { FormBuilder, Validators, ValidatorFn, ValidationErrors, FormControl, FormGroup, FormGroupDirective, NgForm } from '@angular/forms';

export interface IExhib{
  id: number,
  name: string,
  kod: 1|0
}

@Injectable({
  providedIn: 'root'
})

export class ExhibitionsService {

  Exhibitions: BehaviorSubject<IExhib[]> = new BehaviorSubject([]);

  constructor(private http: HttpService) {
    this.http.get('db/exhibitions_dict').subscribe((data: IExhib[]) =>{
      this.Exhibitions.next(data)
    });
  }

  selectCurrExhib(allExhib:IExhib[]): IExhib[]{
    let curExhibArr = [];
    allExhib.forEach(exhib =>{
      if(exhib.kod === 1) curExhibArr.push(exhib)
    })
    return curExhibArr
  }

  initForm(exhibitions:IExhib[]):FormGroup{
    let exhibitionForm = new FormGroup({});
    exhibitions.forEach(vl =>{
      exhibitionForm.addControl(vl.name, new FormControl(false, Validators.required))
    })
    return exhibitionForm
  }

}
