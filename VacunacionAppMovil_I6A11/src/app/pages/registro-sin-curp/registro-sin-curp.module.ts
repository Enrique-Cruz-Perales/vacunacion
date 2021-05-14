import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistroSinCurpPageRoutingModule } from './registro-sin-curp-routing.module';

import { RegistroSinCurpPage } from './registro-sin-curp.page';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistroSinCurpPageRoutingModule,
    ComponentsModule
  ],
  declarations: [RegistroSinCurpPage]
})
export class RegistroSinCurpPageModule {}
