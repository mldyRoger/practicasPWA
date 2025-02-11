import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HolaPageRoutingModule } from './hola-routing.module';

import { HolaPage } from './hola.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HolaPageRoutingModule, ReactiveFormsModule
  ],
  declarations: [HolaPage]
})
export class HolaPageModule {}
