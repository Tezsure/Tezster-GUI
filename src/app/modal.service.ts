import { Injectable } from "@angular/core";
import { BsModalRef, BsModalService} from 'ngx-bootstrap/modal';

@Injectable({
    providedIn: 'root'
})
export class ModalService {

    protected _modalRefs: {
        [key: string]: BsModalRef
    };

    constructor(private modalService: BsModalService) {
        this._modalRefs = {};
    }

    openModal(key: string, template: any) {
        this._modalRefs[key] = this.modalService.show(template);
    }

    closeModal(key: string) {
        if (this._modalRefs[key]) {
            this._modalRefs[key].hide();
        }
    }



}