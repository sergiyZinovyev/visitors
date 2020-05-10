import { Component, OnInit, Inject, OnDestroy} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {DashboardService} from '../../components/dashboard/dashboard.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-dialog-confirm',
  templateUrl: './dialog-confirm.component.html',
  styleUrls: ['./dialog-confirm.component.css']
})
export class DialogConfirmComponent implements OnInit, OnDestroy {
 
  lang: string;
  getLang: Subscription;

  constructor(
    public dialogRef: MatDialogRef<DialogConfirmComponent>,
    private dashboard: DashboardService,
    @Inject(MAT_DIALOG_DATA) public data
  ) {}

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
