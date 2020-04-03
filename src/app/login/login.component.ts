import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, ValidatorFn, ValidationErrors, FormControl, FormGroup, FormGroupDirective, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import {VisitorService} from '../shared/visitor.service'
import {ILogin} from '../shared/visitors.interfaces'
import {UrlService} from './../shared/url.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  warning: string = '';
  //matcher = new MyErrorStateMatcher();

  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.email]],
    cellphone: ['', [Validators.pattern('380[0-9]{9}')]],
    password: ['']
  })

  constructor(
    private fb: FormBuilder,
    private visitorService: VisitorService,
    private router: Router,
    private urlApp: UrlService
  ) { }

  ngOnInit(): void { 
    this.loginForm.valueChanges.subscribe(_ => {
      this.warning = ''
     });
    this.visitorService.getErrMessages.subscribe(errMessage =>{
      if(errMessage) this.warning = errMessage
    })
  }

  login(){
    if(this.loginForm.valid && (this.loginForm.get('email').value !== '' || this.loginForm.get('cellphone').value !== '')){
      this.visitorService.createNewModel();
      this.visitorService.setKey(this.loginForm.value);
      this.visitorService.getVisitor(this.loginForm.value);
    }
    else this.warning = 'Введіть електронну пошту або телефон'
    
  }

}
