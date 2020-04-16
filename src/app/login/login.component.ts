import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators, ValidatorFn, ValidationErrors, FormControl, FormGroup, FormGroupDirective, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import {VisitorService} from '../shared/visitor.service';
import {ILogin} from '../shared/visitors.interfaces';
import {UrlService} from './../shared/url.service';
import {DashboardService} from '../dashboard/dashboard.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  warning: string = '';
  loading: boolean = false;
  lang: string;

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
    private urlApp: UrlService
  ) { }

  ngOnInit(): void { 
    this.dashboard.lang.subscribe(lang => this.lang = lang);

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
        .then(data => {
          console.log('login data: ', data);
          this.loading = false;
          this.router.navigate(['visitor'])
        })
        .catch(err => {
          this.loading = false;
          console.log(err)
        });
    }
    else this.warning = 'Введіть електронну пошту або телефон'
  }

  ngOnDestroy(): void {
    this.loading = false;
  }

}
