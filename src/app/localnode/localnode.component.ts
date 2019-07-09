import { Component, OnInit, Inject, ViewChild, TemplateRef } from '@angular/core';
import {AppService} from '../app.service';
import { BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import { ModalService } from '../modal.service';


declare var eztz: any;

@Component({
  selector: 'app-localnode',
  templateUrl: './localnode.component.html',
  styleUrls: ['./localnode.component.css']
})
export class LocalnodeComponent implements OnInit {z
  public configData=[];
  public userData: string;


  constructor(public bsModalRef: BsModalRef, private _AppService:AppService, private modalService: ModalService ) { }

    onNoClick(): void {     
      this.modalService.closeModal('localnode');
    }

    onClick(): void {           
      this._AppService.setProviderData(this.userData);
      eztz.node.setProvider(this.userData);       
      this.modalService.closeModal('localnode');
    }
    ngOnInit() {
      this._AppService.getConfigData();
      this._AppService.configDataChangeObs$
       .subscribe(data => {       
         if (data) {
          this.configData = data;  
          }
        });    
      
     
  }

}
