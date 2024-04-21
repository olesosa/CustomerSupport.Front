import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {SharedModule} from "../../../shared/modules/shared.module";
import {TicketViewComponent} from "./ticket-view.component";
import {FormsModule} from "@angular/forms";

const routes: Routes = [
  {
    path: '',
    component: TicketViewComponent
  }
]

@NgModule({
  declarations: [
    TicketViewComponent
  ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule,
        SharedModule,
    ],
  exports: [
    RouterModule
  ],
})
export class TicketViewModule { }
