import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DialogPageComponent} from "./dialog-page.component";
import {SharedModule} from "../../../shared/modules/shared.module";
import {RouterModule, Routes } from '@angular/router';
import {CoreModule} from "../../../shared/modules/core.module";

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
    CoreModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class DialogPageModule { }
