import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminUsersUpdatePageRoutingModule } from './admin-users-update-routing.module';

import { AdminUsersUpdatePage } from './admin-users-update.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminUsersUpdatePageRoutingModule
  ],
  declarations: [AdminUsersUpdatePage]
})
export class AdminUsersUpdatePageModule {}
