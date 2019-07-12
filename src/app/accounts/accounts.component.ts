import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {

  public configData = null;

  constructor(private _AppService: AppService) { }

  ngOnInit() {

    this._AppService.configDataChangeObs$
      .subscribe(data => {
        if (data) {
          this.configData = data;          
        }
      });      
  }

  async getAccountBalance(key: string) {  
    console.log("key data ",key);  
    const data = await this._AppService.getBalance(key);    
    return data;
  }


}

