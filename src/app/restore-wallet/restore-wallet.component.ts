import { Component, OnInit, Inject, ViewChild, TemplateRef } from '@angular/core';
import {AppService} from '../app.service';
import { BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import { ModalService } from '../modal.service';
import { Router } from '@angular/router';
declare var eztz: any;

@Component({
  selector: 'app-restore-wallet',
  templateUrl: './restore-wallet.component.html',
  styleUrls: ['./restore-wallet.component.css']
})
export class RestoreWalletComponent implements OnInit {
  public configData=[];
  public mnenomics;
  public password;
  public email;  
  public cred:string;
  public keys;
  public account;
  credD: { "pkh": any; "sk": any; "pk": any; };
  constructor(public bsModalRef: BsModalRef, private _AppService:AppService, private modalService: ModalService,private router: Router ) { }
  
  
  onNoClick(): void {     
    this.modalService.closeModal('restore');
  }

  onClick(): void {    
    this.cred=this.email+this.password;  //elbow advance genius castle rather nerve art citizen design document juice more century gorilla pair', 'kuidbbms.jhkpkhfg@tezos.example.orgvyIxvZml6w  
    this.keys=eztz.crypto.generateKeys(this.mnenomics, this.cred); 
    this.account=this.keys.pkh;        
    this._AppService.addAccount(
          {
            "label": "Main",
            "pkh": this.account,
            "identity": "bootstrap3"
          }
        );      
    this.credD={"pkh":this.keys.pkh,"sk":this.keys.sk,"pk":this.keys.pk};
    sessionStorage.setItem("credData",JSON.stringify(this.credD));
    this.modalService.closeModal('restore'); 
    this.router.navigate(['/accounts']);   
  }

  ngOnInit() { 
    this._AppService.getConfigData();
    this._AppService.configDataChangeObs$
     .subscribe(data => {       
       if (data) {
        this.configData = data;  
      }
    });
  }

}
