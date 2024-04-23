import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DialogPageComponent} from "./dialog-page.component";
import {SharedModule} from "../../../shared/modules/shared.module";
import {RouterModule, Routes } from '@angular/router';
import {CarouselModule} from "primeng/carousel";
import {FormsModule} from "@angular/forms";
import {AppModule} from "../../../app.module";
import {CustomDatePipe} from "../../../shared/pipes/custom-date-pipe";
import {DialogModule} from "primeng/dialog";

const routes: Routes = [
  {
    path: '',
    component: DialogPageComponent
  },
];

@NgModule({
  declarations: [
    DialogPageComponent
  ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        CarouselModule,
        FormsModule,
        SharedModule,
        CustomDatePipe,
        DialogModule
    ],
  exports: [
    RouterModule
  ]
})
export class DialogPageModule { }
