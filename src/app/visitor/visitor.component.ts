import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import {VisitorService} from '../shared/visitor.service';
import {VisitorModel} from './visitor-model';
import {Subscription, Observable} from'rxjs';
import { catchError, map, tap} from 'rxjs/operators';
import {ILogin, IRegion} from '../shared/visitors.interfaces';
import { FormBuilder, Validators, ValidatorFn, ValidationErrors, FormControl, FormGroup, FormGroupDirective, NgForm, AbstractControl } from '@angular/forms';
import {UrlService} from './../shared/url.service'
import {HttpService} from './../shared/http.service'

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

    email: ['', [Validators.email], [this.validcontact.bind(this)]],
    prizv: ['', [Validators.required]],
    city: ['', []],
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

  potvid: string = this.visitorForm.get('potvid').value;
  searcParamsExhib = this.urlApp.getSearchParam('idex')

  constructor(
    private fb: FormBuilder,
    private visitorService: VisitorService,
    private router: Router,
    private urlApp: UrlService,
    private server: HttpService
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

  patchPotvid(val: string){
    this.potvid = val
  }

  private validcontact(control: FormControl){
    return this.server.get(`validcontact?field=email&value=${control.value}&regnum=1`).pipe(
      map(response => {
        return response ? response : null;
      })
    );
  }

  submit(){
    this.visitorForm.patchValue({potvid: this.potvid})
    console.log('visitorForm: ', this.visitorForm.value);
    console.log('email errors: ', this.visitorForm.get('email').errors);
    console.log('email: ', this.visitorForm.get('email').status);
  }
 
  ngOnDestroy():void{
    this.getCurrrentVisitor.unsubscribe();
    this.getRegions.unsubscribe();
    this.getCountries.unsubscribe();
    this.getCities.unsubscribe();
    this.getBranches.unsubscribe()
  }
}
