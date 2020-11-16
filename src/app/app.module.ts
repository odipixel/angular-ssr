import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserTransferStateModule} from '@angular/platform-browser'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import { SidebarFilterComponent } from './sidebar-filter/sidebar-filter.component';
import { LaunchesComponent } from './launches/launches/launches.component';
@NgModule({
  declarations: [
    AppComponent,
    SidebarFilterComponent,
    LaunchesComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    BrowserTransferStateModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
