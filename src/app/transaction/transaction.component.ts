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
	public operValue: any;
	public tempData;
	public now:number;

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
			if(this.configData['provider'] == " https://tezos-dev.cryptonomic-infra.tech/"){  
				this._AppService.loadtransactionData(this.accountpkh);
				setTimeout(()=>{
					this.txs=[];
					this.totalTransaction=0;
					this.transactionData= JSON.parse(localStorage.getItem('transactionData'));					
					this.totalTransaction=this.transactionData.length;					
					if(this.transactionData.length > 0){
						for(var trans of this.transactionData){
							console.log(trans.tx);															
								if(trans.tx.kind !='transaction' ) continue;
									var fee=trans.tx.fee;
									var amount=trans.tx.amount;
									var status="Sent";
								if(trans.tx.source !=this.accountpkh){
									status="Received";
								}
								if(trans.tx.failed){
									status="Transaction Failed";
								}
								this.txs.push({
									"amount" : (amount/1000000).toFixed(3)+" Tz",
									"fee" : (fee/1000000).toFixed(3)+" Tz",
									"destination" : trans.tx.destination,
									"hash" : trans.tx.blockHash,
									"source" : trans.tx.source,
									"time" : trans.tx.insertedTimestamp,
									"operationHash" : trans.op.opHash,
									"status":status
								});
							
						}

					}
					else{
							this.modalService.openModal('blankData', BlankDataComponent);
					}
				}, 2000);
			}
			else{
				setTimeout(()=>{
					this.txs=[];
					this.totalTransaction=0;
					this.tempData=JSON.parse(this._AppService.getLocalConfigData());
					this.transactionData=this.tempData["transactions"];
					this.totalTransaction=this.transactionData.length;
					this.now=Date.now();
					if(this.transactionData.length >0){
						for(var transdata of this.transactionData){
							console.log(transdata);
							if(transdata["from"] == this.accountpkh || transdata["to"] == this.accountpkh){
								if(transdata["from"] == this.accountpkh){
									this.txs.push({
										"amount" : (transdata["amount"])+" Tz",
										"destination" : transdata["to"],
										"hash" : transdata["hash"],
										"source" : transdata["from"],
										"time" : transdata["time"],
										"status":"Send"
									});

								}
								else{
									this.txs.push({
										"amount" : (transdata["amount"])+" Tz",
										"destination" : transdata["to"],
										"hash" : transdata["hash"],
										"source" : transdata["from"],
										"time" : transdata["time"],
										"status":"Received",

									});
								}
							}
						}

					}
					else{
						this.modalService.openModal('blankData', BlankDataComponent);
					}
				}, 2000);
			}
		}
}
