import { Injectable } from '@angular/core';
import { DialogInfoComponent } from './dialog-info/dialog-info.component';
import { DialogConfirmComponent } from './dialog-confirm/dialog-confirm.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(
    public dialog: MatDialog,
    private router: Router
  ) { }

  dialogOpen(message: string):any{
    this.dialog.open(DialogInfoComponent, {data: message}); 
  }

  confirmOpen(message: string, path: string): void {
    const dialogRef = this.dialog.open(DialogConfirmComponent, {data: message});

    dialogRef.afterClosed().subscribe(result => {
      if(result == 'ok')this.router.navigate([path])
    });
  }

}
