import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest, HttpHandler, HttpParams, HttpErrorResponse } from '@angular/common/http';
import {configDataTpye} from '../assets/configTypeData';
import {Observable, BehaviorSubject} from 'rxjs';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';


const apiURLCall="http://localhost:18731";
@Injectable()
export class AppService {
  private _url: string='/assets/config.json';

  protected _configData;
  public configDataChangeObs$: BehaviorSubject<any>;

  constructor(private http:HttpClient) { 
    this.configDataChangeObs$ = new BehaviorSubject<any>(null);
  }

  getConfigData():Observable<configDataTpye[]>{
    const ajax = this.http.get<configDataTpye[]>(this._url).catch(this.errorHandler);   
    ajax.subscribe(data => this.configData = data);
    return ajax;
  }

  errorHandler(error : HttpErrorResponse){
    return Observable.throw(error.message || "Server Error");
  };

  /* 
  {
        "label": "bootstrap_3",
        "pkh": "tz1faswCTDciRzE4oJ9jn2Vm2dvjeyA9fUzU",
        "identity": "bootstrap3"
      }
  */

  public addAccount(data) {
    this.configData.accounts.push(data);
    console.log("addCont", this.configData);
  }

  public get configData() {
    return this._configData;
  }

  public set configData(data) {
    this._configData = data;
    this.configDataChangeObs$.next(data);
  }



}
