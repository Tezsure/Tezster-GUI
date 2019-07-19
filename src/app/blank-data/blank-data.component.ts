import { Component, OnInit} from '@angular/core';
import { BsModalRef} from 'ngx-bootstrap/modal';
import { ModalService } from '../modal.service';

@Component({
  selector: 'app-blank-data',
  templateUrl: './blank-data.component.html',
  styleUrls: ['./blank-data.component.css']
})
export class BlankDataComponent implements OnInit {

  constructor(public bsModalRef: BsModalRef,private modalService: ModalService ) { }

  onClick(): void {       
    this.modalService.closeModal('blankData');
  }

  ngOnInit() {
  }

}
