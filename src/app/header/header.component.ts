import { Component, OnInit } from '@angular/core';
import {LocalnodeComponent} from '../localnode/localnode.component';
import { ModalService } from '../modal.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  //provider: string;
  constructor(private modalService: ModalService) { 
  }
  openDialog(): void {
    /* const dialogRef = this.dialog.open(LocalnodeComponent, {
      width: '400px',
      data: {provider: this.provider}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.provider = result;
    }); */
    this.modalService.openModal('localnode', LocalnodeComponent);

  }
  ngOnInit() {
  }

}
