import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {HttpService} from './http.service';
import {Login} from './visitors.interfaces'

@Injectable({
  providedIn: 'root'
})
export class VisitorService {

  constructor(
    private http: HttpService,
    private router: Router,
  ) { }

  getVisitor(body: Login){
    this.http.post(body, "get").subscribe(data =>{
      console.log(data)
    })
  }
}
