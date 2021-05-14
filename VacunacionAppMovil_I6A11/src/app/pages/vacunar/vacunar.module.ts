import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VacunarPageRoutingModule } from './vacunar-routing.module';

import { VacunarPage } from './vacunar.page';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VacunarPageRoutingModule,
    ComponentsModule,
    ReactiveFormsModule
  ],
  declarations: [VacunarPage]
})
export class VacunarPageModule {}
