import { Injectable } from '@angular/core';
import {HttpService} from './http.service';
import { VisitorService} from './visitor.service'

@Injectable({
  providedIn: 'root'
})
export class ExhibvisService {

  constructor(
    private visitor: VisitorService,
    private http: HttpService,
  ) { }

  addVisitorToExhib(){
    console.log('add visitor to exhibition')
  }
}
