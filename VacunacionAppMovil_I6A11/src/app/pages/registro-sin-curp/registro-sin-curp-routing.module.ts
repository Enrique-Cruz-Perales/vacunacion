import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistroSinCurpPage } from './registro-sin-curp.page';

const routes: Routes = [
  {
    path: '',
    component: RegistroSinCurpPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistroSinCurpPageRoutingModule {}
