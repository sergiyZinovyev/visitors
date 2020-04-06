import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import {VisitorService} from '../shared/visitor.service';
import {VisitorModel} from './visitor-model';
import {Subscription, Observable, from} from'rxjs';
import { catchError, map, tap} from 'rxjs/operators';
import {ILogin, IRegion} from '../shared/visitors.interfaces';
import { FormBuilder, Validators, ValidatorFn, ValidationErrors, FormControl, FormGroup, FormGroupDirective, NgForm, AbstractControl } from '@angular/forms';
import {UrlService} from './../shared/url.service';
import {HttpService} from './../shared/http.service';
import {ValidatorvisService} from './validatorvis.service';

@Component({
  selector: 'app-visitor',
  templateUrl: './visitor.component.html',
  styleUrls: ['./visitor.component.css']
})
export class VisitorComponent implements OnInit, OnDestroy{

  newVisitor: boolean = true;

  getCurrrentVisitor: Subscription;

  getCountries: Subscription;
  countries: IRegion[];
  filteredCountries: IRegion[];

  getRegions: Subscription;
  regions: IRegion[];
  filteredRegions: IRegion[];

  getCities: Subscription;
  cities: IRegion[];
  filteredCities: IRegion[];

  getBranches: Subscription;
  branches: [];
  filteredBranches: [];

  visitorForm = this.fb.group({
    condition: ['', []],
    table: ['', []],
    checkEmail: [false, []],
    checkPhone: [false, []],

    captcha: [''],

    email: ['', [Validators.required]],
    prizv: ['', [Validators.required]],
    city: ['', []],
    cellphone: ['', [Validators.required, Validators.pattern('380[0-9]{9}')]],
    regnum: ['', []],
    potvid: ['', [this.CastomValidator.validExhibition.bind(this.CastomValidator)]],
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
  },  {
    asyncValidator: [
      this.CastomValidator.validEmail.bind(this.CastomValidator), 
      this.CastomValidator.validCellphone.bind(this.CastomValidator)
    ]
  });

  potvid: string = null;
  searchParamsExhib = this.urlApp.getSearchParam('idex');
  patchPotvid(val: string){
    this.visitorForm.patchValue({potvid: val});
  }

  constructor(
    private fb: FormBuilder,
    private visitorService: VisitorService,
    private router: Router,
    private urlApp: UrlService,
    private server: HttpService,
    private CastomValidator: ValidatorvisService
  ) {}

  ngOnInit(): void {
    this.getCountries = this.visitorService.Countries.subscribe(data=>{
      this.filteredCountries = data;
      this.countries = data;
    });

    this.getRegions = this.visitorService.Regions.subscribe(data=>{
      this.filteredRegions = data;
      this.regions = data;
    });

    this.getCities = this.visitorService.Cities.subscribe(data=>{
      this.filteredCities = data;
      this.cities = data;
    });

    this.getBranches = this.visitorService.Branches.subscribe(data=>{
      this.filteredBranches = data;
      this.branches = data;
    });

    this.getCurrrentVisitor = this.visitorService.getCurrrentVisitor.subscribe((data: VisitorModel) =>{
      if(data.regnum) this.newVisitor = false;
      this.visitorForm.patchValue(data, {emitEvent: false});
      this.potvid = data.potvid;
      if(data.countryid) this.visitorService.getRegions(data.countryid);
      if(data.countryid && data.regionid) this.visitorService.getCities(data.countryid, data.regionid);
    })

    this.visitorForm.get('countryid').valueChanges.subscribe(data => {
      this.visitorForm.patchValue({regionid: '', city: ''});
      this.visitorService.getRegions(data);
    });

    this.visitorForm.get('regionid').valueChanges.subscribe(data => {
      this.visitorForm.patchValue({city: ''});
      this.visitorService.getCities(this.visitorForm.get('countryid').value, data);
    });

    this.visitorForm.get('city').valueChanges.subscribe(data => {
      this.filteredCities = this.cities.filter(city => city.teretory.toLowerCase().includes(data.toLowerCase()))
    });
  }

  

  getErrors(formGroup: FormGroup, errors: any = {}) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        if(control.errors)errors[field] = control.errors
        else errors[field] = null;
      } else if (control instanceof FormGroup) {
        errors[field] = this.getErrors(control);
      }
    });
    return errors;
  }

  // getErrorsMessages(errors){
  //   let errorValue;
  //   let messages = [];
  //   for (let key in errors){
  //     if(errors[key] instanceof Object) {
  //       for (let key2 in errors[key]){
  //         errorValue = errorValue===true?'поле не заповнене':errors[key][key2]
  //         messages.push(`${key}: ${errorValue}`)
  //       }
  //     }
  //   }
  //   return messages
  // }

  getErrorsMessage(formGroup: FormGroup):Array<string>{
    return this.CastomValidator.getErrorsMessages(formGroup)
  }

  // patch(obj: {}){
  //   return new Promise((resolve, reject) => {
  //     this.visitorForm.patchValue(obj);
  //     return resolve(obj)
  //   })
  // }

  submit(){
    //this.visitorForm.patchValue({potvid: this.potvid});

    console.log('visitorForm: ', this.visitorForm.value);
    console.log('visitorForm errors: ', this.getErrors(this.visitorForm));
    console.log('visitorForm messages: ', this.getErrorsMessage(this.visitorForm));
    console.log('visitorForm status: ', this.visitorForm.status);
    if(this.visitorForm.valid){
      console.log('!!! visitorForm valid !!!');
    }

  }
 
  ngOnDestroy():void{
    this.getCurrrentVisitor.unsubscribe();
    this.getRegions.unsubscribe();
    this.getCountries.unsubscribe();
    this.getCities.unsubscribe();
    this.getBranches.unsubscribe()
  }
}
