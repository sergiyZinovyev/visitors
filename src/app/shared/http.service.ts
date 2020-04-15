import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable, from, of, Subject, BehaviorSubject, Subscription} from 'rxjs';

import { DialogHttpErrorComponent } from '../modals/dialog-http-error/dialog-http-error.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
 
import { catchError, map, retry} from 'rxjs/operators';
import {runOnKeys} from './lib/run-on-keys';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  dbUrl = 'https://visitors.galexpo.com.ua:7002'; //dev host
  //dbUrl = 'https://visitors.galexpo.com.ua:7001'; //prod host    

  errMessages: string[] = [];
  getErrMessages: Subject<string> = new Subject();

  constructor(
    private http: HttpClient,
    public dialog: MatDialog
    ) {
      runOnKeys(
        () => this.dialogErrOpen(),
        "KeyE",
        "KeyR"
      )
   }
 
  // private getAuth(){ //дані для аутентифікації
  //   return `login=${localStorage.getItem('user')}&password=${localStorage.getItem('password')}`
  // } 

  get(prop: string): Observable<any>{
    return this.http.get(`${this.dbUrl}/${prop}`)
      .pipe(
        catchError(this.handleError<any>(`get/${prop}`, []))
      );
  }

  post(body, prop): Observable<any>{
    return this.http.post(`${this.dbUrl}/${prop}`, body) 
      .pipe(
        catchError(this.handleError<any>(`post/${prop}`, []))
      );  
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message} | date: ${new Date().toLocaleString("en-US", {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
      })}`);
      return of(result as T);
    };
  }

  private log(message: string) {
    this.errMessages.push(message);
    this.getErrMessages.next(message);
  }

  private dialogErrOpen():any{
    this.dialog.open(DialogHttpErrorComponent, {data: this.errMessages});
  }

}
