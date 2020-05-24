import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy} from '@angular/core';
import { Router, ActivatedRoute  } from '@angular/router';
import {BehaviorSubject, Subscription} from 'rxjs';

import {VisitorService} from '../../shared/visitor.service';
import {HttpService} from '../../shared/http.service';
import {VisitorModel} from '../profile/visitor-model';
import {DialogService} from '../../modals/dialog.service';
import{ExhibService, ExhibModel} from '../exhib/exhib.service';
import {DashboardService} from '../dashboard/dashboard.service';

import * as html2pdf from 'html2pdf.js';
 
class EmailDataModel {
  email: string;
  prizv: string;
  name: string;
  pobatkovi: string;
  regnum: number
  file: string;
  constructor(parameters: VisitorModel, file: string) {
    this.email = parameters.email;
    this.prizv = parameters.prizv;
    this.name = parameters.name;
    this.pobatkovi = parameters.pobatkovi;
    this.regnum = parameters.regnum;
    this.file = file
  }
}

@Component({
  selector: 'app-invite',
  templateUrl: './invite.component.html',
  styleUrls: ['./invite.component.css']
})
export class InviteComponent implements OnInit, AfterViewInit, OnDestroy {

  readonly bcFormat = 'CODE128';

  lang: string;
  getLang: Subscription;

  visitor: VisitorModel = this.visitorService.curretnVisitorModel;
  exhib: ExhibModel;
  imgLoad = {logo: false, img: false};
  getImgLoad: BehaviorSubject<string> = new BehaviorSubject('');
  isRegVisitor: boolean;
  
  @ViewChild('content') content: ElementRef;

  constructor(
    private visitorService: VisitorService,
    private http: HttpService,
    private dialog: DialogService,
    private router: Router,
    private route: ActivatedRoute,
    private dashboard: DashboardService,
  ) {  } 
  
  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      this.exhib = data['exhibData'].dataExhibition;
      if(data['exhibData'].reg === 'REGISTERED') this.isRegVisitor = true
    });
    this.getLang = this.dashboard.lang.subscribe(lang => this.lang = lang);
  }

  ngAfterViewInit(): void{
    this.getImgLoad.subscribe(data=> {
      if(data == "LOAD") {
        if(this.isRegVisitor) this.dialog.dialogOpen('ви вже реєструвалися')
        else this.getPDFAndSend()
      }
    })
  }
  
  imgErrorHandler(event: Event, img: string) {
    event.target['src'] = img;
  }

  imgLoadHandler(event: Event){
    this.imgLoad[event.target['id']] = true;
    if(this.imgLoad.logo && this.imgLoad.img) this.getImgLoad.next('LOAD')
  }

  private getPDFWorker(): html2pdf.Worker{
    let worker = new html2pdf.Worker;
    const element = this.content.nativeElement;
    const opt = {
      margin: [0, 0],
      filename: 'invite.pdf',
      image: {type: 'jpeg', quality: 1 },
      html2canvas: {scale: 2, imageTimeout: 0, useCORS: true},
      jsPDF: {unit: 'mm', format: 'a4', orientation: 'portrait'}
    };
    return worker.from(element).set(opt)
  }

  private sendEmail(myData: string): void{
    if(!this.visitor.email) return 
    let data = new EmailDataModel(this.visitor, myData);
    this.http.post(data, "email").subscribe(data =>{});
  }

  getPDF(){
    return this.getPDFWorker().save()
  }

  getPDFAndSend(){
    if(!this.visitor.email) return this.dialog.dialogOpen('Ви не вказали електронну пошту, запрошення не надіслано');
    this.dialog.dialogOpen(`${this.lang == 'EN' ? "запрошення буде відправлено на email" : "the invitation will be sent to the email"}: ${this.visitor.email}`);
    return this.getPDFWorker().outputPdf('datauristring')
      .then((data: string) => this.sendEmail(data));
  }

  getInvite(): void{
    this.router.navigate(['exhibitions'])
  }

  ngOnDestroy(): void{
    this.getImgLoad.unsubscribe();
    this.getLang.unsubscribe()
  }

}
