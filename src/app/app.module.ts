// angular core
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { APP_BASE_HREF } from '@angular/common';
import { FormsModule } from '@angular/forms';

// third parties
import { SimpleGlobal } from 'ng2-simple-global'; // A simple global variable service for Angular2/4
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerModule } from 'ngx-spinner';

// Services
import { WINDOW_PROVIDERS } from './services/windows.service';

// components
import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth/auth-layout.component';

// config
import { global_IS_LOCALDEV, global_TODAY_DATE } from './app-config';
import { SidebarModule } from './sidebar/sidebar.module';
import { FixedPluginModule } from './shared/fixedplugin/fixedplugin.module';
import { FooterModule } from './shared/footer/footer.module';
import { NavbarModule} from './shared/navbar/navbar.module';
import { AppRoutes } from './app.routing';


@NgModule({

    imports: [
        BrowserAnimationsModule,
        FormsModule,
        RouterModule.forRoot(AppRoutes,{
          useHash: true
        }),
        NgbModule,
        HttpModule,
        HttpClientModule,
        SidebarModule,
        NavbarModule,
        FooterModule,
        FixedPluginModule,
        NgxSpinnerModule,
    ],

    declarations: [
        AppComponent,
        AdminLayoutComponent,
        AuthLayoutComponent,
    ],

    providers: [
        WINDOW_PROVIDERS,
        SimpleGlobal,
    ],

    bootstrap: [ AppComponent ]
})

export class AppModule {

    constructor(
        private APP: SimpleGlobal = {}, // Define globals
    ) {

        // Initialize globals
        this.APP['criticaldataLoaded'] = false; // when true a template assumes that all necessary data is available
        this.APP['isBusy'] = true; // freezes the DOM
        this.APP['digest'] = ''; // will get the Sharepoint digest
        this.APP['todayDate'] = new Date(global_TODAY_DATE.year, global_TODAY_DATE.month - 1, global_TODAY_DATE.day).toISOString(); // date of today at local time, in iso format
        this.APP['isMobile'] = false; // will become true if browser is in running on mobile device
        this.APP['current_page'] = ''; // each page will update this variable (Eg. 'projects' or 'dashboard' ...)
        this.APP['loading-spinner'] = {
            type: (function(){
                // animation spinner from Load Awesome (https://github.danielcardoso.net/load-awesome/animations.html).
                const spinners = ['ball-8bits', 'ball-climbing-dot', 'ball-newton-cradle', 'ball-running-dots', 'pacman', 'timer'];
                return spinners[Math.floor(Math.random() * spinners.length)];
            })(),
            size: 'medium', // small, default, medium, large
            bdColor: 'rgba(100,149,237, 0)', //  background-color for backdrop, default 'rgba(51,51,51,0.8)'
            color: 'rgb(52,152,204)', // css color format of spinner, default '#fff'
            fullScreen: true, // enable/disable fullscreen mode(overlay), default true
            loadingText: '<p style="font-size: 20px; color: black">Loading...</p>', // only available in version 8.x.x

            // Internal properties only
            request_to_hide: false, // this will be set to true if some logic resulted that the spinner should now be hidden
            minimum_delay_expired: false, // this will be set to true after the minimum showing delay is expired
        };

        this.APP['AppConfig'] = {
            AppTitleDesktop: 'Manager self service',
            AppTitleMobile: 'MSS'
        };

        this.APP['Data'] = null;

    }
}
