import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ButtonModule} from 'primeng/button';
import {DropdownModule} from 'primeng/dropdown';
import {InputTextModule} from 'primeng/inputtext';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {CheckboxModule} from "primeng/checkbox";
import {HttpClientModule} from "@angular/common/http";
import {ScrollerModule} from 'primeng/scroller';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
  exports: [
    ButtonModule,
    DropdownModule,
    InputTextModule,
    InputTextareaModule,
    ProgressSpinnerModule,
    CheckboxModule,
    HttpClientModule,
    ScrollerModule,
  ]
})
export class SharedModule {
}
