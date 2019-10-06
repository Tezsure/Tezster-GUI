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
	public data: any;
	result: any;
	public configData = [];
	public keys;
	public obj;
	public now: number;
	transHash: {
		"operation": any;
		"hash": any;
		"from": any;
		"to": any;
		"amount": any;
		"status": any;
		"time": number
	};
  	constructor(public bsModalRef: BsModalRef, private _AppService: AppService, private modalService: ModalService, private router: Router) {}
  	onNoClick(): void {
   		this.modalService.closeModal('transfer');
  	}
  	async onClick() {
		this.result = await this._AppService.transferAmount(this.data);
		this.now = Date.now();
	setTimeout(() => {
		this.keys = JSON.parse(localStorage.getItem("keys"));
		if (this.configData["provider"] == " https://tezos-dev.cryptonomic-infra.tech/" && this.result != '') {
			alert("\nTransfer complete - operation hash #" + this.result + "for alphanet you can visit <a href=' https://tezos-dev.cryptonomic-infra.tech/'" + this.result + '>' + this.result + "</a>");
		} else if (this.configData["provider"] == " https://tezos-dev.cryptonomic-infra.tech/" && this.result == '') {
			alert("\nTransfer Failed !! for alphanet you can visit <a href=' https://tezos-dev.cryptonomic-infra.tech/'></a>");
		} else if (this.result != '') {
			this.transHash = {
				"operation": "transfer",
				"hash": this.result,
				"from": this.data.from,
				"to": this.data.to,
				"amount": this.data.amount,
				"status": "Success",
				"time": this.now
			};
			console.log(this.transHash);
			this.obj = JSON.parse(this._AppService.getLocalConfigData());
			this.obj.transactions.push(this.transHash);
			this._AppService.setLocalConfigData(this.obj);
			alert("\nTransfer complete - operation hash #" + this.result + "\n Please run 'tezster bake-for <account-name>' to bake this operation");
		} else {
			alert("Transfer Failed");
			this.transHash = {
				"operation": "transfer",
				"hash": "",
				"from": this.data.from,
				"to": this.data.to,
				"amount": this.data.amount,
				"status": "Failed",
				"time": this.now
			};
			this.obj = JSON.parse(this._AppService.getLocalConfigData());
			this.obj.transactions.push(this.transHash);
			this._AppService.setLocalConfigData(this.obj);
		}
	}, 3000);
	this.modalService.closeModal('transfer');
	this.modalService.closeModal('Sendtransaction');
  }
	ngOnInit() {
		this.data = JSON.parse(localStorage.getItem("transfer"));
		this._AppService.configDataChangeObs$
			.subscribe(data => {
			if (data) {
				this.configData = data;
			}
		});
	}
}
