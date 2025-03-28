import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { RequestMethod } from '../utils/enums/request-method.enum';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private baseUrl: string = 'https://localhost:3000'; 

  constructor(private http: HttpClient) {}

  public request<T>(
    method: RequestMethod,
    url: string,
    body?: any,
    params?: HttpParams,
    headers?: HttpHeaders
  ): Observable<T> {
    const fullUrl = `${this.baseUrl}/${url}`;
    const options: {
      headers?: HttpHeaders;
      params?: HttpParams;
      responseType: 'json';
      observe: 'body';
    } = {
      headers,
      params,
      responseType: 'json',
      observe: 'body'
    };
  
    switch (method) {
      case RequestMethod.Get:
        return this.http.get<T>(fullUrl, options).pipe(
          catchError(this.handleError)
        );
      case RequestMethod.Post:
        return this.http.post<T>(fullUrl, body, options).pipe(
          catchError(this.handleError)
        );
      case RequestMethod.Put:
        return this.http.put<T>(fullUrl, body, options).pipe(
          catchError(this.handleError)
        );
      case RequestMethod.Delete:
        return this.http.delete<T>(fullUrl, options).pipe(
          catchError(this.handleError)
        );
      default:
        return throwError(() => new Error('Invalid HTTP Method'));
    }
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('HTTP Request error: ', error);
    return throwError(() => new Error(error.message || 'Something went wrong'));
  }
}