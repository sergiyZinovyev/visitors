import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import {VisitorService} from '../../shared/visitor.service';
import {VisitorModel} from './visitor-model';
import {Subscription, Observable, from} from'rxjs';
//import { catchError, map, tap} from 'rxjs/operators';
import {ILogin, IRegion} from '../../shared/visitors.interfaces';
import { FormBuilder, Validators, ValidatorFn, ValidationErrors, FormControl, FormGroup, FormGroupDirective, NgForm, AbstractControl } from '@angular/forms';
import {UrlService, SearchParams} from '../../shared/url.service';
//import {HttpService} from '../../shared/http.service';
//import {ExhibvisService} from '../../shared/exhibvis.service';
import {ValidatorvisService} from './validatorvis.service';
import {DialogService} from '../../modals/dialog.service';
import {DashboardService} from '../dashboard/dashboard.service';


@Component({
  selector: 'app-visitor',
  templateUrl: './visitor.component.html',
  styleUrls: ['./visitor.component.css']
})
export class VisitorComponent implements OnInit, OnDestroy{

  newVisitor: boolean = true;
  warning: string = '';
  submitted: boolean = false;
  loading: boolean = false;
  lang: string;

  subCurrrentVisitor: Subscription;
  subSearchParamsExhib: Subscription;
  subLang: Subscription;
  subErrMessages: Subscription;

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
    // condition: ['', []],
    // table: ['', []],
    checkEmail: [false, []],
    checkPhone: [false, []],

    captcha: [''],

    email: ['', [Validators.email], this.CastomValidator.validEmail.bind(this.CastomValidator)],
    prizv: ['', [Validators.required]],
    city: ['', []],
    cellphone: ['', [Validators.pattern('380[0-9]{9}')], this.CastomValidator.validCellphone.bind(this.CastomValidator)],
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
    sending: ['', []],
    password: ['', []],
  });


  potvid: string = null;
  searchParamsExhib: number;

  patchPotvid(val: string){
    this.visitorForm.patchValue({potvid: val});
  }

  password: string;
  patchPassword(val: string){
    this.visitorForm.patchValue({password: val});
  }

  constructor(
    private fb: FormBuilder,
    private visitorService: VisitorService,
    private router: Router,
    private urlApp: UrlService,
    //private exhib: ExhibvisService,
    private CastomValidator: ValidatorvisService,
    private dialog: DialogService,
    private dashboard: DashboardService,
  ) {}
 
  ngOnInit(): void {

    this.subLang = this.dashboard.lang.subscribe(lang => this.lang = lang);

    this.subSearchParamsExhib = this.urlApp.getSearchParams.subscribe((data:SearchParams)=> {this.searchParamsExhib = data.idex; console.log('searchParamsExhib: ', this.searchParamsExhib)});

    this.visitorForm.setValidators(this.CastomValidator.validContact.bind(this.CastomValidator));
    
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

    this.subCurrrentVisitor = this.visitorService.getCurrrentVisitor.subscribe((data: VisitorModel) =>{
      //console.log('new Model: ',data);
      if(data.regnum) this.newVisitor = false;
      if(data.countryid) this.visitorService.getRegions(data.countryid);
      if(data.countryid && data.regionid) this.visitorService.getCities(data.countryid, data.regionid);
      this.visitorForm.patchValue(data);
      this.potvid = data.potvid;
      this.password = data.password;
    })

    this.visitorForm.get('countryid').valueChanges.subscribe(data => {
      if(data == 1) this.visitorForm.get('regionid').setValidators(Validators.required)
      else this.visitorForm.get('regionid').clearValidators();
      this.visitorForm.get('regionid').updateValueAndValidity();
      this.visitorForm.patchValue({regionid: '', city: ''});
      this.visitorService.getRegions(data);
    });

    this.visitorForm.get('regionid').valueChanges.subscribe(data => {
      this.visitorService.getCities(this.visitorForm.get('countryid').value, data);
    });
 
    this.visitorForm.get('city').valueChanges.subscribe(data => {
      this.filteredCities = this.cities.filter(city => city.teretory.toLowerCase().includes(data.toLowerCase()))
    });

    this.subErrMessages = this.visitorService.getErrMessages.subscribe(errMessage =>{
      if(errMessage) {
        this.loading = false;
        this.warning = errMessage}
    })
  }
 
  getErrorsMessage(formGroup: FormGroup){
    return this.CastomValidator.getErrorsMessages(formGroup)
  }
 
  saveChange(): void{
    console.log('saveChange is work');
    this.submit()
  }

  submit(route?: string): void{
    this.warning = '';
    this.submitted = true;

    if(this.visitorForm.valid){
      this.loading = true;
      if(this.newVisitor) {
        this.visitorService.createVisitor(this.visitorForm.value)
          .then(_ => {
            if(route) return this.router.navigate([route], {queryParams: {idex: this.searchParamsExhib}})
            else {
              this.loading = false;
              this.dialog.dialogOpen("Ваші дані успішно змінені");
              return true
            }
          })
          .then(data => {if(!data)this.loading = false})
          .catch(err => {
            this.loading = false;
            console.log('err: ', err);
          })
      } 
      else {
        this.visitorService.updateVisitor(this.visitorForm.value)
          .then(_ => {
            if(route) return this.router.navigate([route], {queryParams: {idex: this.searchParamsExhib}})
            else {
              this.loading = false;
              this.dialog.dialogOpen("Ваші дані успішно змінені");
              return true
            }
          })
          .then(data=> {if(!data)this.loading = false})
          .catch(err=>{
            this.loading = false;
            console.log('err: ', err);
          })
      }
    }

  }
  
  ngOnDestroy():void{
    this.subCurrrentVisitor.unsubscribe();
    this.getRegions.unsubscribe();
    this.getCountries.unsubscribe();
    this.getCities.unsubscribe();
    this.getBranches.unsubscribe();
    this.subSearchParamsExhib.unsubscribe();
    this.subLang.unsubscribe();
    this.subErrMessages.unsubscribe();

    this.loading = false;
  }
}
