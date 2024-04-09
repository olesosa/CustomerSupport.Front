import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DialogPageComponent} from "./dialog-page.component";
import {SharedModule} from "../../../shared/modules/shared.module";
import {RouterModule, Routes } from '@angular/router';
import {CarouselModule} from "primeng/carousel";
import {FormsModule} from "@angular/forms";

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
        SharedModule,
        RouterModule.forChild(routes),
        CarouselModule,
        FormsModule
    ],
  exports: [
    RouterModule
  ]
})
export class DialogPageModule { }
