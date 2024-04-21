import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HeaderComponent} from "./header/header.component";
import {FooterComponent} from "./footer/footer.component";
import {SharedModule} from "../../shared/modules/shared.module";
import {RouterLink} from "@angular/router";
import {NotFoundComponent} from "./not-found/not-found.component";
import {AccessDeniedComponent} from "./access-denied/access-denied.component";
import {DialogModule} from "primeng/dialog";

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    NotFoundComponent,
    AccessDeniedComponent
  ],
    imports: [
        CommonModule,
        SharedModule,
        RouterLink,
        DialogModule
    ],
  exports: [
    HeaderComponent,
    FooterComponent
  ]
})
export class CoreModule { }
