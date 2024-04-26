import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TicketsPageComponent} from "./tickets-page.component";
import {SharedModule} from "../../../shared/modules/shared.module";
import {RouterModule, Routes} from "@angular/router";
import {TableModule} from "primeng/table";
import {PaginatorModule} from "primeng/paginator";
import {MultiSelectModule} from "primeng/multiselect";
import {ReactiveFormsModule} from "@angular/forms";
import {ChartModule} from "primeng/chart";
import {AutoCompleteModule} from "primeng/autocomplete";
import {SelectButtonModule} from "primeng/selectbutton";

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
        RouterModule.forChild(routes),
        TableModule,
        PaginatorModule,
        MultiSelectModule,
        ReactiveFormsModule,
        SharedModule,
        ChartModule,
        AutoCompleteModule,
        SelectButtonModule,
    ],
  exports:[
    RouterModule
  ]
})
export class TicketsPageModule { }
