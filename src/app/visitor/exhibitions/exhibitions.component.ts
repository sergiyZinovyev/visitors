import { Component, OnInit, Input, Output, EventEmitter, OnDestroy} from '@angular/core';
import {ExhibitionsService, IExhib} from './exhibitions.service';
import { FormBuilder, Validators, ValidatorFn, ValidationErrors, FormControl, FormGroup, FormGroupDirective, NgForm } from '@angular/forms';
import {Subscription, Observable} from'rxjs'; 
import { group } from '@angular/animations';
import {UrlService} from './../../shared/url.service'

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
export class ExhibitionsComponent implements OnInit, OnDestroy {

  @Input() userExhibitions:string;
  @Input() idAddingExhibitions:string;
  @Output() changeUserExhibitions = new EventEmitter<String>();

  getExhibitions: Subscription;

  exhibitions:IExhib[] = [];
  exhibitionForm:FormGroup;

  constructor(
    private exhib:ExhibitionsService,
    private urlApp: UrlService
  ) { }

  ngOnInit(): void {

    this.getAddingExhib(this.idAddingExhibitions);

    this.getExhibitions = this.exhib.Exhibitions.subscribe((data:IExhib[])=>{
      this.exhibitions = data;
      this.exhibitionForm = this.exhib.initForm(this.exhibitions);
      this.exhibitionForm.setValidators(this.exhibitionFormValidator());
      
      this.exhib.AddingExhibitions.subscribe((exhib:[])=>{
        //console.log('AddingExhibitions: ',exhib)
        this.exhibitionForm.reset();
        this.exhibitionForm.patchValue(new UserExhibitions(this.exhib.stringToArr(this.userExhibitions)), {emitEvent: false}); 
        this.exhibitionForm.patchValue(new UserExhibitions(exhib));
      })

      this.exhibitionForm.valueChanges.subscribe(ev => {
        //console.log('exhibitionForm.valueChanges: ',ev);
        this.changeUserExhibitions.emit(this.exhib.objToString(ev));
      })
    })
    
  }

  private exhibitionFormValidator(): ValidatorFn{
    return (group: FormGroup): {[key: string]: any} =>{
      let valid:boolean = false;
      for(let key in group.controls){
        if(group.controls[key].value == true) {
          valid = true;
          break
        }
      }
      if(valid)return null;
      return {
        custom: 'Потрібно обрати принаймі одну виставку'
      };
    };
  }
 
  getAddingExhib(id){
    this.exhib.getAddingExhib(id)
  }

  ngOnDestroy(): void{
    this.getExhibitions.unsubscribe();
  }
}
