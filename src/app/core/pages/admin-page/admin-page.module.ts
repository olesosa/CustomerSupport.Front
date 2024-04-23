import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from "../../../shared/modules/shared.module";
import {AdminPageComponent} from "./admin-page.component";
import {RouterModule, Routes} from "@angular/router";
import {DialogModule} from "primeng/dialog";
import {ButtonModule} from "primeng/button";
import {ReactiveFormsModule} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";

const routes: Routes = [
  {
    path: '',
    component: AdminPageComponent
  },
];

@NgModule({
  declarations: [AdminPageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    DialogModule,
    ButtonModule,
    ReactiveFormsModule,
    InputTextModule,
    SharedModule
  ],
  exports: [
    RouterModule
  ]
})
export class AdminPageModule { }
