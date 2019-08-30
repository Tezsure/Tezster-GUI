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
    constructor(private modalService: ModalService, private _AppService: AppService) { }

    openDialog(): void {
        this.modalService.openModal('localnode', LocalnodeComponent);
    }

    alphanet(): void {
      	this.modalService.openModal('alphanet', AlphanetComponent);
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
