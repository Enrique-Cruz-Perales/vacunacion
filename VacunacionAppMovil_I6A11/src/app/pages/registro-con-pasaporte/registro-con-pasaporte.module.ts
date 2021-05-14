import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistroConPasaportePageRoutingModule } from './registro-con-pasaporte-routing.module';

import { RegistroConPasaportePage } from './registro-con-pasaporte.page';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistroConPasaportePageRoutingModule,
    ComponentsModule
  ],
  declarations: [RegistroConPasaportePage]
})
export class RegistroConPasaportePageModule {}
