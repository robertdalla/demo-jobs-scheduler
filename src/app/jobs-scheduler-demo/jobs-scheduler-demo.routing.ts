import { Routes } from '@angular/router';

import { JobsSchedulerDemoComponent } from './jobs-scheduler-demo.component';

export const JobsSchedulerRoutes: Routes = [{
    path: '',
    children: [{
        path: 'pages/jobs-scheduler',
        component: JobsSchedulerDemoComponent
    }]
}];
