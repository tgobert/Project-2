import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public errorStatus: number = 0;
  readonly baseUrl = "http://localhost:5000/api/";
  private header = new HttpHeaders({ 'Content-Type': 'application/json' });
  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    const body = {
      "username": email,
      "password": password
    }
    return this.http.post<HttpResponse<any>>(`${this.baseUrl}login`, body, { headers: this.header, observe: 'response' })
      .pipe(catchError(this.handleError));
  }

  register(fname: string, lname: string, email: string, age: number, dlnum: string, password: string): Observable<HttpResponse<any>> {
    const body = {
      "f_name": fname,
      "l_name": lname,
      "age": age,
      "email": email,
      "pass": password,
      "dr_lic_number": dlnum
    }
    return this.http.post<HttpResponse<any>>(`${this.baseUrl}register`, body, { headers: this.header, observe: 'response' })
      .pipe(catchError(this.handleError));
  }

  private handleError(httpError: HttpErrorResponse) {
    if (httpError.error instanceof ErrorEvent) {
      console.log('an error occured: ', httpError.error.message);
    } else {
        console.log(`Backend returned code ${httpError.status}`)
    }
    return throwError(() => new Error('something really bad happened'));
  }

}
