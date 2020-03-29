import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import {VisitorService} from '../shared/visitor.service';
import {VisitorModel} from './visitor-model';
import {Subscription} from'rxjs'; 

import { FormBuilder, Validators, ValidatorFn, ValidationErrors, FormControl, FormGroup, FormGroupDirective, NgForm } from '@angular/forms';

@Component({
  selector: 'app-visitor',
  templateUrl: './visitor.component.html',
  styleUrls: ['./visitor.component.css']
})
export class VisitorComponent implements OnInit, OnDestroy{

  getCurrrentVisitor: Subscription;
  getRegion: Subscription; 

  // regions = [{
  //   regionid: '',
  //   teretory: ''
  // }];
  regions = [];

  visitorForm = this.fb.group({
    condition: ['', []],
    table: ['', []],
    checkEmail: [false, []],
    checkPhone: [false, []],

    captcha: [''],

    email: ['', [Validators.email]],
    prizv: ['', [Validators.required]],
    city: ['', [Validators.required]],
    cellphone: ['', [Validators.pattern('380[0-9]{9}')]],
    regnum: ['', []],
    potvid: ['', []],
    name: ['', [Validators.required]],
    countryid: ['', [Validators.required]],
    regionid: ['', [Validators.required]],
    m_robotu: ['', []],
    pobatkovi: ['', []],
    posada: ['', []],
    sferadij: ['', []],
    namepovne: ['', []],
    postindeks: ['', []],
    address: ['', []],
    postaddreses: ['', []],
    telephon: ['', []],
    gender: ['', []],
    type: ['', []],
    kompeten: ['', []],
    datawnesenny: ['', []],
    datelastcor: ['', []],
    rating: ['', []],
    ins_user: ['', []],
  })

  constructor(
    private fb: FormBuilder,
    private visitorService: VisitorService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.getRegion = this.visitorService.getRegion.subscribe(data => {
      console.log('data region: ', data);
      this.regions = data;
    })
    this.getCurrrentVisitor = this.visitorService.getCurrrentVisitor.subscribe((data: VisitorModel) =>{
      this.visitorForm.patchValue(data);
      console.log('visitorForm: ', this.visitorForm.value);
    })
  }

  submit(){}
 
  ngOnDestroy():void{
    this.getCurrrentVisitor.unsubscribe();
    this.getRegion.unsubscribe()
  }
}
