import { Component, OnInit, Inject, OnDestroy} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {DashboardService} from '../../components/dashboard/dashboard.service';
import {Subscription} from 'rxjs';
 
@Component({
  selector: 'app-dialog-info',
  templateUrl: './dialog-info.component.html',
  styleUrls: ['./dialog-info.component.css']
})
export class DialogInfoComponent implements OnInit, OnDestroy {

  lang: string;
  getLang: Subscription;

  constructor(
    public dialogRef: MatDialogRef<DialogInfoComponent>,
    private dashboard: DashboardService,
    @Inject(MAT_DIALOG_DATA) public data) {}

  ngOnInit(): void {
    this.getLang = this.dashboard.lang.subscribe(lang => this.lang = lang);
  }
 
  onNoClick(): void {
    this.dialogRef.close();
  }
  
  ngOnDestroy(){
    this.getLang.unsubscribe()
  }
}
