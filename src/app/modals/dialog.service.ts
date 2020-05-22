import { Injectable } from '@angular/core';
import { DialogInfoComponent } from './dialog-info/dialog-info.component';
import { DialogConfirmComponent } from './dialog-confirm/dialog-confirm.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Router } from '@angular/router';
import {Observable, from, of, Subject, BehaviorSubject, Subscription} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  mainPromise: Promise<any> = Promise.resolve();

  constructor(
    public dialog: MatDialog,
    private router: Router
  ) { }


  dialogOpen(message: string){
    this.mainPromise = this.mainPromise.then(_=>this.dialogOpenPromise(message))
  }  

  private dialogOpenPromise(message: string):Promise<any>{
    return new Promise((resolve, reject)=>{
      const dialogRef = this.dialog.open(DialogInfoComponent, {data: message});
      dialogRef.afterClosed().subscribe(result => {
        resolve('DONE')
      });
    })
  }
 

  confirmOpen(message: string, path: string): void {
    this.mainPromise = this.mainPromise.then(_=>this.confirmOpenPromise(message, path))
  }

  private confirmOpenPromise(message: string, path: string):Promise<any> {
    return new Promise((resolve, reject)=>{
      const dialogRef = this.dialog.open(DialogConfirmComponent, {data: message});
      dialogRef.afterClosed().subscribe(result => {
        resolve('DONE');
        if(result == 'ok')this.router.navigate([path])
      });
    })
  }


  dialogDoSomething(message: string, cb: Function): void {
    this.mainPromise = this.mainPromise.then(_=>this.dialogDoSomethingPromise(message, cb))
  }

  private dialogDoSomethingPromise(message: string, cb: Function):Promise<any> {
    return new Promise((resolve, reject)=>{
      const dialogRef = this.dialog.open(DialogConfirmComponent, {data: message});
      dialogRef.afterClosed().subscribe(result => {
        resolve('DONE');
        if(result == 'ok') cb()
      });
    })
  }

}
