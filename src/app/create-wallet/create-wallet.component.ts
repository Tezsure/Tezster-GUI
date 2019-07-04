import { Component, OnInit, Inject, ViewChild, TemplateRef } from '@angular/core';
import {AppService} from '../app.service';
import { BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import { ModalService } from '../modal.service';


declare var eztz: any;

@Component({
  selector: 'app-create-wallet',
  templateUrl: './create-wallet.component.html',
  styleUrls: ['./create-wallet.component.css']
})
export class CreateWalletComponent implements OnInit {

  public mnemonics;

  constructor(public bsModalRef: BsModalRef, private _AppService:AppService, private modalService: ModalService ) { }
  onNoClick(): void {     
    this.modalService.closeModal('create');
  }

  onClick(): void {         
    console.log("this is mnemonics", this.mnemonics);
    this.modalService.closeModal('create');
  }

  ngOnInit() {
  }

}
