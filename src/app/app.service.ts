import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest, HttpHandler, HttpParams, HttpErrorResponse } from '@angular/common/http';
import {configDataTpye} from '../assets/configTypeData';
import {Observable} from 'rxjs/Observable';


const apiURLCall="http://localhost:18731";
@Injectable()
export class AppService {
private _url: string='/assets/config.json';

  constructor(private http:HttpClient) { }

  getConfigData():Observable<configDataTpye[]>{
    return this.http.get<configDataTpye[]>(this._url);   
  }

}
