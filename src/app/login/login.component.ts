import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, ValidatorFn, ValidationErrors, FormControl, FormGroup, FormGroupDirective, NgForm } from '@angular/forms';
//import {ErrorStateMatcher} from '@angular/material/core';
import { Router } from '@angular/router';
import {HttpService} from '../shared/http.service'
import {VisitorService} from '../shared/visitor.service'
import { group } from '@angular/animations';
import {Login} from '../shared/visitors.interfaces'

// export class MyErrorStateMatcher implements ErrorStateMatcher {
//   isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
//     const isSubmitted = form && form.submitted;
//     return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
//   }
// }

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
    private http: HttpService,
    private router: Router,
  ) { }

  ngOnInit(): void { 
    this.loginForm.valueChanges.subscribe(_ => {
      this.warning = ''
     });
  }

  login(){
    if(this.loginForm.valid && (this.loginForm.get('email').value !== '' || this.loginForm.get('cellphone').value !== '')){
      this.visitorService.getVisitor(this.loginForm.value)
      // this.http.post(this.loginForm.value, "get").subscribe(data =>{
      //   console.log(data)
      // })
    }
    else this.warning = 'Введіть електронну пошту або телефон'
    
  }

}
