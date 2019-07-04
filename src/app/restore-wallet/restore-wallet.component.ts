import { Component, OnInit, Inject, ViewChild, TemplateRef } from '@angular/core';
import {AppService} from '../app.service';
import { BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import { ModalService } from '../modal.service';
declare var eztz: any;

@Component({
  selector: 'app-restore-wallet',
  templateUrl: './restore-wallet.component.html',
  styleUrls: ['./restore-wallet.component.css']
})
export class RestoreWalletComponent implements OnInit {

  public mnemonics;

  constructor(public bsModalRef: BsModalRef, private _AppService:AppService, private modalService: ModalService ) { }
  onNoClick(): void {     
    this.modalService.closeModal('restore');
  }

  onClick(): void {         
    this.modalService.closeModal('restore');
  }

  ngOnInit() {
  }

}
