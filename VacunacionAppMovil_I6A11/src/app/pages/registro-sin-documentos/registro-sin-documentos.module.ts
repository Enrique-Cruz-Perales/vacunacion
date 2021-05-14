import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistroSinDocumentosPageRoutingModule } from './registro-sin-documentos-routing.module';

import { RegistroSinDocumentosPage } from './registro-sin-documentos.page';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistroSinDocumentosPageRoutingModule,
    ComponentsModule
  ],
  declarations: [RegistroSinDocumentosPage]
})
export class RegistroSinDocumentosPageModule {}
