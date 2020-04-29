import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { JobsSchedulerDemoComponent } from './jobs-scheduler-demo.component';
import { JobsSchedulerRoutes } from './jobs-scheduler-demo.routing';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(JobsSchedulerRoutes),
        FormsModule
    ],
    declarations: [JobsSchedulerDemoComponent]
})

export class JobsSchedulerDemoModule {}
