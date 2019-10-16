import { Component, OnInit } from '@angular/core';
import { LocalnodeComponent } from '../localnode/localnode.component';
import { ModalService } from '../modal.service';
import { AlphanetComponent } from '../alphanet/alphanet.component';
import { AppService } from '../app.service';


@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
    public configData = [];
    public port=[];
    port_no: any;
    
    constructor(private modalService: ModalService, private _AppService: AppService) { }

    openDialog(): void {
        this.modalService.openModal('localnode', LocalnodeComponent);
    }
    
    alphanet(): void {
      	this.modalService.openModal('alphanet', AlphanetComponent);
  	}
    port_id():void{        
        this.port=this.configData['provider'].split(":",3);
        this.port_no=this.port[2];
        return this.port_no;
      }
  	ngOnInit() {
    	this._AppService.configDataChangeObs$
      	.subscribe(data => {
        	if (data) {
          		this.configData = data;             

        	}
    	});
      }
      
}
