import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// third parties
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

// components
import { JobsSchedulerDemoComponent } from './jobs-scheduler-demo.component';
import { DatepickerRangePopupComponent } from './datepicker-rangePopup.component';

// config
import { JobsSchedulerRoutes } from './jobs-scheduler-demo.routing';

@NgModule({

    imports: [
        CommonModule,
        RouterModule.forChild(JobsSchedulerRoutes),
        FormsModule,
        NgbModule,
        SweetAlert2Module.forRoot(),
    ],

    declarations: [
        JobsSchedulerDemoComponent,
        DatepickerRangePopupComponent
    ]

})

export class JobsSchedulerDemoModule {

}
