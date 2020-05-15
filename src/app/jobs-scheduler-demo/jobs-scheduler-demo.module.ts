import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // this is needed for ngx-chips (already set in main module)

// third parties
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TagInputModule } from 'ngx-chips';
import { NgSelectModule } from '@ng-select/ng-select';

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
        NgSelectModule,
        NgbModule,
        // BrowserAnimationsModule, // this is needed for ngx-chips (already set in main module)
        TagInputModule,

    ],

    declarations: [
        JobsSchedulerDemoComponent,
        DatepickerRangePopupComponent,
    ]

})

export class JobsSchedulerDemoModule {

}
