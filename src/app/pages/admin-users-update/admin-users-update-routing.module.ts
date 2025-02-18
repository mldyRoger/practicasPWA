import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminUsersUpdatePage } from './admin-users-update.page';

const routes: Routes = [
  {
    path: '',
    component: AdminUsersUpdatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminUsersUpdatePageRoutingModule {}
