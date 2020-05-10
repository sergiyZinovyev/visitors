import { Component, OnInit, OnDestroy, Input, Output, EventEmitter} from '@angular/core';
import { FormBuilder, Validators, ValidatorFn, ValidationErrors, FormControl, FormGroup, FormGroupDirective, NgForm, AbstractControl } from '@angular/forms';
import {DashboardService} from '../../dashboard/dashboard.service';
import {Subscription, Observable, from} from'rxjs';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent implements OnInit, OnDestroy {

  @Output() newPassword = new EventEmitter<String>();

  subLang: Subscription;
  lang: string;

  passwordForm = this.fb.group({
    password: ['', []],
    confirmPassword: ['', []]
  })

  constructor(
    private fb: FormBuilder,
    private dashboard: DashboardService,
  ) { }
 
  ngOnInit(): void {
    this.subLang = this.dashboard.lang.subscribe(lang => this.lang = lang);

    this.passwordForm.valueChanges.subscribe(ev => {
      //console.log('passwordForm.valueChanges: ',ev);
      if(ev.password === ev.confirmPassword) {
        console.log('emit: ', this.passwordForm.get('password').value);
        this.newPassword.emit(this.passwordForm.get('password').value);
      } 
    })
  }

  ngOnDestroy():void{
    this.subLang.unsubscribe();
  }

}
