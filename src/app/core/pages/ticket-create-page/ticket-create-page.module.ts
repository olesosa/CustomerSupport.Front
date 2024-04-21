import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TicketCreatePageComponent} from "./ticket-create-page.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule, Routes} from "@angular/router";
import {SharedModule} from "../../../shared/modules/shared.module";
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
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    SharedModule,
    FileUploadModule,
  ],
  exports: [
    RouterModule
  ],
})
export class TicketCreatePageModule { }
