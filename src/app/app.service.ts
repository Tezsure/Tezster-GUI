import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpInterceptor, HttpRequest, HttpHandler, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { configDataTpye } from '../assets/configTypeData';
import { Observable, BehaviorSubject } from 'rxjs';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

declare var eztz: any;
@Injectable()
export class AppService {
    private _url: string = '/assets/config.json';

    protected _configData: any;
    public amount: any;
    public configDataChangeObs$: BehaviorSubject<any>;
    public data='';

    constructor(private http: HttpClient) {
        this.configDataChangeObs$ = new BehaviorSubject<any>(null);
    }

    fetchConfigData(): Observable<configDataTpye[]> {
        const ajax = this.http.get<configDataTpye[]>(this._url).catch(this.errorHandler);
        ajax.subscribe(this._onConfigDataResponse.bind(this));
        return ajax;
    }

    protected _onConfigDataResponse(data) {
        this.configData = data;        
        this.setLocalConfigData(data);
    }

    public setLocalConfigData(data) {
        data=JSON.stringify(data);        
        sessionStorage.setItem('configData', data);
    }

    public getLocalConfigData() {
        return sessionStorage.getItem('configData');
    }

    errorHandler(error: HttpErrorResponse) {
        return Observable.throw(error.message || 'Server Error');
    };
    public addAccount(data: { 'label': string; 'pkh': string; 'identity': string; }) {
        this.configData.accounts.push(data);
    }

    public setProviderData(data: string) {
        this.configData.provider = data;
    }
    public get configData() {
        return this._configData;
    }

    public set configData(data) {
        this._configData = data;        
        this.configDataChangeObs$.next(data);        
    }

    public getBalance(keys: string) {        
        return new Promise((resolve, reject) => {
            eztz.rpc.getBalance(keys).then( (res: number) => {
                resolve((res / 1000000).toFixed(3) + ' Tz');
            }).catch( (e) => {
                console.log(e);
                reject(e);
            });
        });
    }
}