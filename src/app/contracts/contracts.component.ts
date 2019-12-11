import { Component, OnInit } from '@angular/core';
import {AppService} from '../app.service';
import { timeout } from 'q';
import { BlankDataComponent } from '../blank-data/blank-data.component';
import { ModalService } from '../modal.service';

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
	public contractData=[];
	public cont_txs=[];
	public totalcontract: any;
	public operValue: any;	
	public now:number;
	public tempcontData: any;
	transactionData: any;
	totalTransaction: any;

	constructor(private _AppService: AppService , private modalService: ModalService) {}
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
		if (typeof this.accountpkh !== 'undefined' && this.contract != '' && this.initValue != '') {
			this.config = JSON.parse(localStorage.getItem('configData'));
			this.tezosProvider = this.config['provider'];
			let accounts = this.findKeyObj(this.config['identities'], this.accountpkh);
			if (!accounts) {
				this._AppService.openSnackBar(`Couldn't find keys for given account.
				Please make sure the account exists and added to tezster. Run 'tezster list-accounts to get all accounts`);

			} else {
				let cont = this.findKeyObj(this.config['contracts'], this.accountpkh);
				if (cont) {
					this._AppService.openSnackBar(`This contract label is already in use. Please use a different one.`);
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
						this._AppService.openSnackBar(`If you're running a local node, Please run "tezster bake-for <account-name> to bake this operation
				\n If you're using alphanet node, use https://babylonnet.tzstats.com to check contract/transactions`);

					}, 2000);
					this.contract = '';
					this.initValue = '';
				}
			}
		} else {
			this._AppService.openSnackBar('Please select an account/Contract/Inital Contract Value !!');
		}
	}
	public callContract() {
		if (typeof this.accountpkh !== 'undefined' && typeof this.contract !== 'undefined' && typeof this.initValue !== 'undefined') {
			this.config = JSON.parse(localStorage.getItem('configData'));
			this.tezosProvider = this.config['provider'];
			let accounts = this.findKeyObj(this.config['identities'], this.accountpkh);
			if (!accounts) {
				this._AppService.openSnackBar(`Couldn't find keys for given account.
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
					this._AppService.openSnackBar(`couldn't find the contract, please make sure contract label or address is correct!`);
				} else {
					let contractAdd = cont.pkh;					
					this.result = this._AppService.callContract(contractAdd, this.contract, this.initValue, this.tezosProvider, this.keysStore);
					setTimeout(() => {
						console.log(this.result);
					}, 2000);
					this.contract = '';
					this.initValue = '';
				}
			}
		} else {
			this._AppService.openSnackBar('Please select an account/Contract/Inital Contract Value !!');
		}
	}
	async getStorage() {
		this.config = JSON.parse(localStorage.getItem('configData'));
		if (typeof this.accountpkh != 'undefined' && typeof this.contract != 'undefined') {
			let cont = this.findKeyObj(this.config['contracts'], this.contract);
			if (!cont) {
				this._AppService.openSnackBar(`couldn't find the contract, please make sure contract label or address is correct!`);
			} else {
				let contractAddress = cont.pkh;
				this.result = this._AppService.getStorage(contractAddress);
				setTimeout(() => {
					//console.log(this.result);
				}, 2000);
				this.contract = '';
			}
		} else {
			this._AppService.openSnackBar('Please select an account/Contract/Inital Contract Value !!');
		}
	}

	findKeyObj(list, t) {
		for (var i = 0; i < list.length; i++) {
			if (list[i].pkh == t || list[i].label == t) return list[i];
		}
		return false;
	}

	public viewContract(){
		if (typeof this.accountpkh !== 'undefined') {
		if(this.configData['provider'] == " https://tezos-dev.cryptonomic-infra.tech/"){  
				//this._AppService.loadtransactionData(this.accountpkh);
				setTimeout(()=>{
					this.cont_txs=[];
					this.totalcontract=0;
					// this.contractData= JSON.parse(localStorage.getItem('contractsData'));
					this.tempcontData=JSON.parse(this._AppService.getLocalConfigData());
					this.contractData=this.tempcontData["contracts"];
					console.log(this.contractData);				
					this.totalcontract=this.contractData.length;
					if(this.contractData.length > 0){
						for(var transdata of this.contractData){
							console.log(transdata);							
							if(transdata["identity"] == this.accountpkh){
								this.cont_txs.push({									
									"label" : transdata["to"],
									"identity" : transdata["identity"],
									"pkh" : transdata["pkh"],
									"IntialValue" : transdata["IntialValue"],
									"status":"Deployed Contract"
								});
							}						
						}

					}
					else{
							this.modalService.openModal('blankData', BlankDataComponent);
					}
				}, 2000);
		}
			else{
				setTimeout(()=>{
					this.cont_txs=[];
					this.totalcontract=0;
					let status: any;
					this.tempcontData=JSON.parse(this._AppService.getLocalConfigData());
					this.contractData=this.tempcontData["contracts"];
					this.totalcontract=this.contractData.length;
					this.transactionData=this.tempcontData["transactions"];	
					let contTxn = this.findKeyObjTxn(this.tempcontData["transactions"], this.accountpkh);								
					if(!contTxn){
						status="Contract deployed";
					}
					else{
						status="Contract deployed & called";
					}
					this.now=Date.now();
					if(this.contractData.length >0){
						for(let transdata of this.contractData){													
							if(transdata["identity"] == this.accountpkh){
								this.cont_txs.push({									
									"label" : transdata["label"],
									"identity" : transdata["identity"],
									"pkh" : transdata["pkh"],
									"IntialValue" : transdata["IntialValue"],
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
		else{
			this._AppService.openSnackBar('Please select an account..');
		}
	}

	findKeyObjTxn(list, t) {		
		for (var i = 0; i < list.length; i++) {			
			if (list[i].from == t && list[i].operation !='') return list[i];
		}
		return false;
	}

}
