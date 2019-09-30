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
	public label;
	public obj;
  	credD: { "pkh": any; "sk": any; "pk": any; label: any };	
  	constructor(public bsModalRef: BsModalRef, private _AppService:AppService, private modalService: ModalService,private router: Router ) { }
  	onNoClick(): void {     
  		this.modalService.closeModal('validate');
    }
  
	onClick(): void {      
 		this.cred=this.email+this.password;  
  		this.keys=eztz.crypto.generateKeys(this.mnenomics, this.cred); 
		this.account=this.keys.pkh; 
		// eztz.rpc.activate(this.keys.pkh, this.secret).then(function(d){		
		// 	console.log(d);
		// });          
  		this._AppService.addAccount(
			{
		  		"label": this.label,
		  		"pkh": this.account,
				"identity": this.label
			}
	  	);      
  		this.credD={"pkh":this.keys.pkh,"sk":this.keys.sk,"pk":this.keys.pk ,"label":this.label};		
		this.obj=JSON.parse(this._AppService.getLocalConfigData());
        this.obj.identities.push(this.credD);
        this._AppService.setLocalConfigData(this.obj);
		this.modalService.closeModal('validate');
		this.modalService.closeModal('create');
		alert("New account "+this.label+ " has been created with Identity" + this.account);
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
