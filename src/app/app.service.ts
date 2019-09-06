import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpInterceptor, HttpRequest, HttpHandler, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { configDataTpye } from '../assets/configTypeData';
import { transactionType } from '../assets/transactionType';
import { Observable, BehaviorSubject } from 'rxjs';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

declare var eztz: any;
@Injectable()
export class AppService {
    private _url: string = '/assets/config.json';
    private _transactionURL: string;
    public keys: any;
    protected _configData: any;
    protected _transactionData: any;
    public amount: any;
    public configDataChangeObs$: BehaviorSubject<any>;
    public data='';
    public obj: any;   
    private maxTxs=20; 
    public trans: any;
    public transactionDataChangeObs$: BehaviorSubject<any>;        
    constructor(private http: HttpClient) {
        this.configDataChangeObs$ = new BehaviorSubject<any>(null);        
    }

    fetchConfigData(): Observable<configDataTpye[]> {
        const ajax = this.http.get<configDataTpye[]>(this._url).catch(this.errorHandler);
        ajax.subscribe(this._onConfigDataResponse.bind(this));
        return ajax;
    }
    loadtransactionData(key: any):Observable<transactionType[]> {         
        this._transactionURL='https://api.alphanet.tzscan.io/v3/operations/'+key+'?type=Transaction&p=0&number='+ (this.maxTxs+1);   
        console.log(this._transactionURL);      
        const transajax = this.http.get<transactionType[]>(this._transactionURL).catch(this.errorHandler);
        transajax.subscribe(this._transactionDataResponse.bind(this));        
        return transajax;
    }
    protected _onConfigDataResponse(data: any) {
        this.configData = data;        
        this.setLocalConfigData(data);
    }
    protected _transactionDataResponse(data: any) {            
        this.setLocaltransactionData(data);
    }
    public setLocaltransactionData(data: string) {        
        data=JSON.stringify(data);             
        localStorage.setItem('transactionData', data);
    }
    public setLocalConfigData(data: string) {        
        data=JSON.stringify(data);             
        localStorage.setItem('configData', data);
    }

    public getLocalConfigData() {
        return localStorage.getItem('configData');
    }

    public getLocaltransactionData() {
        return localStorage.getItem('transactionData');
    }

    errorHandler(error: HttpErrorResponse) {
        return Observable.throw(error.message || 'Server Error');
    };
    public addAccount(data: { 'label': string; 'pkh': string; 'identity': string; }) {
        this.configData.accounts.push(data);
        this.obj=JSON.parse(this.getLocalConfigData());
        this.obj.accounts.push(data);
        this.setLocalConfigData(this.obj);
    }

    public setProviderData(data: string) {
        this.configData.provider = data;
        this.obj=JSON.parse(this.getLocalConfigData());
        this.obj.provider = data;
        this.setLocalConfigData(this.obj);
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
                this.amount=(res / 1000000).toFixed(3) + ' Tz';                
                resolve(this.amount);
            }).catch( (e: any) => {                
                reject(e);
            });
        });
    }

    public transferAmount(data:any){               
        return new Promise((resolve, reject) => {
            this.keys=JSON.parse(localStorage.getItem("keys"));                                                                 
            eztz.rpc.transfer(data.from, this.keys, data.to, data.amount,1400).then(function(r: { hash: any; }){                                                                                  
                resolve(r.hash);                
              }).catch(function(e: any){                  
                reject(e);
              });           
        });
    }
    public deployContract(keys:any,contract:any,label:any,init:any,tezosProvider:any){        

    }    
}

