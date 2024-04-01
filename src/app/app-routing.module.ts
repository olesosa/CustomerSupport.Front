import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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
    loadChildren:() => import('./core/pages/tickets-page/tickets-page.module')
      .then(m => m.TicketsPageModule)
  },
  {
    path: 'tickets/create',
    loadChildren:() => import('./core/pages/ticket-create-page/ticket-create-page.module')
      .then(m => m.TicketCreatePageModule)
  },
  {
    path: 'dialog',
    loadChildren: () => import("./core/pages/dialog-page/dialog-page.module")
      .then(m => m.DialogPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
