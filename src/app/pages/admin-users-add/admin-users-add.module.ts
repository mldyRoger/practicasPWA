import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminUsersAddPageRoutingModule } from './admin-users-add-routing.module';

import { AdminUsersAddPage } from './admin-users-add.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminUsersAddPageRoutingModule, ReactiveFormsModule
  ],
  declarations: [AdminUsersAddPage]
})
export class AdminUsersAddPageModule {}
