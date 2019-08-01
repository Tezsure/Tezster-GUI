import { Component, OnInit } from '@angular/core';
import {AppService} from '../app.service';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ModalService } from '../modal.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-transfer-preview',
  templateUrl: './transfer-preview.component.html',
  styleUrls: ['./transfer-preview.component.css']
})
export class TransferPreviewComponent implements OnInit {  
  public data:any;
  result: any;
  constructor(public bsModalRef: BsModalRef, private _AppService:AppService, private modalService: ModalService,private router: Router) { }
  onNoClick(): void {     
    this.modalService.closeModal('transfer');
  }
   async onClick(){
     console.log("send tezos Data ", this.data); 
   this.result=await this._AppService.transferAmount(this.data);
   setTimeout(()=>{
      console.log(this.result);
      this.modalService.closeModal('transfer');
      this.modalService.closeModal('Sendtransaction'); 
    },3000);    
   }
  ngOnInit() {
    this.data=JSON.parse(localStorage.getItem("transfer"));   
  }
}
