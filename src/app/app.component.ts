import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';
declare var eztz: any;


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    public configData=[];    
    title = 'Tezsure';    
    obj: any;
    constructor(public _AppService: AppService) { }

    ngOnInit(): void {            
        this._AppService.fetchConfigData();              
    }

}
