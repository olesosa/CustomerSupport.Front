import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LoginPageComponent} from "./login-page.component";
import {SharedModule} from "../../../shared/modules/shared.module";
import {RouterModule, Routes} from "@angular/router";
import {CoreModule} from "../../../shared/modules/core.module";
import {ReactiveFormsModule} from "@angular/forms";

const routes: Routes = [
  {
    path: '',
    component: LoginPageComponent
  }
];

@NgModule({
  declarations: [
    LoginPageComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    CoreModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule
  ],
  exports:[
    RouterModule
  ]
})
export class LoginPageModule { }
