import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TicketsPageComponent} from "./tickets-page.component";
import {SharedModule} from "../../../shared/modules/shared.module";
import {RouterModule, Routes} from "@angular/router";
import {TableModule} from "primeng/table";
import {PaginatorModule} from "primeng/paginator";
import {HttpClientModule} from "@angular/common/http";
import {MultiSelectModule} from "primeng/multiselect";

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
        RouterModule.forChild(routes),
        TableModule,
        PaginatorModule,
        HttpClientModule,
        MultiSelectModule
    ],
  exports:[
    RouterModule
  ]
})
export class TicketsPageModule { }
