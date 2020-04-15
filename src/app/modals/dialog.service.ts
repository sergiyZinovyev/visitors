import { Injectable } from '@angular/core';
import { DialogInfoComponent } from './dialog-info/dialog-info.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(public dialog: MatDialog) { }

  dialogOpen(message: string):any{
    this.dialog.open(DialogInfoComponent, {data: message}); 
  }
}
