import { Component, OnInit, Input, Output, EventEmitter, OnDestroy} from '@angular/core';
import {ExhibitionsService, IExhib} from './exhibitions.service';
import { FormBuilder, Validators, ValidatorFn, ValidationErrors, FormControl, FormGroup, FormGroupDirective, NgForm } from '@angular/forms';
import {Subscription, Observable} from'rxjs'; 
import {DashboardService} from '../../dashboard/dashboard.service';

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

  //getExhibitions: Subscription;
 //getAddingExhibitions: Subscription;

  lang: string;
  getLang: Subscription;
 
  exhibitions:IExhib[] = [];
  exhibitionForm:FormGroup = new FormGroup({});

  constructor(
    private exhib:ExhibitionsService,
    private dashboard: DashboardService,
  ) { }
 
  ngOnInit(): void {

    this.getLang = this.dashboard.lang.subscribe(lang => this.lang = lang);
    //if(this.idAddingExhibitions) this.getAddingExhib(this.idAddingExhibitions); 

    this.exhib.getExhibitions().subscribe((data:IExhib[])=>{
      this.exhibitions = data;
      this.exhibitionForm = this.exhib.initForm(this.exhibitions);
      this.exhibitionForm.setValidators(this.exhibitionFormValidator());
      //console.log('exhibition data: ', data);

        
      this.exhibitionForm.patchValue(new UserExhibitions(this.exhib.stringToArr(this.userExhibitions)), {emitEvent: false}); 
      //console.log('exhibitionForm start: ',this.exhibitionForm.value);
    
      if(this.idAddingExhibitions){
        this.exhib.getAddingExhib(this.idAddingExhibitions).subscribe((exhib:[])=>{
          //console.log('AddingExhibitions: ',exhib)
          //this.getAddingExhib(this.idAddingExhibitions);
          //this.exhibitionForm.reset();
          //this.exhibitionForm.patchValue(new UserExhibitions(this.exhib.stringToArr(this.userExhibitions)), {emitEvent: false}); 
          this.exhibitionForm.patchValue(new UserExhibitions(exhib));
          //console.log('exhibitionForm next: ',this.exhibitionForm.value);
        })
      }
      

      this.exhibitionForm.valueChanges.subscribe(ev => {
        //console.log('exhibitionForm.valueChanges: ',ev); 
        this.changeUserExhibitions.emit(this.exhib.objToString(ev));
      })
    })
    
  }

  private exhibitionFormValidator(): ValidatorFn{
    return (group: FormGroup): {[key: string]: any} =>{
      let valid:boolean = false;
      //console.log('------------------------------------------------------');
      for(let key in group.controls){
        //console.log(`${key}: ${group.controls[key].value}`);
        if(group.controls[key].value == true) {
          valid = true;
          break
        }
      } 
      if(valid) return null;
      return {
        custom: 'Потрібно обрати принаймні одну виставку'
      };
    };
  }
  
  // getAddingExhib(id){
  //   this.exhib.getAddingExhib(id)
  // }

  ngOnDestroy(): void{
    //this.getExhibitions.unsubscribe();
    //this.getAddingExhibitions.unsubscribe();
  }
}
