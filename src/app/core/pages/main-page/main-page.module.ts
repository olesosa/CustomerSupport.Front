import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import { MainPageComponent } from "./main-page.component";
import { SharedModule } from "../../../shared/modules/shared.module";
import { RouterModule, Routes } from '@angular/router';
import {DialogModule} from "primeng/dialog";
import {MessagesModule} from "primeng/messages";

const routes: Routes = [
  {
    path: '',
    component: MainPageComponent
  }
]

@NgModule({
  declarations: [
    MainPageComponent
  ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        DialogModule,
        MessagesModule,
        NgOptimizedImage,
        SharedModule
    ],
  exports: [
    RouterModule
  ],
})
export class MainPageModule { }
