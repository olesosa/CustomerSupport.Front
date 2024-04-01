import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TicketsPageComponent} from "./tickets-page.component";
import {SharedModule} from "../../../shared/modules/shared.module";
import {RouterModule, Routes} from "@angular/router";
import {SignupPageComponent} from "../signup-page/signup-page.component";
import {CoreModule} from "../../../shared/modules/core.module";
import {TableModule} from "primeng/table";
import {DataViewModule} from "primeng/dataview";

const routes: Routes = [
  {
    path: '',
    component: TicketsPageComponent
  }
];

@NgModule({
  declarations: [
    TicketsPageComponent,
  ],
    imports: [
        CommonModule,
        SharedModule,
        CoreModule,
        RouterModule.forChild(routes),
        TableModule,
        DataViewModule
    ],
  exports:[
    RouterModule
  ]
})
export class TicketsPageModule { }
