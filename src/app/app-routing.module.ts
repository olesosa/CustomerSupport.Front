import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainPageComponent} from "./pages/main-page/main-page.component";
import {AdminPageComponent} from "./pages/admin-page/admin-page.component";

const routes: Routes = [
  {
    path:'',
    component: MainPageComponent
  },
  {
    path:'admin-page',
    component: AdminPageComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
