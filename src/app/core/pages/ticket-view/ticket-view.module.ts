import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {SharedModule} from "../../../shared/modules/shared.module";
import {TicketViewComponent} from "./ticket-view.component";
import {FormsModule} from "@angular/forms";
import {CustomDatePipe} from "../../../shared/pipes/custom-date-pipe";
import {DialogModule} from "primeng/dialog";
import {InputSwitchModule} from "primeng/inputswitch";

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
    CustomDatePipe,
    DialogModule,
    InputSwitchModule
  ],
  exports: [
    RouterModule
  ],
})
export class TicketViewModule { }
