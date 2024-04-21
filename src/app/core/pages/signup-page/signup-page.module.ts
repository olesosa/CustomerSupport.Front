import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SignupPageComponent} from "./signup-page.component";
import {SharedModule} from "../../../shared/modules/shared.module";
import {RouterModule, Routes} from "@angular/router";
import {CoreModule} from "../../components/core.module";
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
        RouterModule.forChild(routes),
        FormsModule,
        ReactiveFormsModule,
        SharedModule
    ],
  exports:[
    RouterModule
  ]
})
export class SignupPageModule { }
