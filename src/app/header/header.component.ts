import { Component, OnInit } from '@angular/core';
import {LocalnodeComponent} from '../localnode/localnode.component';
import { ModalService } from '../modal.service';
import { AlphanetComponent } from '../alphanet/alphanet.component';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {  
  constructor(private modalService: ModalService) { 
  }
  openDialog(): void {    
    this.modalService.openModal('localnode', LocalnodeComponent);
  }
  alphanet(): void {    
    this.modalService.openModal('alphanet', AlphanetComponent);
  }
  ngOnInit() {
  }

}
