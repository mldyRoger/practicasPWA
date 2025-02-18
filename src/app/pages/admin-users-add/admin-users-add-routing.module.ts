import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminUsersAddPage } from './admin-users-add.page';

const routes: Routes = [
  {
    path: '',
    component: AdminUsersAddPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminUsersAddPageRoutingModule {}
