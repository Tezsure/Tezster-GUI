import { Component, OnInit } from '@angular/core';
import {AppService} from '../app.service';
import { timeout } from 'q';

declare var eztz: any;
declare var conseiljs: any;

@Component({
	selector: 'app-contracts',
	templateUrl: `./contracts.component.html`,
	styleUrls: ['./contracts.component.css']
})
export class ContractsComponent implements OnInit {
	public configData = [];
	accountpkh: any;
	contract: any;
	selectedFile: File;
	initValue: any
	result: any;
	contractText: any;
	tezosProvider: any;
	StoreType: any;
	public config;
	keys: {
		"sk": any;
		"pk": any;
		"pkh": any;
		"label": any
	};
	keysStore: {
		"privateKey": any;
		"publicKey": any;
		"publicKeyHash": any;
		"storeType": any;
		"seed": any
	};
	tempData: any;
	contData: any;
	obj: any;
	constructor(private _AppService: AppService) {}
	ngOnInit() {
		this._AppService.configDataChangeObs$.subscribe(data => {
			if (data) {
				this.configData = data;
			}
		});
	}
	selected() {
		this.contract = '';
		this.initValue = '';
	}
	fileChange(event) {
		this.selectedFile = event.target.files[0];
		const fileReader = new FileReader();
		fileReader.readAsText(this.selectedFile, 'UTF-8');
		fileReader.onload = () => {
			this.contractText = fileReader.result;
		}
		fileReader.onerror = (error) => {
			alert(error);
		}
	}
	public deployContract() {
		if (typeof this.accountpkh !== 'undefined' && typeof this.contract !== 'undefined' && typeof this.initValue !== 'undefined') {
			this.config = JSON.parse(localStorage.getItem('configData'));
			this.tezosProvider = this.config['provider'];
			let accounts = this.findKeyObj(this.config['identities'], this.accountpkh);
			if (!accounts) {
				alert(`Couldn't find keys for given account.
				Please make sure the account exists and added to tezster. Run 'tezster list-accounts to get all accounts`);

			} else {
				let cont = this.findKeyObj(this.config['contracts'], this.accountpkh);
				if (cont) {
					alert(`This contract label is already in use. Please use a different one.`);
				} else {
					this.keys = {
						"sk": accounts.sk,
						"pk": accounts.pk,
						"pkh": accounts.pkh,
						"label": accounts.label
					};
					this.keysStore = {
						publicKey: this.keys.pk,
						privateKey: this.keys.sk,
						publicKeyHash: this.keys.pkh,
						seed: '',
						storeType: conseiljs.StoreType.Fundraiser
					};

					this.result = this._AppService.deployContract(this.accountpkh, this.contractText,
						this.contract, this.initValue, this.tezosProvider, this.keysStore);
					setTimeout(() => {																							
						//console.log(this.result);
						alert(`If you're running a local node, Please run "tezster bake-for <account-name> to bake this operation
				\n If you're using alphanet node, use https://alphanet.tzscan.io to check contract/transactions`);

					}, 2000);
				}
			}
		} else {
			alert('Please select an account/Contract/Inital Contract Value !!');
		}
	}
	public callContract() {
		if (typeof this.accountpkh !== 'undefined' && typeof this.contract !== 'undefined' && typeof this.initValue !== 'undefined') {
			this.config = JSON.parse(localStorage.getItem('configData'));
			this.tezosProvider = this.config['provider'];
			let accounts = this.findKeyObj(this.config['identities'], this.accountpkh);
			if (!accounts) {
				alert(`Couldn't find keys for given account.
				Please make sure the account exists and added to tezster. Run 'tezster list-accounts to get all accounts`);

			} else {
				this.keys = {
					"sk": accounts.sk,
					"pk": accounts.pk,
					"pkh": accounts.pkh,
					"label": accounts.label
				};
				this.keysStore = {
					publicKey: this.keys.pk,
					privateKey: this.keys.sk,
					publicKeyHash: this.keys.pkh,
					seed: '',
					storeType: conseiljs.StoreType.Fundraiser
				};
				let cont = this.findKeyObj(this.config['contracts'], this.contract);
				if (!cont) {
					alert(`couldn't find the contract, please make sure contract label or address is correct!`);
				} else {
					let contractAdd = cont.pkh;
					this.result = this._AppService.callContract(contractAdd, this.contract, this.initValue, this.tezosProvider, this.keysStore);
					setTimeout(() => {
						//console.log(this.result);
					}, 2000);
				}
			}
		} else {
			alert('Please select an account/Contract/Inital Contract Value !!');
		}
	}
	async getStorage() {
		this.config = JSON.parse(localStorage.getItem('configData'));
		if (typeof this.accountpkh != 'undefined' && typeof this.contract != 'undefined') {
			let cont = this.findKeyObj(this.config['contracts'], this.contract);
			if (!cont) {
				alert(`couldn't find the contract, please make sure contract label or address is correct!`);
			} else {
				let contractAddress = cont.pkh;
				this.result = this._AppService.getStorage(contractAddress);
				setTimeout(() => {
					//console.log(this.result);
				}, 2000);
			}
		} else {
			alert('Please select an account/Contract/Inital Contract Value !!');
		}
	}

	findKeyObj(list, t) {
		for (var i = 0; i < list.length; i++) {
			if (list[i].pkh == t || list[i].label == t) return list[i];
		}
		return false;
	}
}