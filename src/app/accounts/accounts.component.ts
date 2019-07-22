import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
declare var eztz: any;

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {

  public configData = null;
  balance: any;
  constructor(private _AppService: AppService) { }

  ngOnInit() {

    this._AppService.configDataChangeObs$
      .subscribe(data => {
        if (data) {
          this.configData = data;          
          eztz.node.setProvider("http://alphanet.tezrpc.me");
          for(var accounts of this.configData.accounts){
            this.getBalance(accounts.pkh);
          }

        }
      });      
  }
  async getBalance(pkh: any) {    
     this.balance= await this._AppService.getBalance(pkh); 
    console.log("account ",this.balance); 
  }
  


}

