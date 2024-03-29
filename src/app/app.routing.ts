import { Routes } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth/auth-layout.component';

export const AppRoutes: Routes = [{
        path: '',
        redirectTo: '/pages/jobs-scheduler',
        pathMatch: 'full',
      },{
        path: '',
        component: AdminLayoutComponent,
        children: [{
            path: '',
            loadChildren: './jobs-scheduler-demo/jobs-scheduler-demo.module#JobsSchedulerDemoModule'
        },{
            path: '',
            loadChildren: './dashboard/dashboard.module#DashboardModule'
        },{
            path: 'components',
            loadChildren: './components/components.module#ComponentsModule'
        },{
            path: 'forms',
            loadChildren: './forms/forms.module#Forms'
        },{
            path: 'tables',
            loadChildren: './tables/tables.module#TablesModule'
        },{
            path: 'maps',
            loadChildren: './maps/maps.module#MapsModule'
        },{
            path: 'charts',
            loadChildren: './charts/charts.module#ChartsModule'
        },{
            path: '',
            loadChildren: './userpage/user.module#UserModule'
        },{
            path: '',
            loadChildren: './timeline/timeline.module#TimelineModule'
        },{
            path: '',
            loadChildren: './widgets/widgets.module#WidgetsModule'
        }]
        },{
            path: '',
            component: AuthLayoutComponent,
            children: [{
                path: 'pages',
                loadChildren: './pages/pages.module#PagesModule'
            }]
        }
];
