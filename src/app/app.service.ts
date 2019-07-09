import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
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
        console.log("data is: " + data);
        this.setLocalConfigData(data);
    }

    public setLocalConfigData(data) {
        localStorage.setItem('configData', data);
    }

    public getLocalConfigData() {
        return localStorage.getItem('configData');
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
            }).catch( (e: any) => {
                console.log(e);
                reject();
            });
        });

    }

}
