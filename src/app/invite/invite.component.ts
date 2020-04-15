import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';

import {VisitorService} from '../shared/visitor.service';
import {ExhibvisService} from '../shared/exhibvis.service';
import {HttpService} from '../shared/http.service';
import {VisitorModel} from '../visitor/visitor-model';
import {DialogService} from '../modals/dialog.service';

import * as html2pdf from 'html2pdf.js';

class EmailDataModel {
  email: string;
  prizv: string;
  name: string;
  pobatkovi: string;
  regnum: number
  file: string;
  constructor(parameters: VisitorModel) {
    this.email = parameters.email;
    this.prizv = parameters.prizv;
    this.name = parameters.name;
    this.pobatkovi = parameters.pobatkovi;
    this.regnum = parameters.regnum;
  }
}

@Component({
  selector: 'app-invite',
  templateUrl: './invite.component.html',
  styleUrls: ['./invite.component.css']
})
export class InviteComponent implements OnInit {

  visitor: VisitorModel = this.visitorService.curretnVisitorModel;
  bcFormat = 'CODE128';
  
  @ViewChild('content') content: ElementRef;

  constructor(
    private visitorService: VisitorService,
    private exhib: ExhibvisService,
    private http: HttpService,
    private dialog: DialogService,
  ) {  } 

  ngOnInit(): void {
    if(!this.exhib.visitorsData.reg)this.getPDFAndSend()
  }

  getImg(){
    return `${this.http.dbUrl}/static/registration/shared/${this.exhib.visitorsData.id_exhibition}.png` 
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

  private sendEmail(myData: string){
    if(!this.visitor.email) return 
    let data = new EmailDataModel(this.visitor);
    data.file = myData;
    this.http.post(data, "email").subscribe(data =>{});
  }

  getPDF(){
    return this.getPDFWorker().save()
  }

  getPDFAndSend(){
    if(!this.visitor.email){return this.dialog.dialogOpen('Ви не вказали електронну пошту, запрошення не надіслано')}
    this.dialog.dialogOpen(`запрошення буде відправлено на email: ${this.visitor.email}`);
    return this.getPDFWorker().outputPdf('datauristring').then((data: string) => {
        this.sendEmail(data);
      });
  }

  

}
