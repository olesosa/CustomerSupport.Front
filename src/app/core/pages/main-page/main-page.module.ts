import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPageComponent } from "./main-page.component";
import { SharedModule } from "../../../shared/modules/shared.module";
import { RouterModule, Routes } from '@angular/router';

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
    SharedModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ],
})
export class MainPageModule { }
