import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistroConCurpPageRoutingModule } from './registro-con-curp-routing.module';

import { RegistroConCurpPage } from './registro-con-curp.page';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistroConCurpPageRoutingModule,
    ComponentsModule
  ],
  declarations: [RegistroConCurpPage]
})
export class RegistroConCurpPageModule {}
