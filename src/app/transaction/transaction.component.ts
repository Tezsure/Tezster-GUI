import { Component, OnInit } from '@angular/core';
import {AppService} from '../app.service';
import { ModalService } from '../modal.service';
import { BlankDataComponent } from '../blank-data/blank-data.component';
import { SendtransactionComponent } from '../sendtransaction/sendtransaction.component';


@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {
  public configData=[];
  public transactionData=[]; 
  public txs = [];
  public totalTransaction: any;

  constructor(private _AppService:AppService, private modalService: ModalService) { }
  accountpkh: any; 
  ngOnInit() {
    this._AppService.configDataChangeObs$
       .subscribe(data => {       
         if (data) {
          this.configData = data;  
          }
        });   
              
  }
  openDialogForSend(){
    this.modalService.openModal('Sendtransaction', SendtransactionComponent); 
  }
    selected(){  
      this._AppService.loadtransactionData(this.accountpkh);     
        setTimeout(()=>{
          this.transactionData= JSON.parse(this._AppService.getLocaltransactionData());
          this.txs=[];
          this.totalTransaction=this.transactionData.length;          
          if(this.transactionData.length > 0){            
            for(var trans of this.transactionData){
              for(var oper of trans.type.operations){
                if(oper.kind !='transaction' || oper.failed) continue;
                var fee=oper.fee;
                var amount=oper.amount;
                var status="Sent";
                if(oper.src.tz !=this.accountpkh){
                    status="Received";
                }
                this.txs.push({
                  "amount" : (amount/1000000).toFixed(3)+" Tz",
                  "fee" : (fee/1000000).toFixed(3)+" Tz",
                  "destination" : oper.destination.tz,
                  "hash" : trans.hash,
                  "source" : oper.src.tz,
                  "time" : oper.timestamp,
                  "operationHash" : trans.hash,
                  "status":status
                });              
              }
            }
            
          }
          else{            
              this.modalService.openModal('blankData', BlankDataComponent);         
          }
        }, 2000);        
    }
}
