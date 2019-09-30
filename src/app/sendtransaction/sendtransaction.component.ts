import { Component, OnInit } from '@angular/core';
import { BsModalRef} from 'ngx-bootstrap/modal';
import { ModalService } from '../modal.service';
import { AppService } from '../app.service';
import { TransferPreviewComponent } from '../transfer-preview/transfer-preview.component';

@Component({
	selector: 'app-sendtransaction',
	templateUrl: './sendtransaction.component.html',
	styleUrls: ['./sendtransaction.component.css']
})
export class SendtransactionComponent implements OnInit {
	public configData=[];  
	accountpkh: any;
	balance: any;
	amount: any;
	to: any;
	guess: any; 
	identities:any[];	
	sendMoney: { "to": any; "amount": any; "guess": any; "from": any };
	keys:{"sk": any; "pk": any; "pkh": any; "label": any};   
	public config;
	constructor(public bsModalRef: BsModalRef, private _AppService: AppService, private modalService: ModalService) { }
	onClick(): void {  
		this.config=JSON.parse(localStorage.getItem('configData'));       
		for(var accounts of this.config['identities']){             
			if(accounts.pkh == this.accountpkh){                    
				this.keys={"sk":accounts.sk,"pk":accounts.pk, "pkh":accounts.pkh , "label" : accounts.label};
				break;    
			} 
		} 
		
		localStorage.setItem("keys",JSON.stringify(this.keys));           
		this.sendMoney={"from":this.accountpkh,"to":this.to, "amount":this.amount , "guess" : this.guess};    
		localStorage.setItem("transfer",JSON.stringify(this.sendMoney));
		this.modalService.openModal('transfer', TransferPreviewComponent);
	}

	onNoClick(): void {
		this.modalService.closeModal('Sendtransaction');
	} 
	async selected(){
		this.balance= await this._AppService.getBalance(this.accountpkh);                
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
