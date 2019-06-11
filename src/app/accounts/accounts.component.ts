import { Component, OnInit } from '@angular/core';
import {AppService} from '../app.service';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {
  public configData=[];

  constructor(private _AppService:AppService) { }

  ngOnInit() {
    this._AppService.getConfigData()
      .subscribe(data => this.configData=data);
  }


}

