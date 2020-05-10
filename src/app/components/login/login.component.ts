import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators, ValidatorFn, ValidationErrors, FormControl, FormGroup, FormGroupDirective, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import {VisitorService} from '../../shared/visitor.service';
import {ILogin} from '../../shared/visitors.interfaces';
import {DashboardService} from '../dashboard/dashboard.service';
import {Subscription} from 'rxjs';
import {DialogService} from '../../modals/dialog.service';
 
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  warning: string = '';
  loading: boolean = false;
  lang: string;
  getLang: Subscription;

  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.email]],
    cellphone: ['', [Validators.pattern('380[0-9]{9}')]],
    password: ['']
  })

  constructor(
    private fb: FormBuilder,
    private visitorService: VisitorService,
    private router: Router,
    private dashboard: DashboardService,
    private dialog: DialogService,
  ) { }

  ngOnInit(): void { 
    this.getLang = this.dashboard.lang.subscribe(lang => this.lang = lang);

    this.loginForm.valueChanges.subscribe(_ => {
      this.warning = ''
     });

    this.visitorService.getErrMessages.subscribe(errMessage =>{
      if(errMessage) this.warning = errMessage
    })

  }
  
  login(){
    if(this.loginForm.valid && (this.loginForm.get('email').value !== '' || this.loginForm.get('cellphone').value !== '')){
      this.loading = true;
      this.visitorService.setKey(this.loginForm.value);
      this.visitorService.getVisitor(this.loginForm.value)
        .then((data: Array<any>) => {
          console.log('login data: ', data);
          this.loading = false;
          if(data.length < 1){ this.dialog.confirmOpen('Зареєструйтесь будь ласка, або, якщо ви вже реєструвалися, натисніть Сancel та вкажить інший телефон чи e-mail','visitor')}
          else if(data[0] === 'incorrect password') this.dialog.dialogOpen('Невірний пароль')
          else this.router.navigate(['visitor'])
        })
        .catch(err => {
          this.loading = false;
          console.log(err)
        });
    }
    else this.warning = 'Введіть електронну пошту або телефон'
  }

  ngOnDestroy(): void {
    this.getLang.unsubscribe();
    this.loading = false;
  }

}
