import { Component, OnInit, Inject } from '@angular/core';
import {AppService} from '../app.service';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ModalService } from '../modal.service';
import { Router } from '@angular/router';

declare var eztz: any;

@Component({
  	selector: 'app-validate-wallet',
  	templateUrl: './validate-wallet.component.html',
  	styleUrls: ['./validate-wallet.component.css']
})
export class ValidateWalletComponent implements OnInit {
  	public configData = [];
  	public mnemonics: any;  
  	public mnenomics;
  	public password;
  	public email;  
  	public cred:string;
  	public keys;
  	public account;
  	credD: { "pkh": any; "sk": any; "pk": any; type: any };	
  	constructor(public bsModalRef: BsModalRef, private _AppService:AppService, private modalService: ModalService,private router: Router ) { }
  	onNoClick(): void {     
  		this.modalService.closeModal('validate');
    }
  
	onClick(): void {      
 		this.cred=this.email+this.password;  
  		this.keys=eztz.crypto.generateKeys(this.mnenomics, this.cred); 
  		this.account=this.keys.pkh;         
  		this._AppService.addAccount(
			{
		  		"label": "bootstrap_7_localNode",
		  		"pkh": this.account,
				"identity": "bootstrap7_localNode"
			}
	  	);      
  		this.credD={"pkh":this.keys.pkh,"sk":this.keys.sk,"pk":this.keys.pk , type : "encrypted"};
    	console.log(JSON.stringify(this.credD));
		this.modalService.closeModal('validate');
		this.modalService.closeModal('create');
		this.router.navigate(['/accounts']);    
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
