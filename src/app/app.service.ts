import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpInterceptor, HttpRequest, HttpHandler, HttpParams, HttpErrorResponse } from '@angular/common/http';



const apiURLCall="http://localhost:18731";
@Injectable()
export class AppService {
  http: any;

getProviderInfo(){
  return this.http.get(apiURLCall + 'getProvider');
}

getListAccounts(){
  return this.http.get(apiURLCall + 'list-accounts');
}

  constructor() { }
}
