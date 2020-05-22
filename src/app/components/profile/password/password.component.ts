import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, OnChanges} from '@angular/core';
import { FormBuilder, Validators, ValidatorFn, ValidationErrors, FormControl, FormGroup, FormGroupDirective, NgForm, AbstractControl } from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {DashboardService} from '../../dashboard/dashboard.service';
import {Subscription, Observable, from} from'rxjs';

export class ConfirmFirstPasswordErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (form.dirty || control.dirty || control.touched || isSubmitted));
  }
}

export class ConfirmPasswordErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (form.control.get('password').dirty || control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent implements OnChanges, OnInit, OnDestroy {

  @Input() showAll:boolean;

  @Input() email:string;
  @Input() firstPassword:string;

  @Output() newPassword = new EventEmitter<String>();

  matcherConfirmFirstPassword = new ConfirmFirstPasswordErrorStateMatcher();
  matcherConfirmPassword = new ConfirmPasswordErrorStateMatcher();

  subLang: Subscription;
  lang: string;

  passwordForm = this.fb.group({
    email: [{value : '', disabled: false}, [Validators.required]],
    firstPassword: [{value : '', disabled: false}, []],
    confirmFirstPassword: ['', [this.firstPasswordConfirming]],
    password: ['', [Validators.required, Validators.pattern("^(?=.*[0-9]+.*)(?=.*[a-zA-Z]+.*)[0-9a-zA-Z]{6,}$")]],
    confirmPassword: ['', [this.passwordConfirming]]
  })
 
  emailError: string;
  disabled: boolean = true;

  constructor(
    private fb: FormBuilder,
    private dashboard: DashboardService,
  ) { }

  ngOnChanges(): void{
    this.passwordForm.patchValue({'email': this.email, 'firstPassword': this.firstPassword?this.firstPassword:''});
    this.emailError = this.passwordForm.get('email').errors?.required ? 'для встановлення пароля необхідна електронна пошта':'';
    this.disabled = this.passwordForm.get('email').errors?.required ? true:false;
    // console.log("this.passwordForm.get('email').value: ",this.passwordForm.get('email').value);
    // console.log("this.passwordForm.get('firstPassword').value: ",this.passwordForm.get('firstPassword').value);
  }

  ngOnInit(): void {
    // console.log("strategy: ",this.strategy);
    // console.log("email: ",this.email);
    // console.log("firstPassword: ",this.firstPassword);
    this.subLang = this.dashboard.lang.subscribe(lang => this.lang = lang);

    this.passwordForm.statusChanges.subscribe(ev => {
      console.log('passwordForm.statusChanges: ',ev);
      console.log("confirmFirstPassword.errors: ",this.passwordForm.get('confirmFirstPassword').errors);
      console.log("password.errors: ",this.passwordForm.get('password').errors);
      console.log("confirmPassword.errors: ",this.passwordForm.get('confirmPassword').errors);

      if(ev === 'VALID'){
        console.log('emit: ', this.passwordForm.get('password').value);
        this.newPassword.emit(this.passwordForm.get('password').value);
      }
    })

    this.passwordForm.get('password').valueChanges.subscribe(ev =>{
      this.passwordForm.patchValue({'confirmPassword': undefined});
    })
  }

  firstPasswordConfirming(c: AbstractControl): any {
    if(!c.parent || !c) return;
    const pwd = c.parent.get('firstPassword');
    const cpwd = c.parent.get('confirmFirstPassword');
  
    if(!pwd || !cpwd) return ;
    if (pwd.value !== cpwd.value) {
        return { confirming: true };
    }
  }

  passwordConfirming(c: AbstractControl): any {
    if(!c.parent || !c) return;
    const pwd = c.parent.get('password');
    const cpwd = c.parent.get('confirmPassword');
  
    if(!pwd || !cpwd) return ;
    if (pwd.value !== cpwd.value) {
        return { confirming: true };
    }
  }

  ngOnDestroy():void{
    this.subLang.unsubscribe();
  }

}
