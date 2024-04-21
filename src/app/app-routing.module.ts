import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from "./core/components/not-found/not-found.component";
import {AccessDeniedComponent} from "./core/components/access-denied/access-denied.component";
import {AuthGuard} from "./shared/guards/auth-guard.service";

const routes: Routes = [
  {
    path: '',
    loadChildren:() => import('./core/pages/main-page/main-page.module')
      .then(m => m.MainPageModule)
  },
  {
    path: 'signup',
    loadChildren:() => import('./core/pages/signup-page/signup-page.module')
      .then(m => m.SignupPageModule)
  },
  {
    path: 'login',
    loadChildren:() => import('./core/pages/login-page/login-page.module')
      .then(m => m.LoginPageModule)
  },
  {
    path: 'tickets',
    canActivate: [AuthGuard],
    loadChildren:() => import('./core/pages/tickets-page/tickets-page.module')
      .then(m => m.TicketsPageModule)
  },
  {
    path: 'tickets/create',
    canActivate: [AuthGuard],
    loadChildren:() => import('./core/pages/ticket-create-page/ticket-create-page.module')
      .then(m => m.TicketCreatePageModule)
  },
  {
    path: 'tickets/:id',
    canActivate: [AuthGuard],
    loadChildren:() => import('./core/pages/ticket-view/ticket-view.module')
      .then(m=>m.TicketViewModule)

  },
  {
    path: 'dialogs',
    canActivate: [AuthGuard],
    loadChildren: () => import("./core/pages/dialog-page/dialog-page.module")
      .then(m => m.DialogPageModule)
  },
  {
    path: '403',
    component: AccessDeniedComponent
  },
  {
    path: '404',
    component: NotFoundComponent
  },
  {
    path: '**',
    redirectTo: '404'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
