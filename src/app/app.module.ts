import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {SharedModule} from "./shared/modules/shared.module";
import {MainPageModule} from "./core/pages/main-page/main-page.module";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    MainPageModule,
  ],
  providers: [
  ], //
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
