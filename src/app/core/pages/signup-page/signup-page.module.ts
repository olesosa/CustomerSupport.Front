import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SignupPageComponent} from "./signup-page.component";
import {SharedModule} from "../../../shared/modules/shared.module";
import {RouterModule, Routes} from "@angular/router";
import {CoreModule} from "../../../shared/modules/core.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

const routes: Routes = [
  {
    path: '',
    component: SignupPageComponent
  }
];

@NgModule({
  declarations: [
    SignupPageComponent
  ],
    imports: [
        CommonModule,
        SharedModule,
        CoreModule,
        RouterModule.forChild(routes),
        FormsModule,
        ReactiveFormsModule
    ],
  exports:[
    RouterModule
  ]
})
export class SignupPageModule { }
