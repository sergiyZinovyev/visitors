import { Component, OnInit, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-http-error',
  templateUrl: './dialog-http-error.component.html',
  styleUrls: ['./dialog-http-error.component.css']
})
export class DialogHttpErrorComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DialogHttpErrorComponent>,
    @Inject(MAT_DIALOG_DATA) public data) {}

  ngOnInit(): void {
  }
 
  onNoClick(): void {
    this.dialogRef.close();
  }
}
