import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AcuseDeRegistroPageRoutingModule } from './acuse-de-registro-routing.module';

import { AcuseDeRegistroPage } from './acuse-de-registro.page';
import { ComponentsModule } from '../../components/components.module';

import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AcuseDeRegistroPageRoutingModule,
    ComponentsModule,
    NgxQRCodeModule
  ],
  declarations: [AcuseDeRegistroPage]
})
export class AcuseDeRegistroPageModule {}
