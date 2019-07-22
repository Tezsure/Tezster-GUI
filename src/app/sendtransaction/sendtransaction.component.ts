import { Component, OnInit } from '@angular/core';
import { BsModalRef} from 'ngx-bootstrap/modal';
import { ModalService } from '../modal.service';
import { AppService } from '../app.service';

@Component({
  selector: 'app-sendtransaction',
  templateUrl: './sendtransaction.component.html',
  styleUrls: ['./sendtransaction.component.css']
})
export class SendtransactionComponent implements OnInit {
  public configData=[];
  accountpkh: any;
  balance: any;
  constructor(public bsModalRef: BsModalRef, private _AppService: AppService, private modalService: ModalService) { }
  onClick(): void {    
    this.modalService.closeModal('Sendtransaction');
  }

  onNoClick(): void {
    this.modalService.closeModal('Sendtransaction');
  } 
  async selected(){
    this.balance= await this._AppService.getBalance(this.accountpkh); 
    console.log("send money",this.balance);    
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
