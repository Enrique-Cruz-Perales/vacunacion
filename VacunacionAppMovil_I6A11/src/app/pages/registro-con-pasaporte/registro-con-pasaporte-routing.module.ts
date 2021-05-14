import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistroConPasaportePage } from './registro-con-pasaporte.page';

const routes: Routes = [
  {
    path: '',
    component: RegistroConPasaportePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistroConPasaportePageRoutingModule {}
