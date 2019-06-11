import { Component, OnInit } from '@angular/core';
import {AppService} from '../app.service';

@Component({
  selector: 'app-localnode',
  templateUrl: './localnode.component.html',
  styleUrls: ['./localnode.component.css']
})
export class LocalnodeComponent implements OnInit {
  public configData=[];

  constructor(private _AppService:AppService) { }

  ngOnInit() {
    this._AppService.getConfigData()
      .subscribe(data => this.configData=data);
  }


}
