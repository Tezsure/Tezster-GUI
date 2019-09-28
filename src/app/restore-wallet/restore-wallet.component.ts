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
    public data: string;
    public mnenomics: any;
    public password: any;
    public email: any;  
    public cred:string;
    public keys: { pkh: string; sk: any; pk: any; };
    public account: string;
    public secret: any;
    credD: { "pkh": any; "sk": any; "pk": any; label: any };
    public obj;	
    public label;
    constructor(public bsModalRef: BsModalRef, private _AppService:AppService, private modalService: ModalService,private router: Router ) { }
    
  
  onNoClick(): void {     
      this.modalService.closeModal('restore');
  }

  onClick(): void {
      this.cred=this.email+this.password;  
      this.keys=eztz.crypto.generateKeys(this.mnenomics, this.cred); 
      this.account=this.keys.pkh;            
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
      this.modalService.closeModal('restore');
      alert("An account "+this.label+ " has been restored with Identity - " + this.account);
      this.router.navigate(['/accounts']);   
  }
  activateAlphanet(): void{	 
      this.cred=this.email+this.password;  
      this.keys=eztz.crypto.generateKeys(this.mnenomics, this.cred); 
      this.account=this.keys.pkh;	          
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
      this.modalService.closeModal('restore'); 
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
