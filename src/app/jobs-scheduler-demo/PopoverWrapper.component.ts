// angular core
import { Component, TemplateRef, ViewChild } from '@angular/core';

// third parties
import { NgbPopover } from '@ng-bootstrap/ng-bootstrap';

@Component({
    template: `
    <div [ngbPopover]="template"
         popoverTitle=""
         [autoClose]="'outside'"
         placement="auto"
         container="body"
         triggers="manual"
         popoverClass="fc-event_popover">
      <ng-content></ng-content>
    </div>
  `,
})
export class PopoverWrapperComponent {
    template: TemplateRef<any>;

    @ViewChild(NgbPopover, { static: true }) popover: NgbPopover;

}
