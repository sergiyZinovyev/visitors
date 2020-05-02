import { Injectable } from '@angular/core';
import {HttpService} from '../../../shared/http.service';
import {Observable, from, of, Subject, BehaviorSubject, Subscription} from 'rxjs';
import { catchError, map} from 'rxjs/operators';
import { FormBuilder, Validators, ValidatorFn, ValidationErrors, FormControl, FormGroup, FormGroupDirective, NgForm } from '@angular/forms';

export interface IExhib{
  id: number,
  name: string,
  kod: 1|0,
  group_exhib: number
}

@Injectable({
  providedIn: 'root'
})

export class ExhibitionsService {

  //Exhibitions: BehaviorSubject<IExhib[]> = new BehaviorSubject([]);
  // AddingExhibitions: BehaviorSubject<string[]> = new BehaviorSubject([]);


  //AddingExhibitions: Subject<string[]> = new Subject();

  constructor(
    private http: HttpService,
    ) {
    // this.http.get('db/exhibitions_dict').subscribe((data: IExhib[]) =>{
    //   this.Exhibitions.next(data)
    // });
    //this.getAddingExhib(this.urlApp.getSearchParam('idex')) 
  }

  getExhibitions(){
    return this.http.get('db/exhibitions_dict')
  }

  initForm(exhibitions:IExhib[]):FormGroup{
    let exhibitionForm = new FormGroup({});
    exhibitions.forEach(vl =>{
      exhibitionForm.addControl(vl.name, new FormControl(false))
    })
    return exhibitionForm
  }

  stringToArr(value: string):string[]{
    if (!value) return; 
    return value.split(', ').filter(value=> {
      if(value != '') return value
    });
  }

  objToString(obj: {}): string{
    let val ='';
    for(let key in obj){
      if(obj[key]) val+=`${key}, `;
      //else val+=`, `
    }
    if(!this.stringToArr(val) || this.stringToArr(val).length == 0) val = ''; 
    return val
  }

  getAddingExhib(id){
    // this.http.get(`groupexhib?id=${id}`).pipe(
    //   map(vl => vl.map(obj => obj.name))
    // ).subscribe(data =>{
    //   console.log("groupexhib: ", data);
    //     this.AddingExhibitions.next(data)      
    // })
    return this.http.get(`groupexhib?id=${id}`).pipe(
      map(vl => vl.map(obj => obj.name))
    )
  }

}
