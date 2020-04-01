import { Component, OnInit, Input} from '@angular/core';
import {ExhibitionsService, IExhib} from './exhibitions.service';
import { FormBuilder, Validators, ValidatorFn, ValidationErrors, FormControl, FormGroup, FormGroupDirective, NgForm } from '@angular/forms';

class UserExhibitions {
  constructor(arrayExhib: string[]) {
    if(arrayExhib) arrayExhib.forEach(el =>{
      this[el] = true
    })
  }
}

@Component({
  selector: 'app-exhibitions',
  templateUrl: './exhibitions.component.html',
  styleUrls: ['./exhibitions.component.css']
})
export class ExhibitionsComponent implements OnInit {

  @Input() userExhibitions:string;

  exhibitions:IExhib[] = [];
  exhibitionForm:FormGroup = new FormGroup({});

  constructor(
    private exhib:ExhibitionsService
  ) { }

  ngOnInit(): void {
    this.exhib.Exhibitions.subscribe(data=>{
      //this.exhibitions = this.exhib.selectCurrExhib(data);
      this.exhibitions = data;
      this.exhibitionForm = this.exhib.initForm(this.exhibitions);
      this.exhibitionForm.patchValue(new UserExhibitions(this.stringToArr(this.userExhibitions)), {emitEvent: false})
    })
  }

  stringToArr(value: string):string[]{
    if (!value) return; 
    return value.split(', ').filter(value=> {
      if(value != '') return value
    });
  }




}
