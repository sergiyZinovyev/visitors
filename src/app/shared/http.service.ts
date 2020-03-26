import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
 
import { Observable, of } from 'rxjs';
import { catchError, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private dbUrl = 'https://visitors.galexpo.com.ua:7002'; //dev host
  //private url = 'https://visitors.galexpo.com.ua:7001'; //prod host    

  errMessages: string[] = [];

  constructor(private http: HttpClient) { }

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
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  private log(message: string) {
    this.errMessages.push(`HttpService: ${message}`);
  }

}
