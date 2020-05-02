import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, AfterViewChecked } from '@angular/core';
import {ExhibService, ExhibModel} from './exhib.service';
import {ExhibvisService} from '../../shared/exhibvis.service';
import {VisitorService} from '../../shared/visitor.service'
import { Router } from '@angular/router';
import {UrlService, SearchParams} from '../../shared/url.service';

@Component({
  selector: 'app-exhib',
  templateUrl: './exhib.component.html',
  styleUrls: ['./exhib.component.css']
})
export class ExhibComponent implements OnInit {

  exhibitions: ExhibModel[] = [];

  constructor(
    private exhib: ExhibService,
    private router: Router,
    private urlService: UrlService,
    private visitor: VisitorService,
    private exhibVis: ExhibvisService
  ) { }
  
  ngOnInit(): void {
    this.exhib.getExhibs('2019-09-01')
      .then((data: ExhibModel[])=>{
        console.log(data);
        this.exhibitions = data
      })
      .catch(err => console.log('getExhib Error: ', err))
  }

  imgErrorHandler(event, img) {
    event.target.src = img;
  }
  
  getInvite(idExhib){
    this.urlService.setIdex(idExhib);
    this.visitor.patchCloneVisitorModel(idExhib);
    this.router.navigate(['invite'], {queryParams: {idex: idExhib}});
  }

}
