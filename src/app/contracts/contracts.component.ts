import { Component, OnInit } from '@angular/core';
import {AppService} from '../app.service';
import { timeout } from 'q';

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
	StoreType:any;
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
			for (const accounts of this.config['identities']) {
				if (accounts.pkh == this.accountpkh) {
					this.keys = {
						"sk": accounts.sk,
						"pk": accounts.pk,
						"pkh": accounts.pkh,
						"label": accounts.label
					};
					break;
				} else {
					alert('Couldn\'t find keys for given account,Please make sure the account exists and added to tezster');
				}
			}

			this.keysStore = {
				publicKey: this.keys.pk,
				privateKey: this.keys.sk,
				publicKeyHash: this.keys.pkh,
				seed: '',
				storeType: conseiljs.StoreType.Fundraiser
			};			
			for (const contract of this.config['contracts']) {
				if (contract['label'] === this.contract) {
					alert('This contract label is already in use. Please use a different one.');
				}
			}
			this.result = this._AppService.deployContract(this.accountpkh, this.contractText,
				 this.contract, this.initValue, this.tezosProvider, this.keysStore);
			setTimeout(() => {																		
				alert(this.result);
			},2000);

			
		} else {
			alert('Please select an account/Contract/Inital Contract Value !!');
		}
	}
	async callContract() {
		if (typeof this.accountpkh !== 'undefined' && typeof this.contract !== 'undefined' && typeof this.initValue !== 'undefined') {
			this.config = JSON.parse(localStorage.getItem('configData'));
			this.tezosProvider = this.config['provider'];
			for (const accounts of this.config['identities']) {
				if (accounts.pkh == this.accountpkh) {
					this.keys = {
						"sk": accounts.sk,
						"pk": accounts.pk,
						"pkh": accounts.pkh,
						"label": accounts.label
					};
					break;
				} else {
					alert('Couldn\'t find keys for given account,Please make sure the account exists and added to tezster');
				}
			}
			this.keysStore = {
				publicKey: this.keys.pk,
				privateKey: this.keys.sk,
				publicKeyHash: this.keys.pkh,
				seed: '',
				storeType: conseiljs.StoreType.Fundraiser
			};
			for (const contract of this.config['contracts']) {
				if (contract['label'] == this.contract) {
					alert('This contract label is already in use. Please use a different one.');
				}
			}
			this.result = await this._AppService.callContract(this.accountpkh, this.contract, this.initValue, this.tezosProvider, this.keysStore);
			alert(this.result);
		} else {
			alert('Please select an account/Contract/Inital Contract Value !!');
		}
	}
	async getStorage() {
		if (typeof this.accountpkh != 'undefined' && typeof this.contract != 'undefined') {
			let contractAddress = '';
			for (const contract of this.config['contracts']) {
				if (contract['label'] === contract) {
					contractAddress = contract['pkh'];
					break;
				}
			}
			if (!contractAddress) {
				const storageResult = await this._AppService.getStorage(contractAddress);
				alert(storageResult);
			} else {
				alert('couldn\'t find the contract, please make sure contract label or address is correct!');
			}
		} else {
			alert('Please select an account/Contract/Inital Contract Value !!');
		}
	}
}
