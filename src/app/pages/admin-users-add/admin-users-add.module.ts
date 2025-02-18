import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminUsersAddPageRoutingModule } from './admin-users-add-routing.module';

import { AdminUsersAddPage } from './admin-users-add.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminUsersAddPageRoutingModule
  ],
  declarations: [AdminUsersAddPage]
})
export class AdminUsersAddPageModule {}
