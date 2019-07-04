import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest, HttpHandler, HttpParams, HttpErrorResponse } from '@angular/common/http';
import {configDataTpye} from '../assets/configTypeData';
import {Observable, BehaviorSubject, ArgumentOutOfRangeError} from 'rxjs';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

declare var eztz: any;
const apiURLCall="http://localhost:18731";
@Injectable()
export class AppService {
  private _url: string='/assets/config.json';

  protected _configData: any;
  public amount: any;
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
  public addAccount(data: { "label": string; "pkh": string; "identity": string; }) {
    this.configData.accounts.push(data);
    console.log("addCont", this.configData);
  }

  public setProviderData(data:string) {    
    this.configData.provider=data;
    sessionStorage.setItem("rpc-node ",data);      
  }
  public get configData() {
    return this._configData;
  }

  public set configData(data) {
    this._configData = data;
    this.configDataChangeObs$.next(data);
  }

  public getBalance(keys:string) {
    eztz.rpc.getBalance(keys).then(function (res: number) {    
      return (res/1000000).toFixed(3)+" Tz";        
    }).catch(function (e: any) {
      return 
    });       
       
  }

}
