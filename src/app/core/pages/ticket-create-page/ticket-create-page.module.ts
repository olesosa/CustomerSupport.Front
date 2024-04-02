import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TicketCreatePageComponent} from "./ticket-create-page.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../../../shared/modules/shared.module";
import {RouterModule, Routes} from "@angular/router";
import {CoreModule} from "../../../shared/modules/core.module";
import {ToastModule} from "primeng/toast";
import {FileUploadModule} from "primeng/fileupload";

const routes: Routes = [
  {
    path: '',
    component: TicketCreatePageComponent
  }
]

@NgModule({
  declarations: [
    TicketCreatePageComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    CoreModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    ToastModule,
    FileUploadModule
  ],
  exports: [
    RouterModule
  ],
})
export class TicketCreatePageModule { }
