import { Component, OnInit } from '@angular/core';
import { ModalService } from '../modal.service';
import { CreateWalletComponent } from '../create-wallet/create-wallet.component';
import { RestoreWalletComponent } from '../restore-wallet/restore-wallet.component';



@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})
export class WalletComponent implements OnInit {

  constructor(private modalService: ModalService) {}
  create(): void {   
    this.modalService.openModal('create', CreateWalletComponent);
  }

  restore(): void {   
    this.modalService.openModal('restore', RestoreWalletComponent);
  }

  ngOnInit() {
  }

}
