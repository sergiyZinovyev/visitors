import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {VisitorService} from '../shared/visitor.service'
import { FormBuilder, Validators, ValidatorFn, ValidationErrors, FormControl, FormGroup, FormGroupDirective, NgForm } from '@angular/forms';

@Component({
  selector: 'app-visitor',
  templateUrl: './visitor.component.html',
  styleUrls: ['./visitor.component.css']
})
export class VisitorComponent implements OnInit {


  constructor(
    private fb: FormBuilder,
    private visitorService: VisitorService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }
 
}
