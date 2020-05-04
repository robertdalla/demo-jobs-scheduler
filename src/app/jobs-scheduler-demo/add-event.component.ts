// angular core
import { Component, ViewEncapsulation } from '@angular/core';

// third parties
import { SimpleGlobal } from 'ng2-simple-global';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
    selector: 'app-add-event-modal',
    // template: '',
    templateUrl: './add-event.component.html',
    // styles: [''],
    // styleUrls: [''],
    encapsulation: ViewEncapsulation.None
})
export class AddEventModalComponent {
    constructor(
        public modal: NgbActiveModal,
        public APP: SimpleGlobal,
    ) {}

}
