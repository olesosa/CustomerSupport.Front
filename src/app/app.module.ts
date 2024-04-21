import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {SharedModule} from "./shared/modules/shared.module";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {CoreModule} from "./core/components/core.module";
import {AuthInterceptor} from "./core/interceptors/auth.interceptor";
import {provideAnimations} from "@angular/platform-browser/animations";
import { AdminPageComponent } from './core/pages/admin-page/admin-page.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    CoreModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    provideAnimations()
  ],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
